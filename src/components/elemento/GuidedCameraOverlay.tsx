import styles from "./GuidedCameraOverlay.module.css";

type GuidedCameraOverlayProps = {
  phase: "guide" | "preview";
  previewUrl?: string;
  isUploading?: boolean;
  error?: string | null;
  onOpenCamera: () => void;
  onConfirm: () => void;
  onRetake: () => void;
  onCancel: () => void;
};

// Capa visual sobre la captura nativa existente (input[type=file][capture])
// -- no reemplaza ese mecanismo por una cámara custom (getUserMedia). Solo
// agrega una guía de encuadre antes de abrir la cámara del sistema, y un
// paso de "usar esta foto / repetir" antes de subirla. El upload en sí
// (upload() + attachPhoto) sigue viviendo, sin cambios, en quien use este
// componente.
export function GuidedCameraOverlay({
  phase,
  previewUrl,
  isUploading,
  error,
  onOpenCamera,
  onConfirm,
  onRetake,
  onCancel,
}: GuidedCameraOverlayProps) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Cámara guiada">
      <div className={styles.top}>
        <button type="button" className={styles.close} onClick={onCancel} aria-label="Cancelar">
          ✕
        </button>
        <span className={styles.topLabel}>Fotografía guiada</span>
        <span className={styles.topSpacer} />
      </div>

      {phase === "guide" ? (
        <>
          <div className={styles.guide}>
            <div className={styles.guideFrame} aria-hidden="true">
              <span className={styles.guideIcon}>▭</span>
            </div>
            <p className={styles.tip}>Encuadra el elemento completo, con buena luz.</p>
          </div>
          <div className={styles.bottom}>
            <button type="button" className={styles.primaryBtn} onClick={onOpenCamera}>
              Abrir cámara
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.preview}>
            {previewUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Foto capturada, sin confirmar" className={styles.previewImg} />
            )}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.bottomRow}>
            <button type="button" className={styles.secondaryBtn} onClick={onRetake} disabled={isUploading}>
              Repetir
            </button>
            <button type="button" className={styles.primaryBtn} onClick={onConfirm} disabled={isUploading}>
              {isUploading ? "Subiendo…" : "Usar esta foto"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
