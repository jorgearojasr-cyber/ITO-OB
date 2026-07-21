import { setRoomMaterial } from "@/lib/inspections/actions";
import styles from "./RoomMaterialQuestion.module.css";

type RoomMaterialQuestionProps = {
  inspectionId: string;
  roomInstanceId: string;
  elementInstanceId: string;
  slot: "FLOOR" | "WALL";
  options: { value: string; label: string }[];
};

export function RoomMaterialQuestion({
  inspectionId,
  roomInstanceId,
  elementInstanceId,
  slot,
  options,
}: RoomMaterialQuestionProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        {slot === "FLOOR" ? "¿Qué tipo de piso tiene este recinto?" : "¿Qué tipo de revestimiento tiene este muro?"}
      </div>
      <div className={styles.subtitle}>Se pregunta una sola vez por recinto.</div>
      <div className={styles.grid}>
        {options.map((option) => (
          <form
            key={option.value}
            action={setRoomMaterial.bind(null, {
              inspectionId,
              roomInstanceId,
              elementInstanceId,
              slot,
              material: option.value,
            })}
          >
            <button type="submit" className={styles.option}>
              {option.label}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
