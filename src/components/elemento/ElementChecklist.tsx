"use client";

import { useState } from "react";
import Link from "next/link";
import { ChecklistItemRow } from "./ChecklistItemRow";
import type { ElementInstanceData } from "@/lib/inspections/get-element-instance-data";
import styles from "./ElementChecklist.module.css";

type ElementChecklistProps = {
  inspectionId: string;
  elementInstanceId: string;
  roomInstanceId: string;
  roomName: string;
  checklist: ElementInstanceData["checklist"];
};

export function ElementChecklist({
  inspectionId,
  elementInstanceId,
  roomInstanceId,
  roomName,
  checklist,
}: ElementChecklistProps) {
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(
    () => new Set(checklist.filter((item) => item.observation !== null).map((item) => item.checklistItemTemplateId)),
  );

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
          <ChecklistItemRow
            key={item.checklistItemTemplateId}
            inspectionId={inspectionId}
            elementInstanceId={elementInstanceId}
            checklistItemTemplateId={item.checklistItemTemplateId}
            question={item.question}
            helpText={item.helpText}
            initialObservation={item.observation}
            onAnswered={handleAnswered}
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
