"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { revokeInspectionInvite } from "@/lib/inspections/invite-actions";
import type { InspectionInviteRow } from "@/lib/inspections/get-invite-data";
import { InviteCollaboratorModal } from "./InviteCollaboratorModal";
import styles from "./InviteCollaboratorSection.module.css";

type InviteCollaboratorSectionProps = {
  inspectionId: string;
  invites: InspectionInviteRow[];
};

const STATUS_LABEL: Record<InspectionInviteRow["status"], string> = {
  PENDING: "Pendiente",
  ACCEPTED: "Aceptada",
  REVOKED: "Revocada",
};

export function InviteCollaboratorSection({ inspectionId, invites }: InviteCollaboratorSectionProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDone() {
    setIsModalOpen(false);
    router.refresh();
  }

  function handleRevoke(inviteId: string) {
    setError(null);
    startTransition(async () => {
      try {
        await revokeInspectionInvite({ inspectionId, inviteId });
        router.refresh();
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "No se pudo revocar la invitación.");
      }
    });
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.inviteBtn} onClick={() => setIsModalOpen(true)}>
        Invitar a constructora
      </button>
      <div className={styles.hint}>
        Da acceso puntual a esta inspección para adjuntar evidencia y avanzar el estado de las
        observaciones de postventa, sin sumarlos a tu organización.
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {invites.length > 0 && (
        <div className={styles.list}>
          {invites.map((invite) => (
            <div key={invite.id} className={styles.row}>
              <div className={styles.rowBody}>
                <div className={styles.rowEmail}>{invite.email}</div>
                <div className={styles.rowStatus}>{STATUS_LABEL[invite.status]}</div>
              </div>
              {invite.status !== "REVOKED" && (
                <button
                  type="button"
                  className={styles.revokeBtn}
                  onClick={() => handleRevoke(invite.id)}
                  disabled={isPending}
                >
                  Revocar
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && <InviteCollaboratorModal inspectionId={inspectionId} onDone={handleDone} />}
    </div>
  );
}
