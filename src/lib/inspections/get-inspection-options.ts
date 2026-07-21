import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type InspectionOption = {
  id: string;
  projectName: string;
  unitLabel: string;
  developerName: string | null;
  builderName: string | null;
};

export async function getInspectionOptions(): Promise<InspectionOption[]> {
  const session = await requireSession();

  const inspections = await prisma.inspection.findMany({
    where: { organizationId: session.user.organizationId },
    select: { id: true, projectName: true, unitLabel: true, developerName: true, builderName: true },
    orderBy: { createdAt: "desc" },
  });

  return inspections;
}

export type ProjectOption = {
  projectName: string;
  developerName: string | null;
  builderName: string | null;
};

// Deriva proyectos distintos a partir del mismo resultado de
// getInspectionOptions (ya ordenado por createdAt desc), sin volver a
// consultar la base de datos.
export function toDistinctProjects(options: InspectionOption[]): ProjectOption[] {
  const seen = new Set<string>();
  const projects: ProjectOption[] = [];
  for (const option of options) {
    if (seen.has(option.projectName)) continue;
    seen.add(option.projectName);
    projects.push({
      projectName: option.projectName,
      developerName: option.developerName,
      builderName: option.builderName,
    });
  }
  return projects;
}
