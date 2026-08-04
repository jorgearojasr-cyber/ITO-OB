import { PriorityBadge } from "@/components/ui/PriorityBadge";
import type { SynthesisTone } from "@/lib/inspections/synthesis-rules";
import styles from "./InspectionSynthesisCard.module.css";

type InspectionSynthesisCardProps = {
  tone: SynthesisTone;
  headline: string;
  progressText: string;
  byPriority: { ALTA: number; MEDIA: number; BAJA: number };
};

// "¿Cómo quedó esta vivienda después de la inspección?" (Sprint 4) --
// el titular es el elemento dominante de la pantalla; el progreso es
// texto plano de apoyo, deliberadamente sin ProgressRing (ver
// docs/Sprint-4-Validacion-Resumen-Inspeccion.md: el componente no
// escala su tipografía a tamaños pequeños, y este sprint no reabre
// componentes de sprints ya cerrados para adaptarlos a un uso nuevo).
export function InspectionSynthesisCard({ tone, headline, progressText, byPriority }: InspectionSynthesisCardProps) {
  const hasObservations = byPriority.ALTA > 0 || byPriority.MEDIA > 0 || byPriority.BAJA > 0;

  return (
    <div className={tone === "attention" ? `${styles.card} ${styles.attention}` : `${styles.card} ${styles.good}`}>
      <div className={styles.eyebrow}>Cómo quedó la vivienda</div>
      <p className={styles.headline}>{headline}</p>
      <p className={styles.progress}>{progressText}</p>
      {hasObservations && (
        <div className={styles.priorityRow}>
          {byPriority.ALTA > 0 && (
            <span className={styles.priorityItem}>
              <PriorityBadge priority="ALTA" /> {byPriority.ALTA}
            </span>
          )}
          {byPriority.MEDIA > 0 && (
            <span className={styles.priorityItem}>
              <PriorityBadge priority="MEDIA" /> {byPriority.MEDIA}
            </span>
          )}
          {byPriority.BAJA > 0 && (
            <span className={styles.priorityItem}>
              <PriorityBadge priority="BAJA" /> {byPriority.BAJA}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
