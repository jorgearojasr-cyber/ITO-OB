"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteRoomInstance, deleteElementInstance, type PendingRemovalItem } from "@/lib/inspections/actions";
import { evidenceLabel } from "@/lib/inspections/evidence-label";
import { DeleteRoomModal } from "./DeleteRoomModal";
import styles from "./PendingRemovalsPanel.module.css";

type PendingRemovalsPanelProps = {
  inspectionId: string;
  title: string;
  items: PendingRemovalItem[];
  doneHref: string;
};

export function PendingRemovalsPanel({ inspectionId, title, items: initialItems, doneHref }: PendingRemovalsPanelProps) {
  const [items, setItems] = useState(initialItems);
  const [pending, setPending] = useState<PendingRemovalItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleting, startTransition] = useTransition();

  function handleConfirm() {
    if (!pending) return;
    const target = pending;
    startTransition(async () => {
      try {
        if (target.kind === "room") {
          await deleteRoomInstance({ inspectionId, roomInstanceId: target.id });
        } else {
          await deleteElementInstance({ inspectionId, elementInstanceId: target.id });
        }
        setItems((current) => current.filter((item) => item.id !== target.id));
        setPending(null);
      } catch (caughtError) {
        setErrorMessage(caughtError instanceof Error ? caughtError.message : "No se pudo eliminar. Reintenta.");
        setPending(null);
      }
    });
  }

  return (
    <div className={styles.wrap}>
      {errorMessage && <div className={styles.formError}>{errorMessage}</div>}
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.counter}>
        {items.length > 0 ? `Elimina ${items.length} para continuar` : "Listo — nada pendiente"}
      </div>

      {items.length > 0 && (
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.row}>
              <div className={styles.rowBody}>
                <div className={styles.rowName}>{item.name}</div>
                <div className={styles.rowEvidence}>{evidenceLabel(item)}</div>
              </div>
              <button type="button" className={styles.deleteBtn} onClick={() => setPending(item)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <Link href={doneHref} className={styles.saveBtn}>
          Volver
        </Link>
      )}

      {pending && (
        <DeleteRoomModal
          itemName={pending.name}
          photoCount={pending.photoCount}
          observationCount={pending.observationCount}
          isPending={isDeleting}
          onCancel={() => setPending(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
