"use client";

import { useState } from "react";
import styles from "./ShareReportButton.module.css";

type ShareReportButtonProps = {
  url: string;
  title: string;
  text: string;
};

export function ShareReportButton({ url, title, text }: ShareReportButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const absoluteUrl = window.location.origin + url;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: absoluteUrl });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          // El usuario canceló o el sistema rechazó el share; no hay
          // nada más que hacer, el resto de la pantalla sigue intacta.
        }
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles (ej. documento sin foco); el usuario
      // puede copiar la URL desde la barra de direcciones como respaldo.
    }
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.btn} onClick={handleShare} aria-label="Compartir informe">
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
          <circle cx="15" cy="5" r="2.2" stroke="#101828" strokeWidth="1.6" />
          <circle cx="5" cy="10" r="2.2" stroke="#101828" strokeWidth="1.6" />
          <circle cx="15" cy="15" r="2.2" stroke="#101828" strokeWidth="1.6" />
          <path d="M6.9 8.8L13.1 6.2M6.9 11.2L13.1 13.8" stroke="#101828" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      {copied && <div className={styles.tooltip}>¡Enlace copiado!</div>}
    </div>
  );
}
