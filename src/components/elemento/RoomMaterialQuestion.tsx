import type { MaterialSlot } from "@prisma/client";
import { setRoomMaterial } from "@/lib/inspections/actions";
import styles from "./RoomMaterialQuestion.module.css";

type RoomMaterialQuestionProps = {
  inspectionId: string;
  roomInstanceId: string;
  elementInstanceId: string;
  slot: MaterialSlot;
  options: { value: string; label: string }[];
};

// Título por slot -- tabla de configuración en vez de un if/else
// hardcodeado a 2 casos, para que agregar un cuarto slot algún día no
// vuelva a requerir tocar este componente (Sprint UX-03, Etapa B).
const SLOT_TITLES: Record<MaterialSlot, string> = {
  FLOOR: "¿Qué tipo de piso tiene este recinto?",
  WALL: "¿Qué tipo de revestimiento tiene este muro?",
  FACADE: "¿Qué tipo de terminación tiene la fachada?",
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
      <div className={styles.title}>{SLOT_TITLES[slot]}</div>
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
