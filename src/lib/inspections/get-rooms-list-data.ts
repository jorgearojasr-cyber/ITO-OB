import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type RoomListItem = {
  id: string;
  name: string;
  done: number;
  total: number;
  percent: number;
};

export async function getRoomsListData(inspectionId: string): Promise<RoomListItem[] | null> {
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: { id: true },
  });
  if (!inspection) {
    return null;
  }

  const rooms = await prisma.roomInstance.findMany({
    where: { inspectionId },
    orderBy: { order: "asc" },
    include: { elements: true },
  });

  return rooms.map((room) => {
    const total = room.elements.length;
    const done = room.elements.filter((element) => element.status !== "PENDING").length;
    return {
      id: room.id,
      name: room.name,
      done,
      total,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
    };
  });
}
