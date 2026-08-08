"use client";

import { useState } from "react";
import { CloseInspectionModal } from "@/components/inspecciones/CloseInspectionModal";
import type { ObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import styles from "./CloseInspectionSection.module.css";

type CloseInspectionSectionProps = {
  inspectionId: string;
  progress: ObservationsSummaryData["progress"];
  observationsCount: number;
};

export function CloseInspectionSection({ inspectionId, progress, observationsCount }: CloseInspectionSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.closeBtn} onClick={() => setIsModalOpen(true)}>
        Cerrar inspección
      </button>
      <div className={styles.hint}>
        Al cerrar, se capturan las firmas del propietario y la constructora y se genera el informe final en PDF.
        Esta acción no se puede deshacer.
      </div>
      {isModalOpen && (
        <CloseInspectionModal
          inspectionId={inspectionId}
          progress={progress}
          observationsCount={observationsCount}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
