"use client";

import { useMemo, useState } from "react";
import type { ElementListItem } from "@/lib/inspections/get-elements-list-data";
import { ElementListRow } from "./ElementListRow";
import { EmptyState } from "@/components/ui/EmptyState";
import styles from "./ElementsListFiltered.module.css";

type ElementsListFilteredProps = {
  inspectionId: string;
  elements: ElementListItem[];
};

type StatusFilter = "all" | "pending" | "done";

// Filtrado 100% client-side sobre la lista ya cargada -- sin query ni
// Server Action nuevos, mismo contrato de get-elements-list-data.ts de
// siempre (D1 §10: "Lista de todos los elementos" usa P3 con filtros
// por recinto y estado en la columna izquierda desde 1024px; en móvil
// los mismos controles quedan arriba de la lista, sin panel aparte).
export function ElementsListFiltered({ inspectionId, elements }: ElementsListFilteredProps) {
  const [roomFilter, setRoomFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const rooms = useMemo(() => {
    const seen = new Map<string, string>();
    for (const element of elements) {
      if (!seen.has(element.roomInstanceId)) seen.set(element.roomInstanceId, element.roomName);
    }
    return [...seen.entries()].map(([id, name]) => ({ id, name }));
  }, [elements]);

  const filtered = elements.filter((element) => {
    if (roomFilter !== "all" && element.roomInstanceId !== roomFilter) return false;
    if (statusFilter === "pending" && element.status !== "PENDING") return false;
    if (statusFilter === "done" && element.status === "PENDING") return false;
    return true;
  });

  return (
    <div className={styles.layout}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Recinto</span>
          <select
            className={styles.select}
            value={roomFilter}
            onChange={(event) => setRoomFilter(event.target.value)}
          >
            <option value="all">Todos los recintos</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Estado</span>
          <div className={styles.chipRow}>
            <button
              type="button"
              className={statusFilter === "all" ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              onClick={() => setStatusFilter("all")}
            >
              Todos
            </button>
            <button
              type="button"
              className={statusFilter === "pending" ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              onClick={() => setStatusFilter("pending")}
            >
              Pendientes
            </button>
            <button
              type="button"
              className={statusFilter === "done" ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              onClick={() => setStatusFilter("done")}
            >
              Revisados
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className={styles.emptyMargin}
          title="Sin resultados"
          description="Ningún elemento coincide con este filtro."
        />
      ) : (
        <div className={styles.list}>
          {filtered.map((element) => (
            <ElementListRow key={element.id} inspectionId={inspectionId} element={element} />
          ))}
        </div>
      )}
    </div>
  );
}
