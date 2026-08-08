import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";
import { canManageInspection } from "@/lib/auth/permissions";

export type InspectionListItemData = {
  id: string;
  projectName: string;
  unitLabel: string;
  address: string;
  coverPhotoUrl: string | null;
  date: Date | null;
  percent: number;
  // Hallazgo 4 (Auditoría UX): "Completada" no distinguía "cerrada con
  // el 100% revisado" de "cerrada con elementos pendientes" -- ambas
  // usaban la misma palabra. isClosed maneja la navegación (una
  // inspección cerrada ya no se recorre por recintos); statusLabel es
  // puramente de presentación, calculado con el mismo % que ya se
  // muestra en la barra de avance de la tarjeta.
  statusLabel: "EN_CURSO" | "FINALIZADA" | "CERRADA_CON_PENDIENTES";
  isClosed: boolean;
  firstRoomId: string | null;
  isCollaboration: boolean;
  // Mismo criterio que /resumen (isOrgMember && canManageInspection) --
  // gatilla acciones destructivas/de gestión (Eliminar) en el
  // ActionMenu; un colaborador externo nunca las ve, aunque tenga
  // acceso de lectura a la inspección.
  canManage: boolean;
};

export async function getInspectionsListData(): Promise<InspectionListItemData[]> {
  const session = await requireSession();

  const inspections = await prisma.inspection.findMany({
    where: inspectionAccessWhere(session.user.id, session.user.organizationId),
    orderBy: { createdAt: "desc" },
    include: {
      rooms: {
        orderBy: { order: "asc" },
        include: { elements: true },
      },
    },
  });

  return inspections.map((inspection) => {
    const totalElements = inspection.rooms.reduce((sum, room) => sum + room.elements.length, 0);
    const doneElements = inspection.rooms.reduce(
      (sum, room) => sum + room.elements.filter((element) => element.status !== "PENDING").length,
      0,
    );
    const percent = totalElements === 0 ? 0 : Math.round((doneElements / totalElements) * 100);
    const isCollaboration = inspection.organizationId !== session.user.organizationId;
    const isClosed = inspection.status === "COMPLETED" || inspection.status === "CLOSED";

    return {
      id: inspection.id,
      projectName: inspection.projectName,
      unitLabel: inspection.unitLabel,
      address: inspection.address,
      coverPhotoUrl: inspection.coverPhotoUrl,
      date: inspection.receptionDate ?? inspection.createdAt,
      percent,
      statusLabel: !isClosed ? "EN_CURSO" : percent === 100 ? "FINALIZADA" : "CERRADA_CON_PENDIENTES",
      isClosed,
      firstRoomId: inspection.rooms[0]?.id ?? null,
      isCollaboration,
      canManage: !isCollaboration && canManageInspection(session.user.role),
    };
  });
}
