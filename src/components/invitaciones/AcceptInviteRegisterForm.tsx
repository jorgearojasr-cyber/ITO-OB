"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/form/FormField";
import { acceptInviteRegister, type AcceptInviteState } from "@/lib/auth/actions";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "@/components/auth/AuthForm.module.css";

const INITIAL_STATE: AcceptInviteState = {};

type AcceptInviteRegisterFormProps = {
  token: string;
  email: string;
};

export function AcceptInviteRegisterForm({ token, email }: AcceptInviteRegisterFormProps) {
  const [state, formAction, isPending] = useActionState(acceptInviteRegister.bind(null, token), INITIAL_STATE);

  return (
    <form action={formAction}>
      {state.error && <div className={styles.formError}>{state.error}</div>}

      <FormField label="Nombre" htmlFor="name" required>
        <input id="name" name="name" className={formStyles.input} required />
      </FormField>
      <FormField label="Email" htmlFor="email" required>
        <input id="email" name="email" type="email" defaultValue={email} readOnly className={formStyles.input} required />
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
        {isPending ? "Creando cuenta…" : "Crear cuenta y aceptar"}
      </button>
    </form>
  );
}
