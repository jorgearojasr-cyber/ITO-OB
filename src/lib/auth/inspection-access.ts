import type { Prisma } from "@prisma/client";

// Segundo camino de acceso a una inspección, además de pertenecer a la
// Organization dueña: un InspectionCollaborator vigente (ver
// InspectionInvite para cómo llega a existir esa fila). Usar solo en los
// puntos de acceso que un colaborador externo debe poder alcanzar — no en
// acciones organizativas/destructivas (closeInspection, applyFeatureChanges,
// updateRoomCounts, deleteRoomInstance, deleteElementInstance,
// saveChecklistAnswer), que siguen exigiendo organizationId puro.
export function inspectionAccessWhere(userId: string, organizationId: string): Prisma.InspectionWhereInput {
  return {
    OR: [{ organizationId }, { collaborators: { some: { userId } } }],
  };
}
