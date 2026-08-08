"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./InspectionPointImageViewer.module.css";

type ViewerTab = "bien" | "mal";

type InspectionPointImageViewerProps = {
  pointName: string;
  bienUrl: string | null;
  malUrl: string | null;
  initialTab: ViewerTab;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

function distanceBetween(touches: React.TouchList | TouchList) {
  const [a, b] = [touches[0], touches[1]];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export function InspectionPointImageViewer({
  pointName,
  bienUrl,
  malUrl,
  initialTab,
  onClose,
}: InspectionPointImageViewerProps) {
  const hasBoth = Boolean(bienUrl) && Boolean(malUrl);
  const [tab, setTab] = useState<ViewerTab>(initialTab);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const pinchStartDistance = useRef(0);
  const pinchStartScale = useRef(1);
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });
  const swipeStartX = useRef(0);
  const lastTapAt = useRef(0);
  const isPanning = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const currentUrl = tab === "bien" ? bienUrl : malUrl;

  function resetZoom() {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }

  function switchTab(next: ViewerTab) {
    if (next === tab) return;
    setTab(next);
    resetZoom();
  }

  function toggleDoubleTapZoom() {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(DOUBLE_TAP_SCALE);
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && hasBoth) switchTab("mal");
      if (event.key === "ArrowLeft" && hasBoth) switchTab("bien");
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, hasBoth, tab]);

  // React registra los listeners onWheel/onTouchMove como pasivos por
  // defecto -- event.preventDefault() ahí adentro falla en silencio
  // ("Unable to preventDefault inside passive event listener
  // invocation"), así que la rueda del mouse necesita un listener
  // nativo no pasivo para poder bloquear el scroll de la página
  // mientras se hace zoom. El gesto táctil no necesita preventDefault
  // -- touch-action: none en el CSS ya bloquea el scroll/pinch nativo.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    function handleWheelNative(event: WheelEvent) {
      event.preventDefault();
      setScale((current) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, current - event.deltaY * 0.01));
        if (next === MIN_SCALE) setTranslate({ x: 0, y: 0 });
        return next;
      });
    }

    wrap.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => wrap.removeEventListener("wheel", handleWheelNative);
  }, []);

  function handleTouchStart(event: React.TouchEvent) {
    if (event.touches.length === 2) {
      pinchStartDistance.current = distanceBetween(event.touches);
      pinchStartScale.current = scale;
      isPanning.current = false;
      return;
    }

    if (scale > 1) {
      isPanning.current = true;
      panStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      translateStart.current = translate;
    } else {
      swipeStartX.current = event.touches[0].clientX;
    }
  }

  function handleTouchMove(event: React.TouchEvent) {
    if (event.touches.length === 2) {
      const distance = distanceBetween(event.touches);
      const ratio = distance / (pinchStartDistance.current || distance);
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchStartScale.current * ratio));
      setScale(next);
      return;
    }

    if (isPanning.current) {
      const dx = event.touches[0].clientX - panStart.current.x;
      const dy = event.touches[0].clientY - panStart.current.y;
      setTranslate({ x: translateStart.current.x + dx, y: translateStart.current.y + dy });
    }
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (scale <= 1 && !isPanning.current) {
      const delta = event.changedTouches[0].clientX - swipeStartX.current;
      if (hasBoth && Math.abs(delta) > 50) {
        if (delta < 0) switchTab("mal");
        else switchTab("bien");
      } else {
        // Toque corto sin swipe -- puede ser un doble tap para zoom.
        const now = Date.now();
        if (now - lastTapAt.current < 280) {
          toggleDoubleTapZoom();
        }
        lastTapAt.current = now;
      }
    }
    if (scale === 1) {
      setTranslate({ x: 0, y: 0 });
    }
    isPanning.current = false;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
        ✕
      </button>

      <div className={styles.header} onClick={(event) => event.stopPropagation()}>
        <span className={styles.pointName}>{pointName}</span>
        <span className={`${styles.tag} ${tab === "bien" ? styles.tagBien : styles.tagMal}`}>
          {tab === "bien" ? "BIEN" : "MAL"}
        </span>
      </div>

      {hasBoth && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnLeft} ${tab === "bien" ? styles.navBtnDisabled : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            switchTab("bien");
          }}
          aria-label="Ver imagen Bien"
          disabled={tab === "bien"}
        >
          ‹
        </button>
      )}

      <div
        ref={wrapRef}
        className={styles.imageWrap}
        onClick={(event) => event.stopPropagation()}
        onDoubleClick={toggleDoubleTapZoom}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={currentUrl}
            alt={`${pointName} — ${tab === "bien" ? "ejemplo correcto" : "ejemplo incorrecto"}`}
            className={styles.image}
            style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})` }}
            draggable={false}
          />
        ) : (
          <div className={styles.emptyState}>
            <span aria-hidden="true">🖼</span>
            Disponible próximamente
          </div>
        )}
      </div>

      {hasBoth && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnRight} ${tab === "mal" ? styles.navBtnDisabled : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            switchTab("mal");
          }}
          aria-label="Ver imagen Mal"
          disabled={tab === "mal"}
        >
          ›
        </button>
      )}

      {hasBoth && (
        <div className={styles.dots} onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            className={`${styles.dot} ${tab === "bien" ? styles.dotActive : ""}`}
            onClick={() => switchTab("bien")}
            aria-label="Ver imagen Bien"
          />
          <button
            type="button"
            className={`${styles.dot} ${tab === "mal" ? styles.dotActive : ""}`}
            onClick={() => switchTab("mal")}
            aria-label="Ver imagen Mal"
          />
        </div>
      )}
    </div>
  );
}
