"use client";

import { useRef, useState, useTransition } from "react";
import { unstable_rethrow } from "next/navigation";
import { upload } from "@vercel/blob/client";
import type { ObservationStatus, Priority } from "@prisma/client";
import { attachPhoto, saveChecklistAnswer } from "@/lib/inspections/actions";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { GuidedCameraOverlay } from "./GuidedCameraOverlay";
import styles from "./ChecklistItemCard.module.css";

type Photo = { id: string; url: string };
type SaveState = "idle" | "saved" | "error";
type CameraPhase = "guide" | "preview";

type ChecklistItemCardProps = {
  inspectionId: string;
  elementInstanceId: string;
  elementName: string;
  roomName: string;
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
  // Dispara la confirmación "Escuchando" de Don José Luis en el padre.
  // Puramente de presentación -- no cambia qué se guarda ni cuándo.
  onAction?: () => void;
};

const PRIORITIES: Priority[] = ["ALTA", "MEDIA", "BAJA"];
const PRIORITY_ON_CLASS: Record<Priority, string> = {
  ALTA: "priorityOptionOnAlta",
  MEDIA: "priorityOptionOnMedia",
  BAJA: "priorityOptionOnBaja",
};

export function ChecklistItemCard({
  inspectionId,
  elementInstanceId,
  elementName,
  roomName,
  checklistItemTemplateId,
  question,
  helpText,
  initialObservation,
  onAnswered,
  onAction,
}: ChecklistItemCardProps) {
  const photoAlt = `Foto de ${elementName} — ${roomName}`;
  const [status, setStatus] = useState<ObservationStatus | null>(initialObservation?.status ?? null);
  const [comment, setComment] = useState(initialObservation?.comment ?? "");
  const [priority, setPriority] = useState<Priority>(initialObservation?.priority ?? "MEDIA");
  const [observationId, setObservationId] = useState<string | null>(initialObservation?.id ?? null);
  const [photos, setPhotos] = useState<Photo[]>(initialObservation?.photos ?? []);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraPhase, setCameraPhase] = useState<CameraPhase>("guide");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState<string | null>(null);
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
        onAction?.();
        setTimeout(() => setSaveState((current) => (current === "saved" ? "idle" : current)), 1500);
      } catch (error) {
        unstable_rethrow(error);
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
    setUploadError(null);
    setCameraPhase("guide");
    setCameraOpen(true);
  }

  function handleOpenNativeCamera() {
    fileInputRef.current?.click();
  }

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPendingFile(file);
    setPendingPreviewUrl(URL.createObjectURL(file));
    setCameraPhase("preview");
  }

  function clearPendingPhoto() {
    if (pendingPreviewUrl) URL.revokeObjectURL(pendingPreviewUrl);
    setPendingFile(null);
    setPendingPreviewUrl(null);
  }

  function handleRetakePhoto() {
    clearPendingPhoto();
    setCameraPhase("guide");
    fileInputRef.current?.click();
  }

  function handleCancelCamera() {
    clearPendingPhoto();
    setCameraOpen(false);
    setCameraPhase("guide");
    setUploadError(null);
  }

  async function handleConfirmPhoto() {
    if (!pendingFile || !observationId) return;

    setUploadError(null);
    setIsUploading(true);
    try {
      const blob = await upload(`observations/${observationId}/${crypto.randomUUID()}-${pendingFile.name}`, pendingFile, {
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
      clearPendingPhoto();
      setCameraOpen(false);
      setCameraPhase("guide");
      onAction?.();
    } catch (error) {
      unstable_rethrow(error);
      setUploadError(error instanceof Error ? error.message : "No se pudo subir la foto");
    } finally {
      setIsUploading(false);
    }
  }

  const isAnswered = status !== null;

  return (
    <div className={isAnswered ? `${styles.card} ${status === "CORRECT" ? styles.cardCorrect : styles.cardObservation}` : styles.card}>
      <div className={styles.questionRow}>
        <div>
          <div className={styles.question}>{question}</div>
          {helpText && <div className={styles.helpText}>{helpText}</div>}
        </div>
        {saveState === "saved" && <span className={styles.savedBadge}>Guardado ✓</span>}
        {saveState !== "saved" && status === null && (
          <span className={styles.statusPillPending}>Sin responder</span>
        )}
      </div>

      {status === null && (
        <div className={styles.fastpath}>
          <button type="button" className={styles.primaryBtn} onClick={handleMarkCorrect} disabled={isPending}>
            Marcar como correcto
          </button>
        </div>
      )}

      {status === "CORRECT" && <div className={styles.checkBadge}>✓ Está bien — registrado</div>}

      {status !== "OBSERVATION" && (
        <div className={styles.secondaryRow}>
          <button type="button" className={styles.secondaryLink} onClick={handleMarkObservation} disabled={isPending}>
            {status === "CORRECT" ? "En realidad tiene un problema" : "Reportar un problema"}
          </button>
        </div>
      )}

      {status === "OBSERVATION" && (
        <div className={styles.expandPanel}>
          <div className={styles.textareaWrap}>
            <textarea
              className={styles.textarea}
              placeholder="Describe lo que observaste…"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              onBlur={handleCommentBlur}
            />
          </div>
          <div className={styles.priorityRow}>
            <span className={styles.priorityLabel}>Prioridad:</span>
            {PRIORITIES.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  priority === option
                    ? `${styles.priorityOption} ${styles[PRIORITY_ON_CLASS[option]]}`
                    : styles.priorityOption
                }
                onClick={() => handlePriorityChange(option)}
              >
                {option === "ALTA" ? "Alta" : option === "MEDIA" ? "Media" : "Baja"}
              </button>
            ))}
          </div>
          <button type="button" className={styles.secondaryLink} onClick={handleMarkCorrect} disabled={isPending}>
            En realidad está bien
          </button>
        </div>
      )}

      <div className={styles.photoRow}>
        <button
          type="button"
          className={observationId ? styles.photoBtn : `${styles.photoBtn} ${styles.photoBtnDisabled}`}
          onClick={handlePhotoButtonClick}
          disabled={isPending || !observationId}
          aria-label="Agregar fotografía guiada"
          title={observationId ? "Agregar fotografía guiada" : "Marca 'Está bien' o 'Reportar un problema' primero"}
        >
          📷 {photos.length > 0 ? `${photos.length} foto${photos.length > 1 ? "s" : ""}` : "Agregar fotografía"}
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

      {saveState === "error" && <div className={styles.uploadError}>No se pudo guardar, reintenta.</div>}

      {photos.length > 0 && (
        <div className={styles.thumbnails}>
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className={styles.thumbnailBtn}
              onClick={() => setLightboxIndex(index)}
              aria-label="Ver foto en tamaño completo"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photoAlt} className={styles.thumbnail} />
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos.map((photo) => ({ ...photo, alt: photoAlt }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {cameraOpen && (
        <GuidedCameraOverlay
          phase={cameraPhase}
          previewUrl={pendingPreviewUrl ?? undefined}
          isUploading={isUploading}
          error={uploadError}
          onOpenCamera={handleOpenNativeCamera}
          onConfirm={handleConfirmPhoto}
          onRetake={handleRetakePhoto}
          onCancel={handleCancelCamera}
        />
      )}
    </div>
  );
}
