"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";
import { upload } from "@vercel/blob/client";
import { closeInspection } from "@/lib/inspections/actions";
import styles from "./CloseInspectionModal.module.css";

type CloseInspectionModalProps = {
  inspectionId: string;
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

export function CloseInspectionModal({ inspectionId, onCancel }: CloseInspectionModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
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
      router.push(`/inspecciones/${inspectionId}/informe`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo cerrar la inspección.");
      setIsPending(false);
    }
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
        <div className={styles.padWrap} style={{ display: step === 1 ? "block" : "none" }}>
          <SignatureCanvas
            ref={ownerRef}
            penColor="#1a1f2b"
            clearOnResize={false}
            canvasProps={{ width: 500, height: 200, className: styles.pad }}
            onEnd={() => setOwnerHasSignature(true)}
          />
        </div>
        <div className={styles.padWrap} style={{ display: step === 2 ? "block" : "none" }}>
          <SignatureCanvas
            ref={builderRef}
            penColor="#1a1f2b"
            clearOnResize={false}
            canvasProps={{ width: 500, height: 200, className: styles.pad }}
            onEnd={() => setBuilderHasSignature(true)}
          />
        </div>

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
