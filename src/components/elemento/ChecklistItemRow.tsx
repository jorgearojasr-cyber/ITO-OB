"use client";

import { useState, useTransition } from "react";
import type { ObservationStatus, Priority } from "@prisma/client";
import { addDemoPhoto, saveChecklistAnswer } from "@/lib/inspections/actions";
import styles from "./ChecklistItemRow.module.css";

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
    photoCount: number;
  } | null;
};

const PRIORITIES: Priority[] = ["ALTA", "MEDIA", "BAJA"];

export function ChecklistItemRow({
  inspectionId,
  elementInstanceId,
  checklistItemTemplateId,
  question,
  helpText,
  initialObservation,
}: ChecklistItemRowProps) {
  const [status, setStatus] = useState<ObservationStatus | null>(initialObservation?.status ?? null);
  const [comment, setComment] = useState(initialObservation?.comment ?? "");
  const [priority, setPriority] = useState<Priority>(initialObservation?.priority ?? "MEDIA");
  const [observationId, setObservationId] = useState<string | null>(initialObservation?.id ?? null);
  const [photoCount, setPhotoCount] = useState(initialObservation?.photoCount ?? 0);
  const [isPending, startTransition] = useTransition();

  function persist(nextStatus: ObservationStatus, nextComment: string, nextPriority: Priority) {
    startTransition(async () => {
      const result = await saveChecklistAnswer({
        inspectionId,
        elementInstanceId,
        checklistItemTemplateId,
        status: nextStatus,
        comment: nextStatus === "OBSERVATION" ? nextComment : null,
        priority: nextStatus === "OBSERVATION" ? nextPriority : null,
      });
      setObservationId(result.observationId);
    });
  }

  function handleMarkCorrect() {
    setStatus("CORRECT");
    persist("CORRECT", comment, priority);
  }

  function handleMarkObservation() {
    setStatus("OBSERVATION");
    persist("OBSERVATION", comment, priority);
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

  function handleAddPhoto() {
    if (!observationId) return;
    startTransition(async () => {
      await addDemoPhoto({ inspectionId, elementInstanceId, observationId });
      setPhotoCount((count) => count + 1);
    });
  }

  return (
    <div className={styles.row}>
      <div className={styles.question}>{question}</div>
      {helpText && <div className={styles.helpText}>{helpText}</div>}

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
          onClick={handleAddPhoto}
          disabled={isPending || !observationId}
          aria-label="Agregar fotografía"
          title={observationId ? "Agregar fotografía" : "Marca ✔ u ⚠ primero"}
        >
          📷{photoCount > 0 && <span className={styles.photoCount}>{photoCount}</span>}
        </button>
      </div>

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
