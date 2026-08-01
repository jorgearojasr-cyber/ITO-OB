import "server-only";

import { prisma } from "@/lib/db/prisma";
import { hashResetToken } from "./password-reset-token";

export type PasswordResetTokenStatus = "valid" | "invalid" | "expired" | "used";

// Sin requireSession() a propósito, igual que getInviteByToken -- quien
// llega acá no tiene sesión (olvidó su contraseña). La posesión del
// token es la prueba de acceso.
export async function getPasswordResetTokenStatus(token: string): Promise<PasswordResetTokenStatus> {
  if (!token) return "invalid";

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token) },
    select: { expiresAt: true, usedAt: true },
  });
  if (!resetToken) return "invalid";
  if (resetToken.usedAt) return "used";
  if (resetToken.expiresAt < new Date()) return "expired";
  return "valid";
}
