"use client";

import { useState } from "react";
import Link from "next/link";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { LifecycleBadge } from "@/components/ui/LifecycleBadge";
import { ObservationLifecycleModal } from "./ObservationLifecycleModal";
import type { ObservationSummaryItem } from "@/lib/inspections/get-observations-summary-data";
import styles from "./ObservationSummaryRow.module.css";

type ObservationSummaryRowProps = {
  inspectionId: string;
  observation: ObservationSummaryItem;
};

export function ObservationSummaryRow({ inspectionId, observation }: ObservationSummaryRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.card}>
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
          <div className={styles.badges}>
            {observation.priority && <PriorityBadge priority={observation.priority} />}
            <LifecycleBadge lifecycleStatus={observation.lifecycleStatus} />
          </div>
        </div>
        <span className={styles.chevron}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 4.5L13 10L7.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
      <div className={styles.footer}>
        <button type="button" className={styles.updateBtn} onClick={() => setIsModalOpen(true)}>
          Actualizar estado
        </button>
      </div>
      {isModalOpen && (
        <ObservationLifecycleModal observation={observation} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
