import Link from "next/link";
import type { InspectionPhotoItem } from "@/lib/inspections/get-inspection-photos-data";
import styles from "./PhotoGridItem.module.css";

type PhotoGridItemProps = {
  inspectionId: string;
  photo: InspectionPhotoItem;
};

export function PhotoGridItem({ inspectionId, photo }: PhotoGridItemProps) {
  return (
    <Link href={`/inspecciones/${inspectionId}/elementos/${photo.elementInstanceId}`} className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.url} alt="" className={styles.thumb} />
      <div className={styles.caption}>
        <div className={styles.room}>{photo.roomName}</div>
        <div className={styles.element}>{photo.elementName}</div>
      </div>
    </Link>
  );
}
