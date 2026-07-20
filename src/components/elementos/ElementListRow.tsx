import Link from "next/link";
import type { ElementListItem } from "@/lib/inspections/get-elements-list-data";
import styles from "./ElementListRow.module.css";

type ElementListRowProps = {
  inspectionId: string;
  element: ElementListItem;
};

const STATUS_LABEL: Record<ElementListItem["status"], string> = {
  PENDING: "Pendiente",
  CORRECT: "Revisado",
  OBSERVED: "Revisado",
};

export function ElementListRow({ inspectionId, element }: ElementListRowProps) {
  const isPending = element.status === "PENDING";

  return (
    <Link href={`/inspecciones/${inspectionId}/elementos/${element.id}`} className={styles.row}>
      <div className={styles.body}>
        <div className={styles.breadcrumb}>{element.roomName}</div>
        <div className={styles.name}>{element.name}</div>
      </div>
      <span className={isPending ? `${styles.badge} ${styles.badgePending}` : `${styles.badge} ${styles.badgeDone}`}>
        {STATUS_LABEL[element.status]}
      </span>
      <span className={styles.chevron}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.5L13 10L7.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
