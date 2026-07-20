"use client";

import { useState } from "react";
import type { ToleranceItem } from "@/lib/library/tolerances-manual";
import { TOLERANCE_MANUAL_SOURCE } from "@/lib/library/tolerances-manual";
import styles from "./TechnicalDetailAccordion.module.css";

type TechnicalDetailAccordionProps = {
  distanceLight?: string;
  items?: ToleranceItem[];
};

export function TechnicalDetailAccordion({ distanceLight, items }: TechnicalDetailAccordionProps) {
  const [open, setOpen] = useState(false);

  if (!items || items.length === 0) {
    return null;
  }

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

      {open && (
        <div className={styles.content}>
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
