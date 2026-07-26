import styles from "./NormativeScopeNotice.module.css";

type NormativeScopeNoticeProps = {
  /** "card": reemplaza el bloque de ficha técnica en el checklist en vivo.
   *  "line": línea compacta bajo el nombre del elemento en el informe/PDF. */
  variant?: "card" | "line";
};

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 3L18 16.5H2L10 3Z"
        stroke="#8a5a0f"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 8V11.5" stroke="#8a5a0f" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.9" fill="#8a5a0f" />
    </svg>
  );
}

// Amber, no rojo: es una limitación de alcance del checklist (revisión
// general, sin ficha del Manual de Tolerancias CDT), no un error de la
// app ni una falla detectada en la vivienda.
export function NormativeScopeNotice({ variant = "card" }: NormativeScopeNoticeProps) {
  if (variant === "line") {
    return (
      <div className={styles.line}>
        <WarningIcon />
        <span>Sin respaldo normativo verificado — revisión general</span>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <WarningIcon />
        <span>Sin respaldo normativo verificado</span>
      </div>
      <div className={styles.cardBody}>
        Revisión general — no reemplaza una certificación profesional habilitada.
      </div>
    </div>
  );
}
