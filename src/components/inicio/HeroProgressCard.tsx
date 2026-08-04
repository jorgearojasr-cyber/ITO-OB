import Link from "next/link";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { InicioData } from "@/lib/inspections/get-inicio-data";
import styles from "./HeroProgressCard.module.css";

type HeroProgressCardProps = {
  inspection: InicioData["inspection"];
  progress: InicioData["progress"];
  nextStep: InicioData["nextStep"];
  hasAnyInspections: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function HeroProgressCard({ inspection, progress, nextStep, hasAnyInspections }: HeroProgressCardProps) {
  if (!inspection && !hasAnyInspections) {
    return (
      <div className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.pulse} /> SIN PROYECTOS
        </div>
        <div className={styles.emptyBadge} aria-hidden="true">
          🏡
        </div>
        <div className={styles.title} style={{ maxWidth: "none" }}>
          Aún no tienes ninguna inspección.
        </div>
        <div className={styles.ctaRow}>
          <Link className={styles.ctaPrimary} href="/inspecciones/nueva">
            + Nueva inspección
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 4.5L13 10L7.5 15.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  if (!inspection) {
    return (
      <div className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.pulse} /> SIN INSPECCIÓN ACTIVA
        </div>
        <div className={styles.emptyBadge} aria-hidden="true">
          🗂️
        </div>
        <div className={styles.title} style={{ maxWidth: "none" }}>
          Aún no tienes una inspección en curso.
        </div>
        <div className={styles.ctaRow}>
          <Link className={styles.ctaPrimary} href="/inspecciones/nueva">
            + Nueva inspección
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 4.5L13 10L7.5 15.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.hero}>
      <div className={styles.eyebrow}>
        <span className={styles.pulse} /> INSPECCIÓN EN PROGRESO
      </div>
      <div className={styles.top}>
        <div className={styles.title}>
          {inspection.projectName} — {inspection.unitLabel}
        </div>
        <ProgressRing percent={progress.percent} />
      </div>

      <div className={styles.meta}>
        {inspection.receptionDate && (
          <div className={styles.metaRow}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="4" width="14" height="13" rx="2" stroke="#8892A6" strokeWidth="1.5" />
              <path d="M3 8H17" stroke="#8892A6" strokeWidth="1.5" />
              <path d="M7 2.5V5.5M13 2.5V5.5" stroke="#8892A6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {dateFormatter.format(inspection.receptionDate)}
          </div>
        )}
        {inspection.developerName && (
          <div className={styles.metaRow}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="3" width="12" height="14" rx="1.5" stroke="#8892A6" strokeWidth="1.5" />
              <path
                d="M7 6.5H9M7 9.5H9M11 6.5H13M11 9.5H13M8 17V13.5H12V17"
                stroke="#8892A6"
                strokeWidth="1.4"
              />
            </svg>
            {inspection.developerName}
          </div>
        )}
      </div>

      <div className={styles.ctaRow}>
        {nextStep ? (
          <>
            <Link
              className={styles.ctaPrimary}
              href={`/inspecciones/${inspection.id}/recintos/${nextStep.roomInstanceId}`}
            >
              Continuar recorrido
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 4.5L13 10L7.5 15.5"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link className={styles.ctaSecondary} href={`/inspecciones/${inspection.id}/resumen`}>
              Ver resumen
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 4.5L13 10L7.5 15.5" stroke="#DD7A36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </>
        ) : (
          <Link className={styles.ctaPrimary} href={`/inspecciones/${inspection.id}/resumen`}>
            Ver resumen
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 4.5L13 10L7.5 15.5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>

      <div className={styles.statsLine}>
        <b>{progress.totalRooms}</b> recintos · <b>{progress.totalElements}</b> elementos ·{" "}
        <b>{progress.totalObservations}</b> observaciones · <b>{progress.totalPhotos}</b> fotos
      </div>
    </div>
  );
}
