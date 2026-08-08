import "server-only";

import type { ObservationLifecycleStatus, Priority } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";

export type ObservationSummaryItem = {
  id: string;
  comment: string | null;
  priority: Priority | null;
  lifecycleStatus: ObservationLifecycleStatus | null;
  roomInstanceId: string;
  roomName: string;
  elementInstanceId: string;
  elementName: string;
  thumbnailUrl: string | null;
  repairPhotos: { id: string; url: string }[];
};

export type ObservationsSummaryData = {
  observations: ObservationSummaryItem[];
  rooms: { id: string; name: string }[];
  // Solo lectura, mismo cálculo que ya usan get-inicio-data.ts y
  // get-rooms-list-data.ts -- necesario para la síntesis del Sprint 4
  // ("¿Cómo quedó esta vivienda?"), no existía antes en este archivo.
  // totalRooms/doneRooms se sumaron para el aviso previo al cierre
  // (Sprint "Proteger el cierre") -- un recinto cuenta como revisado
  // solo cuando TODOS sus elementos dejaron de estar PENDING.
  progress: {
    totalElements: number;
    doneElements: number;
    percent: number;
    totalRooms: number;
    doneRooms: number;
  };
};

const PRIORITY_RANK: Record<Priority, number> = {
  ALTA: 0,
  MEDIA: 1,
  BAJA: 2,
};

export async function getObservationsSummaryData(
  inspectionId: string,
): Promise<ObservationsSummaryData> {
  const session = await requireSession();

  const [rows, rooms] = await Promise.all([
    prisma.observation.findMany({
      where: {
        status: "OBSERVATION",
        elementInstance: {
          roomInstance: {
            inspectionId,
            inspection: inspectionAccessWhere(session.user.id, session.user.organizationId),
          },
        },
      },
      include: {
        elementInstance: { include: { roomInstance: true } },
        photos: { orderBy: { createdAt: "asc" } },
      },
    }),
    prisma.roomInstance.findMany({
      where: { inspectionId, inspection: inspectionAccessWhere(session.user.id, session.user.organizationId) },
      select: { elements: { select: { status: true } } },
    }),
  ]);

  const allElements = rooms.flatMap((room) => room.elements);
  const totalElements = allElements.length;
  const doneElements = allElements.filter((element) => element.status !== "PENDING").length;
  const totalRooms = rooms.length;
  const doneRooms = rooms.filter(
    (room) => room.elements.length > 0 && room.elements.every((element) => element.status !== "PENDING"),
  ).length;
  const progress = {
    totalElements,
    doneElements,
    percent: totalElements === 0 ? 0 : Math.round((doneElements / totalElements) * 100),
    totalRooms,
    doneRooms,
  };

  const observations: ObservationSummaryItem[] = rows.map((row) => {
    const evidencePhotos = row.photos.filter((photo) => photo.kind === "EVIDENCIA");
    const repairPhotos = row.photos.filter((photo) => photo.kind === "REPARACION");
    return {
      id: row.id,
      comment: row.comment,
      priority: row.priority,
      lifecycleStatus: row.lifecycleStatus,
      roomInstanceId: row.elementInstance.roomInstanceId,
      roomName: row.elementInstance.roomInstance.name,
      elementInstanceId: row.elementInstanceId,
      elementName: row.elementInstance.name,
      thumbnailUrl: evidencePhotos[0]?.url ?? null,
      repairPhotos: repairPhotos.map((photo) => ({ id: photo.id, url: photo.url })),
    };
  });

  observations.sort((a, b) => {
    const rankA = a.priority ? PRIORITY_RANK[a.priority] : PRIORITY_RANK.BAJA + 1;
    const rankB = b.priority ? PRIORITY_RANK[b.priority] : PRIORITY_RANK.BAJA + 1;
    return rankA - rankB;
  });

  const roomsById = new Map<string, { id: string; name: string }>();
  for (const observation of observations) {
    if (!roomsById.has(observation.roomInstanceId)) {
      roomsById.set(observation.roomInstanceId, {
        id: observation.roomInstanceId,
        name: observation.roomName,
      });
    }
  }

  return {
    observations,
    rooms: Array.from(roomsById.values()),
    progress,
  };
}
