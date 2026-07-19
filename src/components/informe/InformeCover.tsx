import type { InformeData } from "@/lib/inspections/get-informe-data";
import styles from "./InformeCover.module.css";

type InformeCoverProps = {
  inspection: InformeData["inspection"];
  percent: number;
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const PROPERTY_TYPE_LABELS: Record<InformeData["inspection"]["propertyType"], string> = {
  CASA: "Casa",
  DEPARTAMENTO: "Departamento",
};

export function InformeCover({ inspection, percent }: InformeCoverProps) {
  return (
    <div className={`${styles.cover} informe-cover`}>
      <div className={styles.eyebrow}>INFORME DE RECEPCIÓN — OBRABIEN</div>
      <div className={styles.title}>
        {inspection.projectName} — {inspection.unitLabel}
      </div>
      <div className={styles.address}>{inspection.address}</div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <div className={styles.label}>Propietario</div>
          <div className={styles.value}>{inspection.createdByName}</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.label}>Tipo de vivienda</div>
          <div className={styles.value}>{PROPERTY_TYPE_LABELS[inspection.propertyType]}</div>
        </div>
        {inspection.developerName && (
          <div className={styles.metaItem}>
            <div className={styles.label}>Inmobiliaria</div>
            <div className={styles.value}>{inspection.developerName}</div>
          </div>
        )}
        {inspection.builderName && (
          <div className={styles.metaItem}>
            <div className={styles.label}>Constructora</div>
            <div className={styles.value}>{inspection.builderName}</div>
          </div>
        )}
        {inspection.receptionDate && (
          <div className={styles.metaItem}>
            <div className={styles.label}>Fecha de recepción</div>
            <div className={styles.value}>{dateFormatter.format(inspection.receptionDate)}</div>
          </div>
        )}
        <div className={styles.metaItem}>
          <div className={styles.label}>Organización</div>
          <div className={styles.value}>{inspection.organizationName}</div>
        </div>
      </div>

      <div className={styles.percentRow}>
        <div className={styles.percentValue}>{percent}%</div>
        <div className={styles.percentLabel}>
          de avance general al momento
          <br />
          de generar este informe
        </div>
      </div>

      <div className={styles.generatedAt}>Generado el {dateFormatter.format(new Date())}</div>
    </div>
  );
}
