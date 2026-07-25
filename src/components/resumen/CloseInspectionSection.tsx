"use client";

import { useState } from "react";
import { CloseInspectionModal } from "@/components/inspecciones/CloseInspectionModal";
import styles from "./CloseInspectionSection.module.css";

type CloseInspectionSectionProps = {
  inspectionId: string;
};

export function CloseInspectionSection({ inspectionId }: CloseInspectionSectionProps) {
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
        <CloseInspectionModal inspectionId={inspectionId} onCancel={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
