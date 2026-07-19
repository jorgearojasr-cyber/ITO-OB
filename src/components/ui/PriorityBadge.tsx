import type { Priority } from "@prisma/client";
import styles from "./PriorityBadge.module.css";

const LABELS: Record<Priority, string> = {
  ALTA: "Alta",
  MEDIA: "Media",
  BAJA: "Baja",
};

const CLASSES: Record<Priority, string> = {
  ALTA: styles.alta,
  MEDIA: styles.media,
  BAJA: styles.baja,
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`${styles.badge} ${CLASSES[priority]}`}>
      <span className={styles.dot} />
      {LABELS[priority]}
    </span>
  );
}
