import { StatusChip } from "@/components/ui/StatusChip";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import type { InformeElement } from "@/lib/inspections/get-informe-data";
import styles from "./InformeElementRow.module.css";

type InformeElementRowProps = {
  element: InformeElement;
};

export function InformeElementRow({ element }: InformeElementRowProps) {
  const flaggedObservations = element.observations.filter((o) => o.status === "OBSERVATION");

  return (
    <div className={`${styles.row} informe-observation`}>
      <div className={styles.header}>
        <span className={styles.name}>{element.name}</span>
        <StatusChip status={element.status} />
      </div>

      {flaggedObservations.length > 0 && (
        <div className={styles.observations}>
          {flaggedObservations.map((observation, index) => (
            <div key={index} className={styles.observation}>
              <div className={styles.question}>{observation.question}</div>
              <div className={styles.comment}>{observation.comment ?? "Sin comentario."}</div>
              {observation.priority && <PriorityBadge priority={observation.priority} />}
              {observation.photos.length > 0 && (
                <div className={styles.thumbnails}>
                  {observation.photos.map((photo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={photo.id} src={photo.url} alt="" className={styles.thumbnail} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
