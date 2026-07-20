import type { ToleranceItem } from "@/lib/library/tolerances-manual";
import { TOLERANCE_MANUAL_SOURCE } from "@/lib/library/tolerances-manual";
import styles from "./CategoryToleranceCard.module.css";

type CategoryToleranceCardProps = {
  imageUrl: string;
  distanceLight?: string;
  items?: ToleranceItem[];
};

export function CategoryToleranceCard({ imageUrl, distanceLight, items }: CategoryToleranceCardProps) {
  return (
    <div className={styles.wrap}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" className={styles.photo} />

      {items && items.length > 0 && (
        <div className={styles.body}>
          {distanceLight && (
            <div className={styles.distanceBox}>
              <div className={styles.distanceLabel}>Cómo revisarlo</div>
              <p>{distanceLight}</p>
            </div>
          )}

          <div className={styles.itemsLabel}>Tolerancias del Manual CDT</div>
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.parameter} className={styles.item}>
                <div className={styles.itemParameter}>{item.parameter}</div>
                <div className={styles.itemTolerance}>{item.tolerance}</div>
                <div className={styles.itemVerification}>{item.verification}</div>
              </div>
            ))}
          </div>
          <div className={styles.source}>Fuente: {TOLERANCE_MANUAL_SOURCE}</div>
        </div>
      )}
    </div>
  );
}
