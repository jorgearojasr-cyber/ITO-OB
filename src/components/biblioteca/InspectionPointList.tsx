import type { InspectionPoint } from "@/lib/library/inspection-point";
import { InspectionPointCard } from "./InspectionPointCard";
import styles from "./InspectionPointList.module.css";

type InspectionPointListProps = {
  title?: string;
  points: InspectionPoint[];
};

export function InspectionPointList({ title, points }: InspectionPointListProps) {
  if (points.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.list}>
        {points.map((point) => (
          <InspectionPointCard key={point.id} point={point} />
        ))}
      </div>
    </section>
  );
}
