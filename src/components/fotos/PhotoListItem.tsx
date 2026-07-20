"use client";

import { useState } from "react";
import Link from "next/link";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import type { InspectionPhotoItem } from "@/lib/inspections/get-inspection-photos-data";
import styles from "./PhotoListItem.module.css";

type PhotoListItemProps = {
  photo: InspectionPhotoItem;
  showProject?: boolean;
};

export function PhotoListItem({ photo, showProject }: PhotoListItemProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.thumbBtn}
        onClick={() => setLightboxOpen(true)}
        aria-label="Ver foto en tamaño completo"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.url} alt="" className={styles.thumb} />
      </button>

      <div className={styles.body}>
        <div className={styles.room}>
          {showProject ? `${photo.projectName} — ${photo.roomName}` : photo.roomName}
        </div>
        <div className={styles.comment}>{photo.comment ?? "Sin comentario."}</div>
        {photo.priority && (
          <div className={styles.badgeRow}>
            <PriorityBadge priority={photo.priority} />
          </div>
        )}
        <Link
          href={`/inspecciones/${photo.inspectionId}/recintos/${photo.roomInstanceId}`}
          className={styles.roomLink}
        >
          Ver en {photo.roomName} →
        </Link>
      </div>

      {lightboxOpen && (
        <PhotoLightbox photos={[{ id: photo.id, url: photo.url }]} initialIndex={0} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
