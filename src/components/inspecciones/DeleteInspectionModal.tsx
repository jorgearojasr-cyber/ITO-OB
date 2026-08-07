"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteInspection } from "@/lib/inspections/actions";
import styles from "./DeleteInspectionModal.module.css";

type DeleteInspectionModalProps = {
  inspectionId: string;
  projectName: string;
  unitLabel: string;
  onCancel: () => void;
};

// Mismo tono y estructura que CloseInspectionModal (overlay + card,
// acción irreversible explícita) pero sin captura de firmas -- acá el
// borrado es inmediato tras confirmar, no hay pasos intermedios
// (Sprint UX-02, P2).
export function DeleteInspectionModal({ inspectionId, projectName, unitLabel, onCancel }: DeleteInspectionModalProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setIsPending(true);
    setError(null);
    try {
      await deleteInspection({ inspectionId });
      router.refresh();
      onCancel();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo eliminar la inspección.");
      setIsPending(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={isPending ? undefined : onCancel}>
      <div className={styles.card} onClick={(event) => event.stopPropagation()}>
        <div className={styles.title}>Eliminar inspección</div>
        <div className={styles.body}>
          Vas a eliminar <strong>{projectName} — {unitLabel}</strong> junto con todos sus recintos, elementos,
          observaciones, fotos y el informe si ya fue generado. Esta acción no se puede deshacer.
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={isPending}>
            Cancelar
          </button>
          <button type="button" className={styles.confirmBtn} onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Eliminando…" : "Eliminar definitivamente"}
          </button>
        </div>
      </div>
    </div>
  );
}
