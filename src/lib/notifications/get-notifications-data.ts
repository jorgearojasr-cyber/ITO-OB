import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type NotificationItem = {
  id: string;
  title: string;
  body: string | null;
  linkUrl: string | null;
  readAt: Date | null;
  createdAt: Date;
};

// Visible para toda la organización: broadcasts (userId null) o dirigidas
// a mí, excluyendo siempre lo que yo mismo generé — no tiene sentido
// notificarme de mi propia acción.
function visibilityWhere(organizationId: string, userId: string) {
  return {
    organizationId,
    OR: [{ userId: null }, { userId }],
    NOT: { createdByUserId: userId },
  };
}

export async function getNotificationsData(): Promise<NotificationItem[]> {
  const session = await requireSession();

  return prisma.notification.findMany({
    where: visibilityWhere(session.user.organizationId, session.user.id),
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, body: true, linkUrl: true, readAt: true, createdAt: true },
  });
}

export async function getUnreadNotificationCount(): Promise<number> {
  const session = await requireSession();

  return prisma.notification.count({
    where: { ...visibilityWhere(session.user.organizationId, session.user.id), readAt: null },
  });
}
