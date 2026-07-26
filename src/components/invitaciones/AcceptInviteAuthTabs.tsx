"use client";

import { useState } from "react";
import { AcceptInviteRegisterForm } from "./AcceptInviteRegisterForm";
import { AcceptInviteLoginForm } from "./AcceptInviteLoginForm";
import styles from "@/components/auth/AuthForm.module.css";
import linkStyles from "./AcceptInviteAuthTabs.module.css";

type AcceptInviteAuthTabsProps = {
  token: string;
  email: string;
};

export function AcceptInviteAuthTabs({ token, email }: AcceptInviteAuthTabsProps) {
  const [mode, setMode] = useState<"register" | "login">("register");

  return (
    <>
      {mode === "register" ? (
        <AcceptInviteRegisterForm token={token} email={email} />
      ) : (
        <AcceptInviteLoginForm token={token} defaultEmail={email} />
      )}
      <div className={styles.footer}>
        {mode === "register" ? (
          <>
            ¿Ya tienes cuenta?{" "}
            <button type="button" className={linkStyles.linkBtn} onClick={() => setMode("login")}>
              Inicia sesión
            </button>
          </>
        ) : (
          <>
            ¿Primera vez aquí?{" "}
            <button type="button" className={linkStyles.linkBtn} onClick={() => setMode("register")}>
              Crea una cuenta
            </button>
          </>
        )}
      </div>
    </>
  );
}
