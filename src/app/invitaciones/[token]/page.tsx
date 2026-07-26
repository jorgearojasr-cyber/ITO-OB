import { auth } from "@/lib/auth/auth";
import { logoutAction } from "@/lib/auth/actions";
import { getInviteByToken } from "@/lib/inspections/get-invite-data";
import { AcceptInviteAuthTabs } from "@/components/invitaciones/AcceptInviteAuthTabs";
import { AcceptInviteButton } from "@/components/invitaciones/AcceptInviteButton";
import styles from "@/components/auth/AuthForm.module.css";

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function AcceptInvitePage({ params }: PageProps) {
  const { token } = await params;
  const [invite, session] = await Promise.all([getInviteByToken(token), auth()]);

  if (!invite || invite.status !== "PENDING" || invite.isExpired) {
    return (
      <div className={styles.screen}>
        <div className={styles.card}>
          <div className={styles.title}>Invitación no disponible</div>
          <div className={styles.subtitle}>
            {!invite
              ? "Este link de invitación no existe."
              : invite.status === "ACCEPTED"
                ? "Esta invitación ya fue aceptada."
                : invite.status === "REVOKED"
                  ? "Esta invitación fue revocada."
                  : "Esta invitación venció. Pide un link nuevo a quien te invitó."}
          </div>
        </div>
      </div>
    );
  }

  const sessionEmail = session?.user?.email?.trim().toLowerCase();

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.title}>Invitación a colaborar</div>
        <div className={styles.subtitle}>
          {invite.projectName} — {invite.unitLabel}
        </div>

        {!session?.user ? (
          <AcceptInviteAuthTabs token={token} email={invite.email} />
        ) : sessionEmail === invite.email ? (
          <AcceptInviteButton token={token} />
        ) : (
          <>
            <div className={styles.formError}>
              Esta invitación fue enviada a {invite.email}, pero tu sesión actual es {session.user.email}.
              Cierra sesión e ingresa con la cuenta correcta para aceptarla.
            </div>
            <form action={logoutAction}>
              <button type="submit" className={styles.submitBtn}>
                Cerrar sesión
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
