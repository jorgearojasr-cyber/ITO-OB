import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type InspectionOption = {
  id: string;
  projectName: string;
  unitLabel: string;
};

export async function getInspectionOptions(): Promise<InspectionOption[]> {
  const session = await requireSession();

  const inspections = await prisma.inspection.findMany({
    where: { organizationId: session.user.organizationId },
    select: { id: true, projectName: true, unitLabel: true },
    orderBy: { createdAt: "desc" },
  });

  return inspections;
}
