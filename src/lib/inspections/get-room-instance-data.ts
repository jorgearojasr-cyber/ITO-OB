import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

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
  const session = await requireSession();

  const room = await prisma.roomInstance.findFirst({
    where: {
      id: roomInstanceId,
      inspectionId,
      inspection: { organizationId: session.user.organizationId },
    },
    include: {
      elements: {
        orderBy: { order: "asc" },
        include: { elementTemplate: { select: { slug: true } } },
      },
    },
  });

  if (!room) {
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
