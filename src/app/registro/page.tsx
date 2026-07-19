import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { RegisterForm } from "@/components/auth/RegisterForm";
import styles from "@/components/auth/AuthForm.module.css";

export default async function RegistroPage() {
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
              stroke="#2F5FE0"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M7 13V27H25V13"
              stroke="#2F5FE0"
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
          <span className={styles.brandName}>ObraBien</span>
        </div>
        <div className={styles.title}>Crear cuenta</div>
        <div className={styles.subtitle}>
          Tu cuenta particular queda lista para tu primera inspección.
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
