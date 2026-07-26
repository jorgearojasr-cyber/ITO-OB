"use client";

import { useState } from "react";
import { createInspectionInvite } from "@/lib/inspections/invite-actions";
import styles from "./InviteCollaboratorModal.module.css";

type InviteCollaboratorModalProps = {
  inspectionId: string;
  onDone: () => void;
};

export function InviteCollaboratorModal({ inspectionId, onDone }: InviteCollaboratorModalProps) {
  const [email, setEmail] = useState("");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleGenerate() {
    setError(null);
    setIsPending(true);
    try {
      const { token } = await createInspectionInvite({ inspectionId, email });
      setInviteUrl(`${window.location.origin}/invitaciones/${token}`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo generar la invitación.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleCopy() {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
  }

  return (
    <div className={styles.overlay} onClick={onDone}>
      <div className={styles.card} onClick={(event) => event.stopPropagation()}>
        <div className={styles.title}>Invitar a constructora</div>
        {!inviteUrl ? (
          <>
            <div className={styles.body}>
              Genera un link para que alguien externo a tu organización pueda ver esta inspección y
              trabajar en las observaciones de postventa. Compártelo tú mismo — no se envía email
              automáticamente.
            </div>
            <input
              type="email"
              className={styles.input}
              placeholder="email@constructora.cl"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isPending}
            />
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={onDone} disabled={isPending}>
                Cancelar
              </button>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={handleGenerate}
                disabled={isPending || !email.trim()}
              >
                {isPending ? "Generando…" : "Generar link"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.body}>
              Comparte este link con {email} — vence en 7 días si no lo usa.
            </div>
            <div className={styles.linkBox}>{inviteUrl}</div>
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={handleCopy}>
                {copied ? "Copiado" : "Copiar link"}
              </button>
              <button type="button" className={styles.confirmBtn} onClick={onDone}>
                Listo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
