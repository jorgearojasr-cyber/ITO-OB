import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { findNextPendingRoom } from "./next-pending-room";

export type RoomInstanceData = {
  id: string;
  name: string;
  inspectionId: string;
  projectName: string;
  unitLabel: string;
  position: number;
  totalRooms: number;
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
  // Siguiente recinto con trabajo pendiente, mismo algoritmo que
  // nextStep de Inicio (ver docs/PRODUCT_DECISIONS.md) -- null si no
  // queda ningún recinto pendiente en toda la inspección.
  nextPendingRoom: { id: string; name: string } | null;
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
      inspection: { select: { projectName: true, unitLabel: true } },
      elements: {
        orderBy: { order: "asc" },
        include: { elementTemplate: { select: { slug: true } } },
      },
    },
  });

  if (!room) {
    return null;
  }

  // Hermanos del recinto (misma inspección, mismo orden) -- necesarios
  // para calcular la posición ("Recinto N de M") y el siguiente
  // recinto pendiente con el algoritmo único compartido con Inicio.
  const siblingRooms = await prisma.roomInstance.findMany({
    where: { inspectionId },
    orderBy: { order: "asc" },
    select: { id: true, name: true, elements: { select: { status: true } } },
  });

  const position = siblingRooms.findIndex((sibling) => sibling.id === room.id) + 1;
  const nextPendingRoom = findNextPendingRoom(siblingRooms);

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
    projectName: room.inspection.projectName,
    unitLabel: room.inspection.unitLabel,
    position,
    totalRooms: siblingRooms.length,
    elements,
    progress: {
      done,
      total,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
    },
    nextPendingRoom: nextPendingRoom ? { id: nextPendingRoom.id, name: nextPendingRoom.name } : null,
  };
}
