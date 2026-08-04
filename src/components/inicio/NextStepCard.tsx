import Link from "next/link";
import type { InicioData } from "@/lib/inspections/get-inicio-data";
import styles from "./NextStepCard.module.css";

type NextStepCardProps = {
  inspectionId: string;
  nextStep: InicioData["nextStep"];
  hasAnyInspections: boolean;
  // Ya disponible en InicioData -- se suma como prop para distinguir
  // "sin recintos" de "100% revisado" sin ningún dato ni cálculo nuevo.
  progress: InicioData["progress"];
};

export function NextStepCard({ inspectionId, nextStep, hasAnyInspections, progress }: NextStepCardProps) {
  if (!nextStep) {
    const isFullyReviewed = hasAnyInspections && progress.totalRooms > 0 && progress.percent === 100;

    return (
      <div className={styles.card}>
        <div className={styles.thumb}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12L10 17L19 7"
              stroke="#DD7A36"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <div className={styles.eyebrow}>CONTINUEMOS</div>
          {isFullyReviewed ? (
            <>
              <div className={styles.title}>Ya recorriste todo</div>
              <div className={styles.desc}>Revisa el resumen para cerrar la inspección.</div>
            </>
          ) : hasAnyInspections ? (
            <>
              <div className={styles.title}>Retomemos cuando quieras</div>
              <div className={styles.desc}>Revisa tus inspecciones anteriores o empieza una nueva.</div>
            </>
          ) : (
            <>
              <div className={styles.title}>Empecemos por acá</div>
              <div className={styles.desc}>Registra el proyecto y la unidad que vas a recibir.</div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link className={styles.card} href={`/inspecciones/${inspectionId}/recintos/${nextStep.roomInstanceId}`}>
      <div className={styles.thumb}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="9" width="7" height="7" rx="1" stroke="#DD7A36" strokeWidth="1.5" />
          <path
            d="M6.5 9V6.5C6.5 5.4 7.4 4.5 8.5 4.5H18C19.1 4.5 20 5.4 20 6.5V16.5C20 17.6 19.1 18.5 18 18.5H12"
            stroke="#DD7A36"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="12.3" r="1" fill="#DD7A36" />
        </svg>
      </div>
      <div className={styles.info}>
        <div className={styles.eyebrow}>CONTINUEMOS</div>
        <div className={styles.title}>Sigamos en {nextStep.roomName}</div>
        <div className={styles.desc}>
          Tienes {nextStep.pendingCount} elemento{nextStep.pendingCount === 1 ? "" : "s"} pendiente
          {nextStep.pendingCount === 1 ? "" : "s"} por revisar.
        </div>
      </div>
      <span className={styles.continueBtn}>
        Continuar
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.5L13 10L7.5 15.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
