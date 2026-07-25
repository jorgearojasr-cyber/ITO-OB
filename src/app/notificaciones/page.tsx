import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { NotificationsList } from "@/components/notificaciones/NotificationsList";
import { getNotificationsData } from "@/lib/notifications/get-notifications-data";
import styles from "./page.module.css";

export default async function NotificacionesPage() {
  const notifications = await getNotificationsData();

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title="Notificaciones" backHref="/" />
        <NotificationsList notifications={notifications} />
      </div>
      <BottomNav active="inicio" />
    </div>
  );
}
