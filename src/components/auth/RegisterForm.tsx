"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/form/FormField";
import { registerUser, type RegisterState } from "@/lib/auth/actions";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "./AuthForm.module.css";

const INITIAL_STATE: RegisterState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, INITIAL_STATE);

  return (
    <form action={formAction}>
      {state.error && <div className={styles.formError}>{state.error}</div>}

      <FormField label="Nombre" htmlFor="name" required>
        <input id="name" name="name" className={formStyles.input} required />
      </FormField>
      <FormField label="Email" htmlFor="email" required>
        <input id="email" name="email" type="email" className={formStyles.input} required />
      </FormField>
      <FormField label="Contraseña" htmlFor="password" required>
        <input
          id="password"
          name="password"
          type="password"
          className={formStyles.input}
          minLength={8}
          required
        />
      </FormField>

      <button type="submit" className={styles.submitBtn} disabled={isPending}>
        {isPending ? "Creando cuenta…" : "Crear cuenta"}
      </button>

      <div className={styles.footer}>
        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
      </div>
    </form>
  );
}
