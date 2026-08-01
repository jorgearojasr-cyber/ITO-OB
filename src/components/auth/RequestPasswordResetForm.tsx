"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/form/FormField";
import { requestPasswordReset, type RequestPasswordResetState } from "@/lib/auth/password-reset-actions";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "./AuthForm.module.css";

const INITIAL_STATE: RequestPasswordResetState = {};

export function RequestPasswordResetForm() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, INITIAL_STATE);

  if (state.message) {
    return (
      <>
        <div className={styles.subtitle}>{state.message}</div>
        <div className={styles.footer}>
          <Link href="/login">Volver a iniciar sesión</Link>
        </div>
      </>
    );
  }

  return (
    <form action={formAction}>
      <div className={styles.subtitle}>Ingresa tu email y te enviamos un link para recuperarla.</div>
      <FormField label="Email" htmlFor="email" required>
        <input id="email" name="email" type="email" className={formStyles.input} required />
      </FormField>

      <button type="submit" className={styles.submitBtn} disabled={isPending}>
        {isPending ? "Enviando…" : "Enviar link de recuperación"}
      </button>

      <div className={styles.footer}>
        <Link href="/login">Volver a iniciar sesión</Link>
      </div>
    </form>
  );
}
