import {
  INSPECTION_POINT_STATUS_LABEL,
  type InspectionPoint,
} from "@/lib/library/inspection-point";
import styles from "./InspectionPointCard.module.css";

type InspectionPointCardProps = {
  point: InspectionPoint;
};

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 10.5L8 14L15.5 6" stroke="#3FC98A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M5.5 5.5L14.5 14.5M14.5 5.5L5.5 14.5" stroke="#DC4545" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M6.5 4.5L15.5 10L6.5 15.5V4.5Z" fill="#8E6EF0" />
    </svg>
  );
}

function ImagePlaceholder({ tone }: { tone: "bien" | "mal" }) {
  return (
    <div className={`${styles.imageSlot} ${tone === "bien" ? styles.imageSlotBien : styles.imageSlotMal}`}>
      <span className={styles.placeholderGlyph}>🖼</span>
      <span className={styles.placeholderText}>Disponible próximamente</span>
    </div>
  );
}

export function InspectionPointCard({ point }: InspectionPointCardProps) {
  const hasObservations = (point.observations?.length ?? 0) > 0;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.name}>{point.name}</h3>
        <span className={`${styles.statusPill} ${styles[`status_${point.status.replace("-", "_")}`]}`}>
          {INSPECTION_POINT_STATUS_LABEL[point.status]}
        </span>
      </header>

      {point.description && <p className={styles.description}>{point.description}</p>}

      {point.needsImages !== false && (
        <div className={styles.compareGrid}>
          <div className={styles.compareColumn}>
            <div className={styles.compareLabel}>
              <CheckIcon />
              Cómo debe verse
            </div>
            {point.bienImageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={point.bienImageUrl} alt={`${point.name} — ejemplo correcto`} className={styles.image} />
            ) : (
              <ImagePlaceholder tone="bien" />
            )}
          </div>
          <div className={styles.compareColumn}>
            <div className={styles.compareLabel}>
              <CrossIcon />
              Cómo NO debe verse
            </div>
            {point.malImageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={point.malImageUrl} alt={`${point.name} — ejemplo incorrecto`} className={styles.image} />
            ) : (
              <ImagePlaceholder tone="mal" />
            )}
          </div>
        </div>
      )}

      {hasObservations && (
        <ul className={styles.observations}>
          {point.observations!.map((observation) => (
            <li key={observation}>{observation}</li>
          ))}
        </ul>
      )}

      {point.requiresVideo &&
        (point.videoUrl ? (
          <a href={point.videoUrl} target="_blank" rel="noreferrer" className={styles.videoRow}>
            <span className={styles.videoIcon}>
              <PlayIcon />
            </span>
            Ver video demostrativo
          </a>
        ) : (
          <div className={`${styles.videoRow} ${styles.videoRowPending}`}>
            <span className={styles.videoIcon}>
              <PlayIcon />
            </span>
            Video demostrativo — disponible próximamente
          </div>
        ))}
    </article>
  );
}
