"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/form/FormField";
import { loginAction, type LoginState } from "@/lib/auth/actions";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "./AuthForm.module.css";

const INITIAL_STATE: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, INITIAL_STATE);

  return (
    <form action={formAction}>
      {state.error && <div className={styles.formError}>{state.error}</div>}

      <FormField label="Email" htmlFor="email" required>
        <input id="email" name="email" type="email" className={formStyles.input} required />
      </FormField>
      <FormField label="Contraseña" htmlFor="password" required>
        <input id="password" name="password" type="password" className={formStyles.input} required />
      </FormField>

      <button type="submit" className={styles.submitBtn} disabled={isPending}>
        {isPending ? "Ingresando…" : "Iniciar sesión"}
      </button>

      <div className={styles.footer}>
        ¿No tienes cuenta? <Link href="/registro">Crea una</Link>
      </div>
    </form>
  );
}
