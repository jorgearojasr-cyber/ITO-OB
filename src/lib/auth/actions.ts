"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "./session";
import { signIn, signOut } from "./auth";

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email o contraseña incorrectos." };
    }
    throw error;
  }
}

export type RegisterState = { error?: string };

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Completa nombre, email y contraseña." };
  }
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Ya existe una cuenta con ese email." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: { name, type: "PARTICULAR", plan: "GRATUITO" },
    });
    await tx.user.create({
      data: {
        organizationId: organization.id,
        email,
        passwordHash,
        name,
        role: "PROPIETARIO",
      },
    });
  });

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Cuenta creada. Inicia sesión manualmente en /login.",
      };
    }
    throw error;
  }
  return {};
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}

// Mismo que loginAction pero redirige de vuelta a la invitación en vez de
// "/" — quien ya tiene cuenta necesita volver a /invitaciones/[token] para
// poder aceptarla con esa sesión.
export async function acceptInviteLogin(
  token: string,
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: `/invitaciones/${token}`,
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email o contraseña incorrectos." };
    }
    throw error;
  }
}

async function loadPendingInvite(token: string) {
  const invite = await prisma.inspectionInvite.findUnique({
    where: { token },
    select: { id: true, email: true, status: true, expiresAt: true, inspectionId: true },
  });
  if (!invite || invite.status !== "PENDING" || invite.expiresAt < new Date()) {
    return null;
  }
  return invite;
}

export type AcceptInviteState = { error?: string };

// Mismo patrón que registerUser (Organization tipo PARTICULAR + User
// PROPIETARIO en una transacción), más la creación del
// InspectionCollaborator para la inspección de la invitación en esa misma
// transacción — el rol PROPIETARIO en su organización nueva de un solo
// miembro no tiene relación con lo que puede hacer en la inspección
// ajena, eso lo controla exclusivamente InspectionCollaborator.
export async function acceptInviteRegister(
  token: string,
  _prevState: AcceptInviteState,
  formData: FormData,
): Promise<AcceptInviteState> {
  const invite = await loadPendingInvite(token);
  if (!invite) {
    return { error: "Esta invitación ya no es válida." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Completa nombre, email y contraseña." };
  }
  if (email !== invite.email) {
    return { error: "El email debe coincidir con el de la invitación." };
  }
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Ya existe una cuenta con ese email. Inicia sesión en vez de registrarte." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: { name, type: "PARTICULAR", plan: "GRATUITO" },
    });
    const user = await tx.user.create({
      data: { organizationId: organization.id, email, passwordHash, name, role: "PROPIETARIO" },
    });
    await tx.inspectionCollaborator.create({
      data: { inspectionId: invite.inspectionId, userId: user.id },
    });
    await tx.inspectionInvite.update({
      where: { id: invite.id },
      data: { status: "ACCEPTED", acceptedByUserId: user.id },
    });
  });

  try {
    await signIn("credentials", { email, password, redirectTo: `/inspecciones/${invite.inspectionId}/resumen` });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Cuenta creada. Inicia sesión manualmente en /login." };
    }
    throw error;
  }
  return {};
}

// Camino para alguien que ya tiene cuenta (en cualquier organización) y
// solo necesita sumar el InspectionCollaborator de esta invitación a su
// sesión actual — exige que el email de la sesión coincida con el de la
// invitación, para no aceptar por error con la cuenta equivocada ya
// logueada.
export async function acceptInviteWithSession(token: string): Promise<{ inspectionId: string }> {
  const session = await requireSession();

  const invite = await loadPendingInvite(token);
  if (!invite) {
    throw new Error("Esta invitación ya no es válida.");
  }
  if (session.user.email?.trim().toLowerCase() !== invite.email) {
    throw new Error("Esta invitación fue enviada a otro email. Cierra sesión e intenta de nuevo.");
  }

  await prisma.$transaction([
    prisma.inspectionCollaborator.upsert({
      where: { inspectionId_userId: { inspectionId: invite.inspectionId, userId: session.user.id } },
      create: { inspectionId: invite.inspectionId, userId: session.user.id },
      update: {},
    }),
    prisma.inspectionInvite.update({
      where: { id: invite.id },
      data: { status: "ACCEPTED", acceptedByUserId: session.user.id },
    }),
  ]);

  return { inspectionId: invite.inspectionId };
}

export async function markOnboardingSeen(): Promise<void> {
  const session = await requireSession();
  await prisma.user.update({
    where: { id: session.user.id },
    data: { hasSeenOnboarding: true },
  });
}
