"use client";

import { useState } from "react";
import styles from "./ElementDetailAccordion.module.css";

type ElementDetailAccordionProps = {
  body: string;
};

export function ElementDetailAccordion({ body }: ElementDetailAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((current) => !current)}
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
