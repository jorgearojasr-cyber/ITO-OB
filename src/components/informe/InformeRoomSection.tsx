import { InformeElementRow } from "./InformeElementRow";
import type { InformeRoom } from "@/lib/inspections/get-informe-data";
import styles from "./InformeRoomSection.module.css";

type InformeRoomSectionProps = {
  room: InformeRoom;
};

export function InformeRoomSection({ room }: InformeRoomSectionProps) {
  return (
    <div className={`${styles.section} informe-room`}>
      <div className={styles.title}>{room.name}</div>
      {room.elements.map((element) => (
        <InformeElementRow key={element.id} element={element} />
      ))}
    </div>
  );
}
