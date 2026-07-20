"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PhotoLightbox.module.css";

type Photo = { id: string; url: string };

type PhotoLightboxProps = {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
};

export function PhotoLightbox({ photos, initialIndex, onClose }: PhotoLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const hasMultiple = photos.length > 1;
  const touchStartX = useRef(0);

  function goPrev() {
    setIndex((current) => (current - 1 + photos.length) % photos.length);
  }

  function goNext() {
    setIndex((current) => (current + 1) % photos.length);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext();
      else goPrev();
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
        ✕
      </button>

      {hasMultiple && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnLeft}`}
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          aria-label="Foto anterior"
        >
          ‹
        </button>
      )}

      <div
        className={styles.imageWrap}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[index].url} alt="" className={styles.image} />
      </div>

      {hasMultiple && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnRight}`}
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          aria-label="Foto siguiente"
        >
          ›
        </button>
      )}

      {hasMultiple && (
        <div className={styles.counter}>
          {index + 1} / {photos.length}
        </div>
      )}
    </div>
  );
}
