"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "./ElementDetailAccordion.module.css";

type ElementDetailAccordionProps = {
  body: string;
};

const NOTEBOOK_BREAKPOINT_QUERY = "(min-width: 1024px)";

function subscribeToNotebookBreakpoint(onChange: () => void) {
  const mql = window.matchMedia(NOTEBOOK_BREAKPOINT_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function isNotebookBreakpoint() {
  return window.matchMedia(NOTEBOOK_BREAKPOINT_QUERY).matches;
}

export function ElementDetailAccordion({ body }: ElementDetailAccordionProps) {
  const [manuallyToggled, setManuallyToggled] = useState<boolean | null>(null);

  // D1 §05 "Cómo escala": en notebook/desktop el detalle técnico puede
  // mostrarse ya expandido en vez de plegado -- es el único cambio que
  // el ancho autoriza acá. useSyncExternalStore evita el desfase de
  // hidratación (el servidor siempre "cierra") y reacciona si la
  // ventana cruza el breakpoint sin recargar la página.
  const isNotebookOrWider = useSyncExternalStore(subscribeToNotebookBreakpoint, isNotebookBreakpoint, () => false);
  const open = manuallyToggled ?? isNotebookOrWider;

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setManuallyToggled(!open)}
        aria-expanded={open}
      >
        Ver detalle técnico completo
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && <p className={styles.body}>{body}</p>}
    </div>
  );
}
