import "server-only";

import { prisma } from "@/lib/db/prisma";

export type RoomInstanceData = {
  id: string;
  name: string;
  inspectionId: string;
  elements: {
    id: string;
    name: string;
    status: "PENDING" | "CORRECT" | "OBSERVED";
    elementTemplateSlug: string;
  }[];
  progress: {
    done: number;
    total: number;
    percent: number;
  };
};

export async function getRoomInstanceData(
  inspectionId: string,
  roomInstanceId: string,
): Promise<RoomInstanceData | null> {
  const room = await prisma.roomInstance.findUnique({
    where: { id: roomInstanceId },
    include: {
      elements: {
        orderBy: { order: "asc" },
        include: { elementTemplate: { select: { slug: true } } },
      },
    },
  });

  if (!room || room.inspectionId !== inspectionId) {
    return null;
  }

  const elements = room.elements.map((element) => ({
    id: element.id,
    name: element.name,
    status: element.status,
    elementTemplateSlug: element.elementTemplate.slug,
  }));

  const done = elements.filter((element) => element.status !== "PENDING").length;
  const total = elements.length;

  return {
    id: room.id,
    name: room.name,
    inspectionId: room.inspectionId,
    elements,
    progress: {
      done,
      total,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
    },
  };
}
