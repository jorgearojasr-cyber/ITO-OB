import { PriorityBadge } from "@/components/ui/PriorityBadge";
import type { InformeData } from "@/lib/inspections/get-informe-data";
import styles from "./InformeSummary.module.css";

type InformeSummaryProps = {
  summary: InformeData["summary"];
};

export function InformeSummary({ summary }: InformeSummaryProps) {
  return (
    <div className={styles.section}>
      <div className={styles.title}>Resumen general</div>
      <div className={styles.grid}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.totalRooms}</div>
          <div className={styles.statLabel}>Recintos</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.totalElements}</div>
          <div className={styles.statLabel}>Elementos</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.totalObservations}</div>
          <div className={styles.statLabel}>Observaciones</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.totalPhotos}</div>
          <div className={styles.statLabel}>Fotos</div>
        </div>
      </div>
      {summary.totalObservations > 0 && (
        <div className={styles.priorityRow}>
          {summary.byPriority.ALTA > 0 && (
            <span className={styles.priorityItem}>
              <PriorityBadge priority="ALTA" /> {summary.byPriority.ALTA}
            </span>
          )}
          {summary.byPriority.MEDIA > 0 && (
            <span className={styles.priorityItem}>
              <PriorityBadge priority="MEDIA" /> {summary.byPriority.MEDIA}
            </span>
          )}
          {summary.byPriority.BAJA > 0 && (
            <span className={styles.priorityItem}>
              <PriorityBadge priority="BAJA" /> {summary.byPriority.BAJA}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
