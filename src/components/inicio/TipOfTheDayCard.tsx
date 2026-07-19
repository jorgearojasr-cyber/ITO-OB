"use client";

import { useState } from "react";
import styles from "./TipOfTheDayCard.module.css";

const tips = [
  "En ventanas, revisa que la silicona esté continua y sin espacios. Esto evita filtraciones de agua.",
  "En pisos flotantes, camina sobre toda la superficie: si escuchas crujidos, puede indicar una mala instalación.",
  "En enchufes e interruptores, prueba cada uno con un artefacto real antes de dar por aprobada la instalación eléctrica.",
];

export function TipOfTheDayCard() {
  const [tipIndex, setTipIndex] = useState(0);

  return (
    <div className={styles.card}>
      <div className={styles.dots}>
        {tips.map((_, index) => (
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
            stroke="#2E9E68"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 16H12M8.5 17.8H11.5" stroke="#2E9E68" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>Consejo del día</div>
        <p>{tips[tipIndex]}</p>
      </div>
    </div>
  );
}
