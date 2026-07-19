import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type InicioData = {
  inspection: {
    id: string;
    projectName: string;
    unitLabel: string;
    developerName: string | null;
    receptionDate: Date | null;
  } | null;
  progress: {
    percent: number;
    totalRooms: number;
    totalElements: number;
    totalObservations: number;
    totalPhotos: number;
  };
  nextStep: {
    roomInstanceId: string;
    roomName: string;
    pendingCount: number;
  } | null;
  libraryCategories: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    articleCount: number;
  }[];
};

const EMPTY_PROGRESS: InicioData["progress"] = {
  percent: 0,
  totalRooms: 0,
  totalElements: 0,
  totalObservations: 0,
  totalPhotos: 0,
};

export async function getInicioData(): Promise<InicioData> {
  const session = await requireSession();

  const [inspection, libraryCategories] = await Promise.all([
    prisma.inspection.findFirst({
      where: { status: "IN_PROGRESS", organizationId: session.user.organizationId },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.libraryCategory.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { articles: true } } },
    }),
  ]);

  const libraryCategoriesData = libraryCategories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    articleCount: category._count.articles,
  }));

  if (!inspection) {
    return {
      inspection: null,
      progress: EMPTY_PROGRESS,
      nextStep: null,
      libraryCategories: libraryCategoriesData,
    };
  }

  const [rooms, totalObservations, totalPhotos] = await Promise.all([
    prisma.roomInstance.findMany({
      where: { inspectionId: inspection.id },
      orderBy: { order: "asc" },
      include: { elements: true },
    }),
    prisma.observation.count({
      where: { elementInstance: { roomInstance: { inspectionId: inspection.id } } },
    }),
    prisma.photo.count({
      where: {
        observation: {
          elementInstance: { roomInstance: { inspectionId: inspection.id } },
        },
      },
    }),
  ]);

  const totalElements = rooms.reduce((sum, room) => sum + room.elements.length, 0);
  const doneElements = rooms.reduce(
    (sum, room) => sum + room.elements.filter((element) => element.status !== "PENDING").length,
    0,
  );
  const percent = totalElements === 0 ? 0 : Math.round((doneElements / totalElements) * 100);

  const nextRoom = rooms.find((room) =>
    room.elements.some((element) => element.status === "PENDING"),
  );
  const nextStep = nextRoom
    ? {
        roomInstanceId: nextRoom.id,
        roomName: nextRoom.name,
        pendingCount: nextRoom.elements.filter((element) => element.status === "PENDING").length,
      }
    : null;

  return {
    inspection: {
      id: inspection.id,
      projectName: inspection.projectName,
      unitLabel: inspection.unitLabel,
      developerName: inspection.developerName,
      receptionDate: inspection.receptionDate,
    },
    progress: {
      percent,
      totalRooms: rooms.length,
      totalElements,
      totalObservations,
      totalPhotos,
    },
    nextStep,
    libraryCategories: libraryCategoriesData,
  };
}
