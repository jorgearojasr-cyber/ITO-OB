import Link from "next/link";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import type { ObservationSummaryItem } from "@/lib/inspections/get-observations-summary-data";
import styles from "./ObservationSummaryRow.module.css";

type ObservationSummaryRowProps = {
  inspectionId: string;
  observation: ObservationSummaryItem;
};

export function ObservationSummaryRow({ inspectionId, observation }: ObservationSummaryRowProps) {
  return (
    <Link
      href={`/inspecciones/${inspectionId}/elementos/${observation.elementInstanceId}`}
      className={styles.row}
    >
      {observation.thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={observation.thumbnailUrl}
          alt={`Foto de ${observation.elementName} — ${observation.roomName}`}
          className={styles.thumbnail}
        />
      )}
      <div className={styles.body}>
        <div className={styles.breadcrumb}>
          {observation.roomName} › {observation.elementName}
        </div>
        <div className={styles.comment}>{observation.comment ?? "Sin comentario."}</div>
        {observation.priority && <PriorityBadge priority={observation.priority} />}
      </div>
      <span className={styles.chevron}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.5L13 10L7.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
