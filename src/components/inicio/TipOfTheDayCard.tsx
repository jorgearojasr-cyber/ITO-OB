"use client";

import { useState } from "react";
import { toleranceTips } from "@/lib/library/tolerance-tips";
import styles from "./TipOfTheDayCard.module.css";

export function TipOfTheDayCard() {
  const [tipIndex, setTipIndex] = useState(() => new Date().getDate() % toleranceTips.length);
  const tip = toleranceTips[tipIndex];

  return (
    <div className={styles.card}>
      <div className={styles.dots}>
        {toleranceTips.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ver consejo ${index + 1}`}
            className={index === tipIndex ? `${styles.dot} ${styles.dotOn}` : styles.dot}
            onClick={() => setTipIndex(index)}
          />
        ))}
      </div>
      <div className={styles.icon}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2.5C7 2.5 5 4.7 5 7.3C5 9.1 5.9 10.2 6.7 11.1C7.3 11.8 7.6 12.2 7.6 13H12.4C12.4 12.2 12.7 11.8 13.3 11.1C14.1 10.2 15 9.1 15 7.3C15 4.7 13 2.5 10 2.5Z"
            stroke="#DD7A36"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 16H12M8.5 17.8H11.5" stroke="#DD7A36" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>Consejo del día — {tip.categoryLabel}</div>
        <p>{tip.text}</p>
        <div className={styles.source}>Fuente: {tip.source}</div>
      </div>
    </div>
  );
}
