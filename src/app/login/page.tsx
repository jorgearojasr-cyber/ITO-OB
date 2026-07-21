import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import styles from "@/components/auth/AuthForm.module.css";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M4 15L16 5L28 15"
              stroke="#DD7A36"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M7 13V27H25V13"
              stroke="#DD7A36"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M12.5 18.5L15 21.5L20 16"
              stroke="#3FC98A"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className={styles.brandName}>ObraBien Inspección</span>
        </div>
        <div className={styles.title}>Iniciar sesión</div>
        <div className={styles.subtitle}>Entra para continuar tu inspección.</div>
        <LoginForm />
      </div>
    </div>
  );
}
