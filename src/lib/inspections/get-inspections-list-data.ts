import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type InspectionListItemData = {
  id: string;
  projectName: string;
  unitLabel: string;
  address: string;
  date: Date | null;
  percent: number;
  statusLabel: "EN_PROGRESO" | "COMPLETADA";
  firstRoomId: string | null;
};

export async function getInspectionsListData(): Promise<InspectionListItemData[]> {
  const session = await requireSession();

  const inspections = await prisma.inspection.findMany({
    where: { organizationId: session.user.organizationId },
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

    return {
      id: inspection.id,
      projectName: inspection.projectName,
      unitLabel: inspection.unitLabel,
      address: inspection.address,
      date: inspection.receptionDate ?? inspection.createdAt,
      percent,
      statusLabel:
        inspection.status === "COMPLETED" || inspection.status === "CLOSED" ? "COMPLETADA" : "EN_PROGRESO",
      firstRoomId: inspection.rooms[0]?.id ?? null,
    };
  });
}
