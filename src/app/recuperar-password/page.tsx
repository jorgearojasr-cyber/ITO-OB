import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { RequestPasswordResetForm } from "@/components/auth/RequestPasswordResetForm";
import styles from "@/components/auth/AuthForm.module.css";

export default async function RecuperarPasswordPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.title}>¿Olvidaste tu contraseña?</div>
        <RequestPasswordResetForm />
      </div>
    </div>
  );
}
