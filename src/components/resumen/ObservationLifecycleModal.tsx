"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import type { ObservationLifecycleStatus } from "@prisma/client";
import { advanceObservationLifecycle } from "@/lib/inspections/actions";
import type { ObservationSummaryItem } from "@/lib/inspections/get-observations-summary-data";
import styles from "./ObservationLifecycleModal.module.css";

const STATES: { value: ObservationLifecycleStatus; label: string }[] = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "EN_REPARACION", label: "En reparación" },
  { value: "RESUELTO", label: "Resuelto" },
  { value: "VERIFICADO", label: "Verificado" },
];

type ObservationLifecycleModalProps = {
  observation: ObservationSummaryItem;
  onClose: () => void;
};

export function ObservationLifecycleModal({ observation, onClose }: ObservationLifecycleModalProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<ObservationLifecycleStatus>(observation.lifecycleStatus ?? "PENDIENTE");
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiresPhoto = selected === "RESUELTO";
  const hasPhotoEvidence = observation.repairPhotos.length > 0 || newPhotos.length > 0;
  const canConfirm = !requiresPhoto || hasPhotoEvidence;

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length > 0) setNewPhotos((current) => [...current, ...files]);
  }

  async function handleConfirm() {
    if (!canConfirm) return;

    setIsPending(true);
    setError(null);
    try {
      const repairPhotoUrls = await Promise.all(
        newPhotos.map(async (file) => {
          const blob = await upload(`observations/${observation.id}/reparacion-${crypto.randomUUID()}.jpg`, file, {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
          });
          return blob.url;
        }),
      );

      await advanceObservationLifecycle({
        observationId: observation.id,
        lifecycleStatus: selected,
        repairPhotoUrls,
      });

      router.refresh();
      onClose();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo actualizar el estado.");
      setIsPending(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={isPending ? undefined : onClose}>
      <div className={styles.card} onClick={(event) => event.stopPropagation()}>
        <div className={styles.title}>Actualizar estado</div>
        <div className={styles.chips}>
          {STATES.map((state) => (
            <button
              key={state.value}
              type="button"
              className={selected === state.value ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              onClick={() => setSelected(state.value)}
              disabled={isPending}
            >
              {state.label}
            </button>
          ))}
        </div>

        {requiresPhoto && (
          <div className={styles.photoSection}>
            <div className={styles.photoLabel}>Foto de verificación (obligatoria)</div>
            {(observation.repairPhotos.length > 0 || newPhotos.length > 0) && (
              <div className={styles.thumbnails}>
                {observation.repairPhotos.map((photo) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={photo.id} src={photo.url} alt="Foto de reparación" className={styles.thumbnail} />
                ))}
                {newPhotos.map((file, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Foto de reparación nueva"
                    className={styles.thumbnail}
                  />
                ))}
              </div>
            )}
            <button type="button" className={styles.addPhotoBtn} onClick={() => fileInputRef.current?.click()} disabled={isPending}>
              + Agregar foto
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={handleFilesSelected}
            />
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isPending}>
            Cancelar
          </button>
          <button type="button" className={styles.confirmBtn} onClick={handleConfirm} disabled={!canConfirm || isPending}>
            {isPending ? "Guardando…" : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
