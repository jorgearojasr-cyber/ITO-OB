import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { requireSession } from "@/lib/auth/session";
import { logoutAction } from "@/lib/auth/actions";
import { prisma } from "@/lib/db/prisma";
import styles from "./page.module.css";

export default async function PerfilPage() {
  const session = await requireSession();

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    include: { organization: true },
  });

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title="Perfil" backHref="/" />
        <div className={styles.card}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
          <div className={styles.org}>{user.organization.name}</div>
        </div>
        <form action={logoutAction}>
          <button type="submit" className={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </form>
      </div>
      <BottomNav active="perfil" />
    </div>
  );
}
