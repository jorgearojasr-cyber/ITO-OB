import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";

export type InspectionWelcomeData = {
  userName: string;
  projectName: string;
  unitLabel: string;
  firstRoomId: string;
} | null;

// Solo lectura -- ningún campo nuevo en el schema. El primer recinto se
// resuelve con el mismo criterio de orden que ya usa createInspection
// (RoomInstance.order asc), para llevar exactamente al mismo lugar al
// que hoy se aterriza directo tras crear la inspección.
export async function getInspectionWelcomeData(inspectionId: string): Promise<InspectionWelcomeData> {
  const session = await requireSession();

  const [user, inspection, firstRoom] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id }, select: { name: true } }),
    prisma.inspection.findFirst({
      where: {
        id: inspectionId,
        ...inspectionAccessWhere(session.user.id, session.user.organizationId),
      },
      select: { projectName: true, unitLabel: true },
    }),
    prisma.roomInstance.findFirst({
      where: { inspectionId },
      orderBy: { order: "asc" },
      select: { id: true },
    }),
  ]);

  if (!user || !inspection || !firstRoom) {
    return null;
  }

  return {
    userName: user.name.split(" ")[0],
    projectName: inspection.projectName,
    unitLabel: inspection.unitLabel,
    firstRoomId: firstRoom.id,
  };
}
