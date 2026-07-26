"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/form/FormField";
import { acceptInviteLogin, type LoginState } from "@/lib/auth/actions";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "@/components/auth/AuthForm.module.css";

const INITIAL_STATE: LoginState = {};

type AcceptInviteLoginFormProps = {
  token: string;
  defaultEmail: string;
};

export function AcceptInviteLoginForm({ token, defaultEmail }: AcceptInviteLoginFormProps) {
  const [state, formAction, isPending] = useActionState(acceptInviteLogin.bind(null, token), INITIAL_STATE);

  return (
    <form action={formAction}>
      {state.error && <div className={styles.formError}>{state.error}</div>}

      <FormField label="Email" htmlFor="email" required>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={defaultEmail}
          className={formStyles.input}
          required
        />
      </FormField>
      <FormField label="Contraseña" htmlFor="password" required>
        <input id="password" name="password" type="password" className={formStyles.input} required />
      </FormField>

      <button type="submit" className={styles.submitBtn} disabled={isPending}>
        {isPending ? "Ingresando…" : "Iniciar sesión y aceptar"}
      </button>
    </form>
  );
}
