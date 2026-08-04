"use client";

import { useState } from "react";
import { DonJoseLuisAvatar } from "@/components/ui/DonJoseLuisAvatar";
import { retryReportGeneration } from "@/lib/inspections/actions";
import { useReportPolling } from "@/lib/informe/use-report-polling";
import type { ReportStatus } from "@prisma/client";
import styles from "./ClosingExperience.module.css";

export type ClosingExperienceReport = {
  status: ReportStatus;
  errorMessage: string | null;
  isRetryExhausted: boolean;
};

type ClosingExperienceProps = {
  inspectionId: string;
  projectName: string;
  unitLabel: string;
  summary: {
    percent: number;
    totalRooms: number;
    totalElements: number;
    doneElements: number;
    totalObservations: number;
  };
  report: ClosingExperienceReport;
  onContinue: () => void;
};

// Sprint 5 -- pantalla de cierre, estado inicial de /informe (no una ruta
// nueva, ver Etapa 4 Escenario 6). El titular no presupone 100% de avance
// (Etapa 4 Escenario 4): la aplicación sigue permitiendo cerrar con
// elementos pendientes, así que el copy describe lo que realmente pasó.
export function ClosingExperience({
  inspectionId,
  projectName,
  unitLabel,
  summary,
  report,
  onContinue,
}: ClosingExperienceProps) {
  const { isSlow, resetSlow } = useReportPolling(report.status);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  async function handleRetry() {
    setIsRetrying(true);
    setRetryError(null);
    resetSlow();
    try {
      await retryReportGeneration(inspectionId);
    } catch (error) {
      setRetryError(error instanceof Error ? error.message : "No se pudo reintentar la generación.");
    } finally {
      setIsRetrying(false);
    }
  }

  const headline = summary.percent === 100 ? "Terminaste de recorrer tu vivienda" : "Cerraste tu inspección";

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.mark} aria-hidden="true">
            ✓
          </div>
          <h1 className={styles.headline}>{headline}</h1>
          <div className={styles.sub}>
            {projectName} — {unitLabel}
          </div>
        </div>

        <div className={styles.djlBlock}>
          <DonJoseLuisAvatar variant="presente" size="lg" />
          <p className={styles.djlMsg}>
            Revisaste tu vivienda con calma y dejaste un respaldo real de lo que encontraste — eso es tuyo, pase lo
            que pase.
          </p>
        </div>

        <div className={styles.recap}>
          <div className={styles.recapItem}>
            <span className={styles.recapN}>{summary.totalRooms}</span>
            <span className={styles.recapL}>Recintos</span>
          </div>
          <div className={styles.recapItem}>
            <span className={styles.recapN}>
              {summary.doneElements}/{summary.totalElements}
            </span>
            <span className={styles.recapL}>Elementos revisados</span>
          </div>
          <div className={styles.recapItem}>
            <span className={styles.recapN}>{summary.totalObservations}</span>
            <span className={styles.recapL}>Observaciones</span>
          </div>
        </div>

        {report.status === "PENDING" && (
          <div className={`${styles.pill} ${styles.pillPending}`}>
            <span className={styles.dot} />
            {isSlow ? "Esto se está demorando…" : "Generando informe…"}
          </div>
        )}
        {report.status === "READY" && (
          <div className={`${styles.pill} ${styles.pillReady}`}>
            <span className={styles.dot} />
            Informe listo
          </div>
        )}
        {report.status === "FAILED" && (
          <div className={styles.failedBlock}>
            <div className={`${styles.pill} ${styles.pillFailed}`}>
              <span className={styles.dot} />
              No se pudo generar el informe
            </div>
            {report.isRetryExhausted ? (
              <p className={styles.failedMsg}>
                {report.errorMessage ?? "No se pudo generar el informe."} No pudimos generarlo después de varios
                intentos — contáctanos para ayudarte a resolverlo.
              </p>
            ) : (
              <>
                <p className={styles.failedMsg}>
                  {retryError ?? report.errorMessage ?? "No se pudo generar el informe."} Puedes reintentar.
                </p>
                <button type="button" className={styles.retryBtn} onClick={handleRetry} disabled={isRetrying}>
                  {isRetrying ? "Reintentando…" : "Reintentar generación"}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cta} onClick={onContinue}>
          Ver informe
        </button>
        <p className={styles.postNote}>Lo que quedó pendiente lo vas a poder seguir viendo y resolviendo desde aquí.</p>
      </div>
    </div>
  );
}
