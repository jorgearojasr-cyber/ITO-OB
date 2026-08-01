import Link from "next/link";
import { getPasswordResetTokenStatus } from "@/lib/auth/get-password-reset-token";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import styles from "@/components/auth/AuthForm.module.css";

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const status = await getPasswordResetTokenStatus(token ?? "");

  if (status !== "valid") {
    const message =
      status === "used"
        ? "Este link ya fue usado para cambiar la contraseña."
        : status === "expired"
          ? "Este link venció. Los links de recuperación duran 1 hora."
          : "Este link de recuperación no existe.";

    return (
      <div className={styles.screen}>
        <div className={styles.card}>
          <div className={styles.title}>Link no disponible</div>
          <div className={styles.subtitle}>{message}</div>
          <Link href="/recuperar-password" className={styles.submitBtn} style={{ display: "block", textAlign: "center" }}>
            Solicitar un link nuevo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.title}>Elige una contraseña nueva</div>
        <ResetPasswordForm token={token!} />
      </div>
    </div>
  );
}
