"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { acceptInviteWithSession } from "@/lib/auth/actions";
import styles from "@/components/auth/AuthForm.module.css";

type AcceptInviteButtonProps = {
  token: string;
};

export function AcceptInviteButton({ token }: AcceptInviteButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleAccept() {
    setError(null);
    startTransition(async () => {
      try {
        const { inspectionId } = await acceptInviteWithSession(token);
        router.push(`/inspecciones/${inspectionId}/resumen`);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "No se pudo aceptar la invitación.");
      }
    });
  }

  return (
    <>
      {error && <div className={styles.formError}>{error}</div>}
      <button type="button" className={styles.submitBtn} onClick={handleAccept} disabled={isPending}>
        {isPending ? "Aceptando…" : "Aceptar invitación"}
      </button>
    </>
  );
}
