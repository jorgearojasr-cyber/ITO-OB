"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChecklistItemCard } from "./ChecklistItemCard";
import type { ElementInstanceData } from "@/lib/inspections/get-element-instance-data";
import styles from "./ElementChecklist.module.css";

type ElementChecklistProps = {
  inspectionId: string;
  elementInstanceId: string;
  elementName: string;
  roomInstanceId: string;
  roomName: string;
  checklist: ElementInstanceData["checklist"];
  // Puramente de presentación: le avisan al wrapper visual (Don José
  // Luis + progreso en el header) cuántos ítems van respondidos y cuándo
  // mostrar la confirmación "Escuchando". No participan del guardado ni
  // del cálculo de "elemento revisado" de abajo.
  onProgressChange?: (answeredCount: number) => void;
  onAction?: () => void;
};

export function ElementChecklist({
  inspectionId,
  elementInstanceId,
  elementName,
  roomInstanceId,
  roomName,
  checklist,
  onProgressChange,
  onAction,
}: ElementChecklistProps) {
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(
    () => new Set(checklist.filter((item) => item.observation !== null).map((item) => item.checklistItemTemplateId)),
  );

  // En un efecto, no dentro del updater de setAnsweredIds -- llamar al
  // setState de un componente padre desde el updater de otro componente
  // pasa durante la fase de render de React y produce "Cannot update a
  // component while rendering a different component".
  useEffect(() => {
    onProgressChange?.(answeredIds.size);
  }, [answeredIds, onProgressChange]);

  function handleAnswered(checklistItemTemplateId: string) {
    setAnsweredIds((current) => {
      if (current.has(checklistItemTemplateId)) return current;
      const next = new Set(current);
      next.add(checklistItemTemplateId);
      return next;
    });
  }

  const allAnswered = checklist.length > 0 && answeredIds.size === checklist.length;

  return (
    <>
      <div className={styles.list}>
        {checklist.map((item) => (
          <ChecklistItemCard
            key={item.checklistItemTemplateId}
            inspectionId={inspectionId}
            elementInstanceId={elementInstanceId}
            elementName={elementName}
            roomName={roomName}
            checklistItemTemplateId={item.checklistItemTemplateId}
            question={item.question}
            helpText={item.helpText}
            initialObservation={item.observation}
            onAnswered={handleAnswered}
            onAction={onAction}
          />
        ))}
      </div>

      {allAnswered && (
        <Link href={`/inspecciones/${inspectionId}/recintos/${roomInstanceId}`} className={styles.completeBtn}>
          ✓ Elemento revisado — Volver a {roomName}
        </Link>
      )}
    </>
  );
}
