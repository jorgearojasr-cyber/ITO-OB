import type { InformeData } from "@/lib/inspections/get-informe-data";
import styles from "./InformeCover.module.css";

type InformeCoverProps = {
  inspection: InformeData["inspection"];
  percent: number;
  isClosed: boolean;
  generatedAt?: Date;
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

// Hallazgo 1 (Auditoría UX): un informe podía mostrar un % de avance
// bajo sin ninguna advertencia de que la inspección se cerró sin
// revisar todo. Este aviso vive dentro de la propia portada -- se
// imprime igual en el PDF (InformeCover es lo que Puppeteer captura),
// no solo en la vista previa en pantalla.
type InformeStatus = "en-curso" | "finalizada" | "cerrada-con-pendientes";

function resolveInformeStatus(isClosed: boolean, percent: number): InformeStatus {
  if (!isClosed) return "en-curso";
  return percent === 100 ? "finalizada" : "cerrada-con-pendientes";
}

const STATUS_BANNER: Record<InformeStatus, { label: string; detail: string; tone: "neutral" | "success" | "warning" }> = {
  "en-curso": {
    label: "Vista previa — inspección todavía en curso",
    detail: "Este informe se generó antes de cerrar la inspección y puede seguir cambiando.",
    tone: "neutral",
  },
  finalizada: {
    label: "Inspección finalizada — 100% de los elementos revisados",
    detail: "Se revisó la vivienda completa antes de firmar este informe.",
    tone: "success",
  },
  "cerrada-con-pendientes": {
    label: "Cerrada anticipadamente, con elementos sin revisar",
    detail: "Este informe se firmó sin completar el recorrido. Revisa el detalle por recinto antes de dar la recepción por completa.",
    tone: "warning",
  },
};

export function InformeCover({ inspection, percent, isClosed, generatedAt = new Date() }: InformeCoverProps) {
  const status = resolveInformeStatus(isClosed, percent);
  const banner = STATUS_BANNER[status];

  return (
    <div className={`${styles.cover} informe-cover`}>
      <div className={`${styles.statusBanner} ${styles[`statusBanner_${banner.tone}`]}`}>
        <div className={styles.statusBannerLabel}>{banner.label}</div>
        <div className={styles.statusBannerDetail}>{banner.detail}</div>
      </div>
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

      <div className={styles.generatedAt}>Generado el {dateFormatter.format(generatedAt)}</div>
    </div>
  );
}
