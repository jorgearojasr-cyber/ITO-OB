"use client";

import { useEffect, useState } from "react";
import { RoomListRow } from "./RoomListRow";
import styles from "./RoomSwitcherSheet.module.css";

type RoomSwitcherSheetProps = {
  inspectionId: string;
  currentRoomId: string;
  rooms: {
    id: string;
    name: string;
    done: number;
    total: number;
    percent: number;
  }[];
};

// Atajo para saltar a cualquier recinto sin pasar por la lista completa
// (Sprint UX-02, P1a) -- no reemplaza el algoritmo de "siguiente
// pendiente", es solo una forma más rápida de llegar a un recinto
// puntual, sobre todo en móvil. Reutiliza los mismos datos/fila que ya
// alimentan el índice de escritorio (RoomListRow + getRoomsListData),
// para no duplicar de dónde sale "cuál es el recinto actual".
export function RoomSwitcherSheet({ inspectionId, currentRoomId, rooms }: RoomSwitcherSheetProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (rooms.length === 0) {
    return null;
  }

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => setOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M4 6h12M4 10h12M4 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Cambiar recinto
      </button>

      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}>
          <div
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Cambiar recinto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.sheetHeader}>
              <span className={styles.sheetTitle}>Todos los recintos</span>
              <button type="button" className={styles.closeBtn} aria-label="Cerrar" onClick={() => setOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className={styles.sheetList}>
              {rooms.map((room) => (
                <RoomListRow
                  key={room.id}
                  name={room.name}
                  done={room.done}
                  total={room.total}
                  percent={room.percent}
                  href={`/inspecciones/${inspectionId}/recintos/${room.id}`}
                  isCurrent={room.id === currentRoomId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
