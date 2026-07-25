"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/notifications/actions";
import type { NotificationItem } from "@/lib/notifications/get-notifications-data";
import styles from "./NotificationsList.module.css";

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

type NotificationsListProps = {
  notifications: NotificationItem[];
};

export function NotificationsList({ notifications }: NotificationsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const hasUnread = notifications.some((notification) => !notification.readAt);

  function handleMarkAllRead() {
    startTransition(async () => {
      await markAllNotificationsRead();
      router.refresh();
    });
  }

  function handleOpen(notification: NotificationItem) {
    if (!notification.readAt) {
      startTransition(async () => {
        await markNotificationRead(notification.id);
        router.refresh();
      });
    }
    if (notification.linkUrl) {
      router.push(notification.linkUrl);
    }
  }

  if (notifications.length === 0) {
    return <div className={styles.empty}>Sin notificaciones todavía.</div>;
  }

  return (
    <div className={styles.wrap}>
      {hasUnread && (
        <button type="button" className={styles.markAllBtn} onClick={handleMarkAllRead} disabled={isPending}>
          Marcar todas como leídas
        </button>
      )}
      <div className={styles.list}>
        {notifications.map((notification) => (
          <button
            key={notification.id}
            type="button"
            className={notification.readAt ? styles.item : `${styles.item} ${styles.itemUnread}`}
            onClick={() => handleOpen(notification)}
          >
            {!notification.readAt && <span className={styles.unreadDot} />}
            <div className={styles.body}>
              <div className={styles.title}>{notification.title}</div>
              {notification.body && <div className={styles.text}>{notification.body}</div>}
              <div className={styles.time}>{dateFormatter.format(notification.createdAt)}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
