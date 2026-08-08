"use client";

import { useRef, useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { setInspectionCoverPhoto, removeInspectionCoverPhoto } from "@/lib/inspections/actions";
import styles from "./CoverPhotoManager.module.css";

type CoverPhotoManagerProps = {
  inspectionId: string;
  initialUrl: string | null;
};

export function CoverPhotoManager({ inspectionId, initialUrl }: CoverPhotoManagerProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelected(file: File) {
    setError(null);
    setIsUploading(true);
    try {
      const blob = await upload(`inspections/${inspectionId}/cover-${crypto.randomUUID()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });
      const result = await setInspectionCoverPhoto({
        inspectionId,
        url: blob.url,
        contentType: blob.contentType,
      });
      setUrl(result.url);
    } catch {
      setError("No se pudo subir la fotografía. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    setError(null);
    startTransition(async () => {
      try {
        await removeInspectionCoverPhoto(inspectionId);
        setUrl(null);
      } catch {
        setError("No se pudo eliminar la fotografía. Intenta nuevamente.");
      }
    });
  }

  const busy = isUploading || isPending;

  return (
    <div className={styles.wrap}>
      <div className={styles.preview}>
        {url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={url} alt="Fotografía principal del proyecto" className={styles.image} />
        ) : (
          <button
            type="button"
            className={styles.placeholder}
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
          >
            <span className={styles.placeholderGlyph} aria-hidden="true">
              📷
            </span>
            <span className={styles.placeholderText}>Agregar fotografía de la vivienda</span>
          </button>
        )}
        {busy && <div className={styles.busyOverlay}>{isUploading ? "Subiendo…" : "Guardando…"}</div>}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleFileSelected(file);
          }
          event.target.value = "";
        }}
      />

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
        >
          {url ? "Reemplazar fotografía" : "Subir o tomar fotografía"}
        </button>
        {url && (
          <button type="button" className={styles.dangerLink} onClick={handleRemove} disabled={busy}>
            Eliminar fotografía
          </button>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <p className={styles.hint}>
        Formato horizontal recomendado. Esta foto se usa como portada del proyecto en la lista de inspecciones, la
        cabecera de recintos y el resumen.
      </p>
    </div>
  );
}
