"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export async function markNotificationRead(notificationId: string): Promise<{ success: true }> {
  const session = await requireSession();

  await prisma.notification.updateMany({
    where: { id: notificationId, organizationId: session.user.organizationId, readAt: null },
    data: { readAt: new Date() },
  });

  revalidatePath("/notificaciones");
  revalidatePath("/");

  return { success: true };
}

export async function markAllNotificationsRead(): Promise<{ success: true }> {
  const session = await requireSession();

  await prisma.notification.updateMany({
    where: {
      organizationId: session.user.organizationId,
      OR: [{ userId: null }, { userId: session.user.id }],
      NOT: { createdByUserId: session.user.id },
      readAt: null,
    },
    data: { readAt: new Date() },
  });

  revalidatePath("/notificaciones");
  revalidatePath("/");

  return { success: true };
}
