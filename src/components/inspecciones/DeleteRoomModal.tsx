"use client";

import styles from "./DeleteRoomModal.module.css";

type DeleteRoomModalProps = {
  roomName: string;
  photoCount: number;
  observationCount: number;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteRoomModal({
  roomName,
  photoCount,
  observationCount,
  isPending,
  onCancel,
  onConfirm,
}: DeleteRoomModalProps) {
  const parts: string[] = [];
  if (photoCount > 0) parts.push(`${photoCount} foto${photoCount === 1 ? "" : "s"}`);
  if (observationCount > 0) parts.push(`${observationCount} ${observationCount === 1 ? "observación" : "observaciones"}`);
  const evidenceText = parts.length > 0 ? parts.join(" y ") + " guardadas ahí" : "el checklist contestado ahí";

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.card} onClick={(event) => event.stopPropagation()}>
        <div className={styles.title}>¿Seguro que quieres eliminar {roomName}?</div>
        <div className={styles.body}>
          Esto borra permanentemente {evidenceText}. Esta acción no se puede deshacer.
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={isPending}>
            Cancelar
          </button>
          <button type="button" className={styles.confirmBtn} onClick={onConfirm} disabled={isPending}>
            {isPending ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
