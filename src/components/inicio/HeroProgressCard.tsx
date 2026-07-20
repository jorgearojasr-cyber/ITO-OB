import Link from "next/link";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { InicioData } from "@/lib/inspections/get-inicio-data";
import styles from "./HeroProgressCard.module.css";

type HeroProgressCardProps = {
  inspection: InicioData["inspection"];
  progress: InicioData["progress"];
  nextStep: InicioData["nextStep"];
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function HeroProgressCard({ inspection, progress, nextStep }: HeroProgressCardProps) {
  if (!inspection) {
    return (
      <div className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.pulse} /> SIN INSPECCIÓN ACTIVA
        </div>
        <div className={styles.title} style={{ marginTop: 12, maxWidth: "none" }}>
          Aún no tienes una inspección en curso.
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
              <rect x="3" y="4" width="14" height="13" rx="2" stroke="#9FB4DA" strokeWidth="1.5" />
              <path d="M3 8H17" stroke="#9FB4DA" strokeWidth="1.5" />
              <path d="M7 2.5V5.5M13 2.5V5.5" stroke="#9FB4DA" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {dateFormatter.format(inspection.receptionDate)}
          </div>
        )}
        {inspection.developerName && (
          <div className={styles.metaRow}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="3" width="12" height="14" rx="1.5" stroke="#9FB4DA" strokeWidth="1.5" />
              <path
                d="M7 6.5H9M7 9.5H9M11 6.5H13M11 9.5H13M8 17V13.5H12V17"
                stroke="#9FB4DA"
                strokeWidth="1.4"
              />
            </svg>
            {inspection.developerName}
          </div>
        )}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statIcon}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M6 17V5.8C6 4.8 6.8 4 7.8 4H12.2C13.2 4 14 4.8 14 5.8V17" stroke="#fff" strokeWidth="1.5" />
              <path d="M4 17H16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="11.3" cy="10.5" r="0.9" fill="#fff" />
            </svg>
          </div>
          <div>
            <div className={styles.statVal}>{progress.totalRooms}</div>
            <div className={styles.statLbl}>Recintos</div>
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statIcon}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M6 5H16M6 10H16M6 15H12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d="M3.3 4.6L4 5.3L5.3 4"
                stroke="#3FC98A"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className={styles.statVal}>{progress.totalElements}</div>
            <div className={styles.statLbl}>Elementos</div>
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statIcon}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 3L18 16.5H2L10 3Z" stroke="#F5A623" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M10 8V11.5" stroke="#F5A623" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="10" cy="14" r="0.9" fill="#F5A623" />
            </svg>
          </div>
          <div>
            <div className={styles.statVal}>{progress.totalObservations}</div>
            <div className={styles.statLbl}>Observaciones</div>
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statIcon}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="6" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" />
              <circle cx="10" cy="11" r="2.6" stroke="#fff" strokeWidth="1.5" />
              <path
                d="M7.5 6L8.5 4H11.5L12.5 6"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className={styles.statVal}>{progress.totalPhotos}</div>
            <div className={styles.statLbl}>Fotos</div>
          </div>
        </div>
      </div>

      <div className={styles.ctaRow}>
        {nextStep && (
          <Link
            className={styles.ctaPrimary}
            href={`/inspecciones/${inspection.id}/recintos/${nextStep.roomInstanceId}`}
          >
            Continuar recorrido
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 4.5L13 10L7.5 15.5"
                stroke="#122341"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
        <Link className={styles.ctaSecondary} href={`/inspecciones/${inspection.id}/resumen`}>
          Ver resumen
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 4.5L13 10L7.5 15.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
