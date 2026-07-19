"use client";

import { useMemo, useState } from "react";
import type { Priority } from "@prisma/client";
import type { ObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import { ObservationSummaryRow } from "./ObservationSummaryRow";
import styles from "./ObservationsSummaryList.module.css";

type PriorityFilter = "TODAS" | Priority;

const PRIORITY_FILTERS: { value: PriorityFilter; label: string }[] = [
  { value: "TODAS", label: "Todas" },
  { value: "ALTA", label: "Alta" },
  { value: "MEDIA", label: "Media" },
  { value: "BAJA", label: "Baja" },
];

type ObservationsSummaryListProps = {
  inspectionId: string;
  data: ObservationsSummaryData;
};

export function ObservationsSummaryList({ inspectionId, data }: ObservationsSummaryListProps) {
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("TODAS");
  const [roomFilter, setRoomFilter] = useState<string>("TODOS");

  const filtered = useMemo(() => {
    return data.observations.filter((observation) => {
      if (priorityFilter !== "TODAS" && observation.priority !== priorityFilter) return false;
      if (roomFilter !== "TODOS" && observation.roomInstanceId !== roomFilter) return false;
      return true;
    });
  }, [data.observations, priorityFilter, roomFilter]);

  if (data.observations.length === 0) {
    return <div className={styles.empty}>Sin observaciones registradas todavía.</div>;
  }

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.priorityChips}>
          {PRIORITY_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={priorityFilter === option.value ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              onClick={() => setPriorityFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <select
          className={styles.roomSelect}
          value={roomFilter}
          onChange={(event) => setRoomFilter(event.target.value)}
        >
          <option value="TODOS">Todos los recintos</option>
          {data.rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>No hay observaciones con este filtro.</div>
      ) : (
        <div className={styles.list}>
          {filtered.map((observation) => (
            <ObservationSummaryRow key={observation.id} inspectionId={inspectionId} observation={observation} />
          ))}
        </div>
      )}
    </>
  );
}
