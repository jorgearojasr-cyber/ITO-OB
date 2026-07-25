import type { ObservationLifecycleStatus } from "@prisma/client";
import styles from "./LifecycleBadge.module.css";

const LABELS: Record<ObservationLifecycleStatus, string> = {
  PENDIENTE: "Pendiente",
  EN_REPARACION: "En reparación",
  RESUELTO: "Resuelto",
  VERIFICADO: "Verificado",
};

const CLASSES: Record<ObservationLifecycleStatus, string> = {
  PENDIENTE: styles.pendiente,
  EN_REPARACION: styles.enReparacion,
  RESUELTO: styles.resuelto,
  VERIFICADO: styles.verificado,
};

type LifecycleBadgeProps = {
  lifecycleStatus: ObservationLifecycleStatus | null;
};

// Una observación recién creada (null o PENDIENTE) no muestra nada — se
// ve igual que hoy. El badge solo aparece cuando hay progreso real de
// postventa, para no meter ruido visual en la lista de Resumen.
export function LifecycleBadge({ lifecycleStatus }: LifecycleBadgeProps) {
  if (!lifecycleStatus || lifecycleStatus === "PENDIENTE") return null;

  return (
    <span className={`${styles.badge} ${CLASSES[lifecycleStatus]}`}>
      <span className={styles.dot} />
      {LABELS[lifecycleStatus]}
    </span>
  );
}
