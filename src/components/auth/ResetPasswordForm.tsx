"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/form/FormField";
import { resetPassword, type ResetPasswordState } from "@/lib/auth/password-reset-actions";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "./AuthForm.module.css";

const INITIAL_STATE: ResetPasswordState = {};

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(resetPassword.bind(null, token), INITIAL_STATE);

  if (state.success) {
    return (
      <>
        <div className={styles.subtitle}>Tu contraseña se actualizó correctamente.</div>
        <Link href="/login" className={styles.submitBtn} style={{ display: "block", textAlign: "center" }}>
          Iniciar sesión
        </Link>
      </>
    );
  }

  return (
    <form action={formAction}>
      {state.error && <div className={styles.formError}>{state.error}</div>}

      <FormField label="Contraseña nueva" htmlFor="password" required>
        <input id="password" name="password" type="password" className={formStyles.input} minLength={8} required />
      </FormField>
      <FormField label="Confirma la contraseña nueva" htmlFor="confirmPassword" required>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={formStyles.input}
          minLength={8}
          required
        />
      </FormField>

      <button type="submit" className={styles.submitBtn} disabled={isPending}>
        {isPending ? "Guardando…" : "Cambiar contraseña"}
      </button>
    </form>
  );
}
