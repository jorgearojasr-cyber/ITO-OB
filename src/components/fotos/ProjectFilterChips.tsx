import Link from "next/link";
import type { InspectionOption } from "@/lib/inspections/get-inspection-options";
import styles from "./ProjectFilterChips.module.css";

type ProjectFilterChipsProps = {
  options: InspectionOption[];
  selectedInspectionId?: string;
};

export function ProjectFilterChips({ options, selectedInspectionId }: ProjectFilterChipsProps) {
  if (options.length <= 1) {
    return null;
  }

  return (
    <div className={styles.scroll}>
      <Link
        href="/fotos"
        className={!selectedInspectionId ? `${styles.chip} ${styles.chipActive}` : styles.chip}
      >
        Todos los proyectos
      </Link>
      {options.map((option) => (
        <Link
          key={option.id}
          href={`/fotos?inspeccion=${option.id}`}
          className={selectedInspectionId === option.id ? `${styles.chip} ${styles.chipActive}` : styles.chip}
        >
          {option.projectName} — {option.unitLabel}
        </Link>
      ))}
    </div>
  );
}
