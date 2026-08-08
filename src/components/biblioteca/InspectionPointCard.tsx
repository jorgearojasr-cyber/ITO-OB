"use client";

import { useState } from "react";
import {
  INSPECTION_POINT_STATUS_LABEL,
  type InspectionPoint,
} from "@/lib/library/inspection-point";
import { InspectionPointImageViewer } from "./InspectionPointImageViewer";
import styles from "./InspectionPointCard.module.css";

type InspectionPointCardProps = {
  point: InspectionPoint;
};

type ViewerTab = "bien" | "mal";

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 10.5L8 14L15.5 6" stroke="#3FC98A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M5.5 5.5L14.5 14.5M14.5 5.5L5.5 14.5" stroke="#DC4545" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M6.5 4.5L15.5 10L6.5 15.5V4.5Z" fill="#8E6EF0" />
    </svg>
  );
}

// Ícono de lupa/expandir -- señal visual explícita de que la imagen real
// es interactiva (abre el visor de pantalla completa), no una fotografía
// estática más. Sin esto, nada en la tarjeta sugiere que se puede tocar.
function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="#fff" strokeWidth="1.8" />
      <path d="M16 16L12.5 12.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Ícono de imagen (reemplaza el emoji 🖼, que se ve distinto en cada
// sistema operativo) -- mismo trazo en todas las plataformas, tono
// coloreado según Bien/Mal para que el placeholder ya anticipe el color
// que va a tener la imagen real cuando se cargue.
function PlaceholderIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 16.5L8.5 12.5L12 15.5L15.5 11.5L20 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Mismo placeholder en toda la Biblioteca Visual, exista o no la imagen
// real -- así ninguna ficha se ve "a medio construir" mientras se carga
// la producción masiva de fotografías.
function ImagePlaceholder({ tone }: { tone: "bien" | "mal" }) {
  return (
    <div className={`${styles.imageSlot} ${tone === "bien" ? styles.imageSlotBien : styles.imageSlotMal}`}>
      <PlaceholderIcon />
      <span className={styles.placeholderText}>Disponible próximamente</span>
    </div>
  );
}

export function InspectionPointCard({ point }: InspectionPointCardProps) {
  const [viewerTab, setViewerTab] = useState<ViewerTab | null>(null);
  const hasObservations = (point.observations?.length ?? 0) > 0;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.name}>{point.name}</h3>
        <span className={`${styles.statusPill} ${styles[`status_${point.status.replace("-", "_")}`]}`}>
          {INSPECTION_POINT_STATUS_LABEL[point.status]}
        </span>
      </header>

      {point.description && <p className={styles.description}>{point.description}</p>}

      {point.needsImages !== false && (
        <div className={styles.compareGrid}>
          <div className={styles.compareColumn}>
            <div className={styles.compareLabel}>
              <CheckIcon />
              Cómo debe verse
            </div>
            {point.bienImageUrl ? (
              <button type="button" className={styles.imageBtn} onClick={() => setViewerTab("bien")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={point.bienImageUrl}
                  alt={`${point.name} — ejemplo correcto`}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.expandBadge}>
                  <ExpandIcon />
                </span>
              </button>
            ) : (
              <ImagePlaceholder tone="bien" />
            )}
          </div>
          <div className={styles.compareColumn}>
            <div className={styles.compareLabel}>
              <CrossIcon />
              Cómo NO debe verse
            </div>
            {point.malImageUrl ? (
              <button type="button" className={styles.imageBtn} onClick={() => setViewerTab("mal")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={point.malImageUrl}
                  alt={`${point.name} — ejemplo incorrecto`}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.expandBadge}>
                  <ExpandIcon />
                </span>
              </button>
            ) : (
              <ImagePlaceholder tone="mal" />
            )}
          </div>
        </div>
      )}

      {hasObservations && (
        <ul className={styles.observations}>
          {point.observations!.map((observation) => (
            <li key={observation}>{observation}</li>
          ))}
        </ul>
      )}

      {point.requiresVideo &&
        (point.videoUrl ? (
          <a href={point.videoUrl} target="_blank" rel="noreferrer" className={styles.videoRow}>
            <span className={styles.videoIcon}>
              <PlayIcon />
            </span>
            Ver video demostrativo
          </a>
        ) : (
          <div className={`${styles.videoRow} ${styles.videoRowPending}`}>
            <span className={styles.videoIcon}>
              <PlayIcon />
            </span>
            Video demostrativo — disponible próximamente
          </div>
        ))}

      {viewerTab && (
        <InspectionPointImageViewer
          pointName={point.name}
          bienUrl={point.bienImageUrl ?? null}
          malUrl={point.malImageUrl ?? null}
          initialTab={viewerTab}
          onClose={() => setViewerTab(null)}
        />
      )}
    </article>
  );
}
