"use client";

import { useRef, useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import type { ObservationStatus, Priority } from "@prisma/client";
import { attachPhoto, saveChecklistAnswer } from "@/lib/inspections/actions";
import styles from "./ChecklistItemRow.module.css";

type Photo = { id: string; url: string };
type SaveState = "idle" | "saved" | "error";

type ChecklistItemRowProps = {
  inspectionId: string;
  elementInstanceId: string;
  checklistItemTemplateId: string;
  question: string;
  helpText: string | null;
  initialObservation: {
    id: string;
    status: ObservationStatus;
    comment: string | null;
    priority: Priority | null;
    photos: Photo[];
  } | null;
  onAnswered?: (checklistItemTemplateId: string) => void;
};

const PRIORITIES: Priority[] = ["ALTA", "MEDIA", "BAJA"];

export function ChecklistItemRow({
  inspectionId,
  elementInstanceId,
  checklistItemTemplateId,
  question,
  helpText,
  initialObservation,
  onAnswered,
}: ChecklistItemRowProps) {
  const [status, setStatus] = useState<ObservationStatus | null>(initialObservation?.status ?? null);
  const [comment, setComment] = useState(initialObservation?.comment ?? "");
  const [priority, setPriority] = useState<Priority>(initialObservation?.priority ?? "MEDIA");
  const [observationId, setObservationId] = useState<string | null>(initialObservation?.id ?? null);
  const [photos, setPhotos] = useState<Photo[]>(initialObservation?.photos ?? []);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function persist(nextStatus: ObservationStatus, nextComment: string, nextPriority: Priority) {
    startTransition(async () => {
      try {
        const result = await saveChecklistAnswer({
          inspectionId,
          elementInstanceId,
          checklistItemTemplateId,
          status: nextStatus,
          comment: nextStatus === "OBSERVATION" ? nextComment : null,
          priority: nextStatus === "OBSERVATION" ? nextPriority : null,
        });
        setObservationId(result.observationId);
        setSaveState("saved");
        setTimeout(() => setSaveState((current) => (current === "saved" ? "idle" : current)), 1500);
      } catch {
        setSaveState("error");
      }
    });
  }

  function handleMarkCorrect() {
    setStatus("CORRECT");
    persist("CORRECT", comment, priority);
    onAnswered?.(checklistItemTemplateId);
  }

  function handleMarkObservation() {
    setStatus("OBSERVATION");
    persist("OBSERVATION", comment, priority);
    onAnswered?.(checklistItemTemplateId);
  }

  function handleCommentBlur() {
    if (status === "OBSERVATION") {
      persist("OBSERVATION", comment, priority);
    }
  }

  function handlePriorityChange(nextPriority: Priority) {
    setPriority(nextPriority);
    if (status === "OBSERVATION") {
      persist("OBSERVATION", comment, nextPriority);
    }
  }

  function handlePhotoButtonClick() {
    if (!observationId) return;
    fileInputRef.current?.click();
  }

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !observationId) return;

    setUploadError(null);
    setIsUploading(true);
    try {
      const blob = await upload(`observations/${observationId}/${crypto.randomUUID()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      const result = await attachPhoto({
        inspectionId,
        elementInstanceId,
        observationId,
        url: blob.url,
        contentType: blob.contentType,
      });

      setPhotos((current) => [...current, { id: result.photoId, url: result.url }]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "No se pudo subir la foto");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className={styles.row}>
      <div className={styles.questionRow}>
        <div>
          <div className={styles.question}>{question}</div>
          {helpText && <div className={styles.helpText}>{helpText}</div>}
        </div>
        {saveState === "saved" && <span className={styles.savedBadge}>Guardado ✓</span>}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={status === "CORRECT" ? `${styles.actionBtn} ${styles.correctOn}` : styles.actionBtn}
          onClick={handleMarkCorrect}
          disabled={isPending}
        >
          ✔ Correcto
        </button>
        <button
          type="button"
          className={status === "OBSERVATION" ? `${styles.actionBtn} ${styles.observationOn}` : styles.actionBtn}
          onClick={handleMarkObservation}
          disabled={isPending}
        >
          ⚠ Observación
        </button>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.photoBtn}`}
          onClick={handlePhotoButtonClick}
          disabled={isPending || isUploading || !observationId}
          aria-label="Agregar fotografía"
          title={observationId ? "Agregar fotografía" : "Marca ✔ u ⚠ primero"}
        >
          {isUploading ? "…" : "📷"}
          {photos.length > 0 && <span className={styles.photoCount}>{photos.length}</span>}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={handleFileSelected}
        />
      </div>

      {saveState === "error" && (
        <div className={styles.uploadError}>No se pudo guardar, reintenta.</div>
      )}

      {uploadError && <div className={styles.uploadError}>{uploadError}</div>}

      {photos.length > 0 && (
        <div className={styles.thumbnails}>
          {photos.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={photo.id} src={photo.url} alt="" className={styles.thumbnail} />
          ))}
        </div>
      )}

      {status === "OBSERVATION" && (
        <div className={styles.observationPanel}>
          <textarea
            className={styles.textarea}
            placeholder="Describe lo que observaste…"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onBlur={handleCommentBlur}
          />
          <div className={styles.priorityRow}>
            <span className={styles.priorityLabel}>Prioridad:</span>
            {PRIORITIES.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  priority === option
                    ? `${styles.priorityOption} ${styles.priorityOptionOn}`
                    : styles.priorityOption
                }
                onClick={() => handlePriorityChange(option)}
              >
                {option === "ALTA" ? "Alta" : option === "MEDIA" ? "Media" : "Baja"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
