import "server-only";

import type { ElementInstanceStatus, ObservationStatus, Priority, PropertyType } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export type InformeObservation = {
  question: string;
  status: ObservationStatus;
  comment: string | null;
  priority: Priority | null;
  photos: { id: string; url: string }[];
};

export type InformeElement = {
  id: string;
  name: string;
  status: ElementInstanceStatus;
  observations: InformeObservation[];
};

export type InformeRoom = {
  id: string;
  name: string;
  elements: InformeElement[];
};

export type InformeData = {
  inspection: {
    projectName: string;
    unitLabel: string;
    address: string;
    developerName: string | null;
    builderName: string | null;
    propertyType: PropertyType;
    receptionDate: Date | null;
    organizationName: string;
    createdByName: string;
  };
  summary: {
    percent: number;
    totalRooms: number;
    totalElements: number;
    totalObservations: number;
    totalPhotos: number;
    byPriority: Record<Priority, number>;
  };
  rooms: InformeRoom[];
};

export async function getInformeData(inspectionId: string): Promise<InformeData | null> {
  const inspection = await prisma.inspection.findUnique({
    where: { id: inspectionId },
    include: {
      organization: true,
      createdBy: true,
      rooms: {
        orderBy: { order: "asc" },
        include: {
          elements: {
            orderBy: { order: "asc" },
            include: {
              observations: {
                include: {
                  checklistItemTemplate: true,
                  photos: { orderBy: { createdAt: "asc" } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!inspection) {
    return null;
  }

  const rooms: InformeRoom[] = inspection.rooms.map((room) => ({
    id: room.id,
    name: room.name,
    elements: room.elements.map((element) => ({
      id: element.id,
      name: element.name,
      status: element.status,
      observations: element.observations.map((observation) => ({
        question: observation.checklistItemTemplate.question,
        status: observation.status,
        comment: observation.comment,
        priority: observation.priority,
        photos: observation.photos.map((photo) => ({ id: photo.id, url: photo.url })),
      })),
    })),
  }));

  const totalElements = rooms.reduce((sum, room) => sum + room.elements.length, 0);
  const doneElements = rooms.reduce(
    (sum, room) => sum + room.elements.filter((element) => element.status !== "PENDING").length,
    0,
  );
  const percent = totalElements === 0 ? 0 : Math.round((doneElements / totalElements) * 100);

  const flaggedObservations = rooms
    .flatMap((room) => room.elements)
    .flatMap((element) => element.observations)
    .filter((observation) => observation.status === "OBSERVATION");

  const totalPhotos = rooms
    .flatMap((room) => room.elements)
    .flatMap((element) => element.observations)
    .reduce((sum, observation) => sum + observation.photos.length, 0);

  const byPriority: Record<Priority, number> = { ALTA: 0, MEDIA: 0, BAJA: 0 };
  for (const observation of flaggedObservations) {
    if (observation.priority) {
      byPriority[observation.priority] += 1;
    }
  }

  return {
    inspection: {
      projectName: inspection.projectName,
      unitLabel: inspection.unitLabel,
      address: inspection.address,
      developerName: inspection.developerName,
      builderName: inspection.builderName,
      propertyType: inspection.propertyType,
      receptionDate: inspection.receptionDate,
      organizationName: inspection.organization.name,
      createdByName: inspection.createdBy.name,
    },
    summary: {
      percent,
      totalRooms: rooms.length,
      totalElements,
      totalObservations: flaggedObservations.length,
      totalPhotos,
      byPriority,
    },
    rooms,
  };
}
