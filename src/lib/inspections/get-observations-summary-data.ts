import "server-only";

import type { Priority } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export type ObservationSummaryItem = {
  id: string;
  comment: string | null;
  priority: Priority | null;
  roomInstanceId: string;
  roomName: string;
  elementInstanceId: string;
  elementName: string;
  thumbnailUrl: string | null;
};

export type ObservationsSummaryData = {
  observations: ObservationSummaryItem[];
  rooms: { id: string; name: string }[];
};

const PRIORITY_RANK: Record<Priority, number> = {
  ALTA: 0,
  MEDIA: 1,
  BAJA: 2,
};

export async function getObservationsSummaryData(
  inspectionId: string,
): Promise<ObservationsSummaryData> {
  const rows = await prisma.observation.findMany({
    where: {
      status: "OBSERVATION",
      elementInstance: { roomInstance: { inspectionId } },
    },
    include: {
      elementInstance: { include: { roomInstance: true } },
      photos: { orderBy: { createdAt: "asc" }, take: 1 },
    },
  });

  const observations: ObservationSummaryItem[] = rows.map((row) => ({
    id: row.id,
    comment: row.comment,
    priority: row.priority,
    roomInstanceId: row.elementInstance.roomInstanceId,
    roomName: row.elementInstance.roomInstance.name,
    elementInstanceId: row.elementInstanceId,
    elementName: row.elementInstance.name,
    thumbnailUrl: row.photos[0]?.url ?? null,
  }));

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
  };
}
