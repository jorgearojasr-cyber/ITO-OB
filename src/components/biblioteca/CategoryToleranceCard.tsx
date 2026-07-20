import type { ToleranceItem } from "@/lib/library/tolerances-manual";
import styles from "./CategoryToleranceCard.module.css";

type ChecklistItem = ToleranceItem & { shortLabel: string };

type CategoryToleranceCardProps = {
  imageUrl: string;
  distanceLightSummary?: string;
  checklistItems?: ChecklistItem[];
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 10.5L8 14L15.5 6" stroke="#3FC98A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="#DD7A36" strokeWidth="1.6" />
      <path d="M10 9V14" stroke="#DD7A36" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.9" fill="#DD7A36" />
    </svg>
  );
}

export function CategoryToleranceCard({ imageUrl, distanceLightSummary, checklistItems }: CategoryToleranceCardProps) {
  return (
    <div className={styles.wrap}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" className={styles.photo} />

      {checklistItems && checklistItems.length > 0 && (
        <div className={styles.body}>
          <div className={styles.checklist}>
            {checklistItems.map((item) => (
              <div key={item.parameter} className={styles.checklistRow}>
                <span className={styles.checklistIcon}>
                  <CheckIcon />
                </span>
                <span>{item.shortLabel}</span>
              </div>
            ))}
            {distanceLightSummary && (
              <div className={styles.checklistRow}>
                <span className={styles.checklistIcon}>
                  <InfoIcon />
                </span>
                <span>{distanceLightSummary}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
