import styles from "./StatusChip.module.css";

type Status = "PENDING" | "CORRECT" | "OBSERVED";

const LABELS: Record<Status, string> = {
  PENDING: "Pendiente",
  CORRECT: "Correcto",
  OBSERVED: "Con observación",
};

const CLASSES: Record<Status, string> = {
  PENDING: styles.pending,
  CORRECT: styles.correct,
  OBSERVED: styles.observed,
};

export function StatusChip({ status }: { status: Status }) {
  return (
    <span className={`${styles.chip} ${CLASSES[status]}`}>
      <span className={styles.dot} />
      {LABELS[status]}
    </span>
  );
}
