"use server";

import crypto from "node:crypto";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { sendPasswordResetEmail } from "@/lib/email/send-password-reset-email";
import { hashResetToken } from "./password-reset-token";

const TOKEN_EXPIRATION_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000; // 30 minutos

const GENERIC_MESSAGE = "Si el correo existe en nuestro sistema, te enviamos un link para recuperar tu contraseña.";

async function resolveOrigin(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("host");
  if (!host) {
    throw new Error("No se pudo determinar el host.");
  }
  const proto = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export type RequestPasswordResetState = { message?: string };

// Responde SIEMPRE el mismo mensaje genérico, exista o no el email, se
// haya alcanzado el rate limit o no, y aunque el envío del correo
// falle -- ninguno de esos casos debe ser distinguible desde afuera.
export async function requestPasswordReset(
  _prevState: RequestPasswordResetState,
  formData: FormData,
): Promise<RequestPasswordResetState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (email) {
    try {
      const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true } });

      if (user) {
        const recentCount = await prisma.passwordResetToken.count({
          where: { userId: user.id, createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) } },
        });

        if (recentCount < MAX_REQUESTS_PER_WINDOW) {
          const token = crypto.randomBytes(32).toString("hex");

          await prisma.passwordResetToken.create({
            data: {
              userId: user.id,
              tokenHash: hashResetToken(token),
              expiresAt: new Date(Date.now() + TOKEN_EXPIRATION_MS),
            },
          });

          const origin = await resolveOrigin();
          await sendPasswordResetEmail(user.email, `${origin}/reset-password?token=${token}`);
        }
      }
    } catch (error) {
      // No se propaga -- una falla acá (ej. Resend caído) no debe
      // filtrar información distinta del mensaje genérico ni romper la
      // respuesta al usuario.
      console.error("requestPasswordReset falló internamente:", error);
    }
  }

  return { message: GENERIC_MESSAGE };
}

export type ResetPasswordState = { error?: string; success?: boolean };

export async function resetPassword(
  token: string,
  _prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!token) {
    return { error: "Este link ya no es válido. Solicita uno nuevo." };
  }
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }
  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token) },
    select: { id: true, userId: true, expiresAt: true, usedAt: true },
  });
  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return { error: "Este link ya no es válido. Solicita uno nuevo." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { usedAt: new Date() } }),
  ]);

  return { success: true };
}
