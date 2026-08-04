import "server-only";

import type { ElementInstanceStatus } from "@prisma/client";

type RoomWithElementStatuses = {
  id: string;
  name: string;
  elements: { status: ElementInstanceStatus }[];
};

// Algoritmo único de "siguiente paso pendiente" -- ver
// docs/PRODUCT_DECISIONS.md. Primer recinto, respetando el orden ya
// definido (se asume `rooms` pre-ordenado por RoomInstance.order),
// que todavía tenga al menos un elemento PENDING. Nunca "el de
// índice+1" -- evita sugerir un recinto ya completado cuando el
// usuario avanzó fuera de orden. Toda pantalla que sugiera "qué sigue"
// debe llamar a esta función, no reimplementar el cálculo.
export function findNextPendingRoom<T extends RoomWithElementStatuses>(rooms: T[]): T | null {
  return rooms.find((room) => room.elements.some((element) => element.status === "PENDING")) ?? null;
}
