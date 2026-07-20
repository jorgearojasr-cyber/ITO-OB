import Link from "next/link";
import type { InspectionListItemData } from "@/lib/inspections/get-inspections-list-data";
import styles from "./InspectionListItem.module.css";

type InspectionListItemProps = {
  inspection: InspectionListItemData;
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function InspectionListItem({ inspection }: InspectionListItemProps) {
  const isCompleted = inspection.statusLabel === "COMPLETADA";
  const href =
    !isCompleted && inspection.firstRoomId
      ? `/inspecciones/${inspection.id}/recintos/${inspection.firstRoomId}`
      : `/inspecciones/${inspection.id}/resumen`;

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.title}>
          {inspection.projectName} <span className={styles.unit}>— {inspection.unitLabel}</span>
        </div>
        <span className={`${styles.chip} ${isCompleted ? styles.completed : styles.inProgress}`}>
          <span className={styles.dot} />
          {isCompleted ? "Completada" : "En progreso"}
        </span>
      </div>
      <div className={styles.meta}>{inspection.address}</div>
      {inspection.date && <div className={styles.meta}>{dateFormatter.format(inspection.date)}</div>}
      <div className={styles.progressWrap}>
        <div className={styles.progressLabel}>{inspection.percent}% de avance</div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${inspection.percent}%` }} />
        </div>
      </div>
    </Link>
  );
}
