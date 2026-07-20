import Link from "next/link";
import type { InicioData } from "@/lib/inspections/get-inicio-data";
import styles from "./NextStepCard.module.css";

type NextStepCardProps = {
  inspectionId: string;
  nextStep: InicioData["nextStep"];
};

export function NextStepCard({ inspectionId, nextStep }: NextStepCardProps) {
  if (!nextStep) {
    return (
      <div className={styles.card}>
        <div className={styles.thumb}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12L10 17L19 7"
              stroke="#C6791A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <div className={styles.eyebrow}>SIGUIENTE PASO</div>
          <div className={styles.title}>Sin pendientes</div>
          <div className={styles.desc}>Ya revisaste todos los elementos de esta inspección.</div>
        </div>
      </div>
    );
  }

  return (
    <Link className={styles.card} href={`/inspecciones/${inspectionId}/recintos/${nextStep.roomInstanceId}`}>
      <div className={styles.thumb}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="9" width="7" height="7" rx="1" stroke="#C6791A" strokeWidth="1.5" />
          <path
            d="M6.5 9V6.5C6.5 5.4 7.4 4.5 8.5 4.5H18C19.1 4.5 20 5.4 20 6.5V16.5C20 17.6 19.1 18.5 18 18.5H12"
            stroke="#C6791A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="12.3" r="1" fill="#C6791A" />
        </svg>
      </div>
      <div className={styles.info}>
        <div className={styles.eyebrow}>SIGUIENTE PASO</div>
        <div className={styles.title}>{nextStep.roomName}</div>
        <div className={styles.desc}>
          Tienes {nextStep.pendingCount} elemento{nextStep.pendingCount === 1 ? "" : "s"} pendiente
          {nextStep.pendingCount === 1 ? "" : "s"} por revisar.
        </div>
      </div>
      <span className={styles.chevron}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.5L13 10L7.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
