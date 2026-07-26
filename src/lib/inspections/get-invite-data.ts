import "server-only";

import type { InspectionInviteStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type InviteLookup = {
  id: string;
  email: string;
  status: InspectionInviteStatus;
  isExpired: boolean;
  inspectionId: string;
  projectName: string;
  unitLabel: string;
};

// Sin requireSession() a propósito: la pantalla /invitaciones/[token] debe
// poder mostrar de qué inspección se trata incluso sin sesión iniciada,
// para poder ofrecer login/registro. La posesión del token es la única
// prueba de acceso en este punto — ver la anotación de seguridad en
// InspectionInvite (schema.prisma).
export async function getInviteByToken(token: string): Promise<InviteLookup | null> {
  const invite = await prisma.inspectionInvite.findUnique({
    where: { token },
    select: {
      id: true,
      email: true,
      status: true,
      expiresAt: true,
      inspectionId: true,
      inspection: { select: { projectName: true, unitLabel: true } },
    },
  });
  if (!invite) return null;

  return {
    id: invite.id,
    email: invite.email,
    status: invite.status,
    isExpired: invite.expiresAt < new Date(),
    inspectionId: invite.inspectionId,
    projectName: invite.inspection.projectName,
    unitLabel: invite.inspection.unitLabel,
  };
}

export type InspectionInviteRow = {
  id: string;
  email: string;
  status: InspectionInviteStatus;
  createdAt: Date;
};

export async function getInspectionInvitesData(inspectionId: string): Promise<InspectionInviteRow[]> {
  const session = await requireSession();

  return prisma.inspectionInvite.findMany({
    where: { inspectionId, inspection: { organizationId: session.user.organizationId } },
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, status: true, createdAt: true },
  });
}
