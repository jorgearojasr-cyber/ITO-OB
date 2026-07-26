"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";

const INVITE_EXPIRATION_DAYS = 7;

type CreateInspectionInviteInput = { inspectionId: string; email: string };
export type CreateInspectionInviteResult = { token: string };

export async function createInspectionInvite(
  input: CreateInspectionInviteInput,
): Promise<CreateInspectionInviteResult> {
  const session = await requireSession();
  const email = input.email.trim().toLowerCase();
  if (!email) {
    throw new Error("Ingresa un email válido.");
  }

  const inspection = await prisma.inspection.findFirst({
    where: { id: input.inspectionId, organizationId: session.user.organizationId },
    select: { id: true },
  });
  if (!inspection) {
    throw new Error("Inspección no encontrada en esta organización.");
  }
  if (!canManageInspection(session.user.role)) {
    throw new Error("Solo el propietario o un administrador puede realizar esta acción.");
  }

  const invite = await prisma.inspectionInvite.create({
    data: {
      inspectionId: input.inspectionId,
      email,
      createdByUserId: session.user.id,
      expiresAt: new Date(Date.now() + INVITE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
    },
    select: { token: true },
  });

  revalidatePath(`/inspecciones/${input.inspectionId}/resumen`);
  return { token: invite.token };
}

type RevokeInspectionInviteInput = { inspectionId: string; inviteId: string };

// Cubre ambos estados: si la invitación seguía PENDING, solo se marca
// REVOKED (nunca se llegó a crear InspectionCollaborator). Si ya fue
// ACCEPTED, además se borra el InspectionCollaborator para cortar el
// acceso ya otorgado — revocar debe funcionar en cualquier momento, no
// solo antes de que se acepte.
export async function revokeInspectionInvite(input: RevokeInspectionInviteInput): Promise<void> {
  const session = await requireSession();

  const invite = await prisma.inspectionInvite.findFirst({
    where: {
      id: input.inviteId,
      inspectionId: input.inspectionId,
      inspection: { organizationId: session.user.organizationId },
    },
    select: { id: true, status: true, acceptedByUserId: true },
  });
  if (!invite) {
    throw new Error("Invitación no encontrada en esta organización.");
  }
  if (!canManageInspection(session.user.role)) {
    throw new Error("Solo el propietario o un administrador puede realizar esta acción.");
  }

  if (invite.status === "ACCEPTED" && invite.acceptedByUserId) {
    await prisma.$transaction([
      prisma.inspectionCollaborator.deleteMany({
        where: { inspectionId: input.inspectionId, userId: invite.acceptedByUserId },
      }),
      prisma.inspectionInvite.update({ where: { id: invite.id }, data: { status: "REVOKED" } }),
    ]);
  } else {
    await prisma.inspectionInvite.update({ where: { id: invite.id }, data: { status: "REVOKED" } });
  }

  revalidatePath(`/inspecciones/${input.inspectionId}/resumen`);
}
