"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";
import { upload } from "@vercel/blob/client";
import { closeInspection } from "@/lib/inspections/actions";
import type { ObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import styles from "./CloseInspectionModal.module.css";

type CloseInspectionModalProps = {
  inspectionId: string;
  progress: ObservationsSummaryData["progress"];
  observationsCount: number;
  onCancel: () => void;
};

async function uploadSignature(inspectionId: string, role: "owner" | "builder", dataUrl: string): Promise<string> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const result = await upload(`signatures/${inspectionId}/${role}-${crypto.randomUUID()}.png`, blob, {
    access: "public",
    contentType: "image/png",
    handleUploadUrl: "/api/blob/upload",
  });
  return result.url;
}

export function CloseInspectionModal({
  inspectionId,
  progress,
  observationsCount,
  onCancel,
}: CloseInspectionModalProps) {
  const router = useRouter();
  // Caso 1 (100% revisado): directo a la firma, sin aviso -- Caso 2
  // (queda algo pendiente): el modal nace en "warning", nunca se salta.
  // isComplete se calcula una sola vez -- si el usuario elige "Continuar
  // igualmente" y el estado no cambia mientras el modal está abierto, no
  // hay riesgo de que un re-render lo mande de vuelta al aviso.
  const isComplete = progress.percent === 100;
  const [step, setStep] = useState<"warning" | 1 | 2>(isComplete ? 1 : "warning");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ownerHasSignature, setOwnerHasSignature] = useState(false);
  const [builderHasSignature, setBuilderHasSignature] = useState(false);
  const ownerRef = useRef<SignatureCanvas>(null);
  const builderRef = useRef<SignatureCanvas>(null);

  function handleClearOwner() {
    ownerRef.current?.clear();
    setOwnerHasSignature(false);
  }

  function handleClearBuilder() {
    builderRef.current?.clear();
    setBuilderHasSignature(false);
  }

  function handleNext() {
    if (!ownerHasSignature) return;
    setStep(2);
  }

  async function handleConfirm() {
    if (!builderHasSignature || !ownerRef.current || !builderRef.current) return;

    setIsPending(true);
    setError(null);
    try {
      const [signatureOwnerUrl, signatureBuilderUrl] = await Promise.all([
        uploadSignature(inspectionId, "owner", ownerRef.current.getTrimmedCanvas().toDataURL("image/png")),
        uploadSignature(inspectionId, "builder", builderRef.current.getTrimmedCanvas().toDataURL("image/png")),
      ]);

      await closeInspection({ inspectionId, signatureOwnerUrl, signatureBuilderUrl });
      // ?justClosed=1 activa la pantalla de cierre como estado inicial de
      // /informe (Sprint 5) -- no es una ruta nueva, ver
      // Sprint-5-Validacion-Finalizacion-Inspeccion.md, Escenario 6.
      router.push(`/inspecciones/${inspectionId}/informe?justClosed=1`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo cerrar la inspección.");
      setIsPending(false);
    }
  }

  if (step === "warning") {
    const pendingElements = progress.totalElements - progress.doneElements;
    const pendingRooms = progress.totalRooms - progress.doneRooms;

    return (
      <div className={styles.overlay} onClick={isPending ? undefined : onCancel}>
        <div
          className={`${styles.card} ${styles.cardWarning}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.warningIcon} aria-hidden="true">
            ⚠️
          </div>
          <div className={styles.warningTitle}>La inspección aún no está completamente revisada</div>

          <div className={styles.statGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{progress.percent}%</div>
              <div className={styles.statLabel}>Revisado en total</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                {progress.doneRooms} <span className={styles.statOf}>de {progress.totalRooms}</span>
              </div>
              <div className={styles.statLabel}>Recintos revisados</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                {progress.doneElements} <span className={styles.statOf}>de {progress.totalElements}</span>
              </div>
              <div className={styles.statLabel}>Elementos revisados</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statValue} ${styles.statValuePending}`}>{pendingElements}</div>
              <div className={styles.statLabel}>Elementos pendientes</div>
            </div>
          </div>

          <div className={styles.observationsLine}>
            {observationsCount === 0
              ? "No se registraron observaciones."
              : `${observationsCount} observación${observationsCount === 1 ? "" : "es"} registrada${observationsCount === 1 ? "" : "s"}.`}
            {pendingRooms > 0 && ` Quedan ${pendingRooms} recinto${pendingRooms === 1 ? "" : "s"} sin revisar.`}
          </div>

          <div className={styles.consequenceLine}>
            Al firmar esta inspección se entenderá que el propietario acepta cerrar el proceso con esos
            elementos sin revisar.
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onCancel}>
              Volver a inspeccionar
            </button>
            <button type="button" className={styles.continueAnywayBtn} onClick={() => setStep(1)}>
              Continuar igualmente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={isPending ? undefined : onCancel}>
      <div className={styles.card} onClick={(event) => event.stopPropagation()}>
        <div className={styles.title}>
          {step === 1 ? "Firma del propietario" : "Firma de la constructora"}
        </div>
        <div className={styles.body}>
          {step === 1
            ? "Pide al propietario que firme dentro del recuadro para cerrar la inspección."
            : "Ahora el representante de la constructora firma para confirmar el cierre."}
        </div>

        {/*
          canvasProps.width/height son atributos HTML del <canvas> (resolución
          de dibujo), no CSS — a diferencia de los inputs del wizard de Nueva
          inspección, un canvas oculto con display:none queda con layout 0x0,
          así que fijarlos a mano es obligatorio para que el canvas del paso 2
          no quede inutilizable al mostrarse. clearOnResize=false evita que un
          resize de ventana intente releer ese layout y lo vuelva a poner en 0.
        */}
        <div
          className={ownerHasSignature ? `${styles.padWrap} ${styles.padWrapCaptured}` : styles.padWrap}
          style={{ display: step === 1 ? "block" : "none" }}
        >
          <SignatureCanvas
            ref={ownerRef}
            penColor="#1a1f2b"
            clearOnResize={false}
            canvasProps={{ width: 500, height: 200, className: styles.pad }}
            onEnd={() => setOwnerHasSignature(true)}
          />
          {ownerHasSignature && <div className={styles.captureBadge}>✓</div>}
        </div>
        <div
          className={builderHasSignature ? `${styles.padWrap} ${styles.padWrapCaptured}` : styles.padWrap}
          style={{ display: step === 2 ? "block" : "none" }}
        >
          <SignatureCanvas
            ref={builderRef}
            penColor="#1a1f2b"
            clearOnResize={false}
            canvasProps={{ width: 500, height: 200, className: styles.pad }}
            onEnd={() => setBuilderHasSignature(true)}
          />
          {builderHasSignature && <div className={styles.captureBadge}>✓</div>}
        </div>

        {step === 1 && ownerHasSignature && <div className={styles.confirmLine}>✓ Firma capturada</div>}
        {step === 2 && builderHasSignature && (
          <div className={styles.confirmLine}>✓ Firma capturada — ambas partes registradas</div>
        )}

        <button
          type="button"
          className={styles.clearBtn}
          onClick={step === 1 ? handleClearOwner : handleClearBuilder}
          disabled={isPending}
        >
          Limpiar
        </button>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          {step === 1 ? (
            <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={isPending}>
              Cancelar
            </button>
          ) : (
            <button type="button" className={styles.cancelBtn} onClick={() => setStep(1)} disabled={isPending}>
              Atrás
            </button>
          )}
          {step === 1 ? (
            <button type="button" className={styles.confirmBtn} onClick={handleNext} disabled={!ownerHasSignature}>
              Siguiente
            </button>
          ) : (
            <button
              type="button"
              className={styles.confirmBtn}
              onClick={handleConfirm}
              disabled={!builderHasSignature || isPending}
            >
              {isPending ? "Cerrando…" : "Firmar y cerrar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
