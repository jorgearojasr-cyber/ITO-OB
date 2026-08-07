"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionMenu, type ActionMenuAction } from "@/components/ui/ActionMenu";
import { DeleteInspectionModal } from "./DeleteInspectionModal";
import type { InspectionListItemData } from "@/lib/inspections/get-inspections-list-data";
import styles from "./InspectionListItem.module.css";

type InspectionListItemProps = {
  inspection: InspectionListItemData;
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function InspectionListItem({ inspection }: InspectionListItemProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isCompleted = inspection.statusLabel === "COMPLETADA";
  // Un colaborador externo solo tiene acceso a /resumen y /elementos/[id] de
  // esta inspección (ver inspection-access.ts) — nunca al recorrido por
  // recintos, así que su link siempre va directo al resumen.
  const href =
    !inspection.isCollaboration && !isCompleted && inspection.firstRoomId
      ? `/inspecciones/${inspection.id}/recintos/${inspection.firstRoomId}`
      : `/inspecciones/${inspection.id}/resumen`;

  // Mecanismo de ActionMenu (Sprint UX-02) con sus dos primeras acciones
  // reales -- "Eliminar" solo aparece si canManage es true (mismo
  // criterio que /resumen: isOrgMember && canManageInspection); un
  // colaborador externo nunca la ve, aunque tenga acceso de lectura. La
  // fila entera sigue navegando igual que antes vía el link "estirado"
  // (stretchedLink, inset:0); el trigger del menú va aparte para no
  // anidar un <button> dentro de un <a>, y corta la propagación del
  // click hacia el link de abajo.
  const actions: ActionMenuAction[] = [
    {
      key: "observaciones",
      label: "Ver observaciones",
      onSelect: () => router.push(`/inspecciones/${inspection.id}/observaciones`),
    },
    ...(inspection.canManage
      ? [
          {
            key: "eliminar",
            label: "Eliminar inspección",
            variant: "danger" as const,
            onSelect: () => setShowDeleteModal(true),
          },
        ]
      : []),
  ];

  return (
    <div className={styles.card}>
      <Link href={href} className={styles.stretchedLink} aria-label={`${inspection.projectName} — ${inspection.unitLabel}`} />
      <div className={styles.top}>
        <div className={styles.title}>
          {inspection.projectName} <span className={styles.unit}>— {inspection.unitLabel}</span>
        </div>
        <span className={`${styles.chip} ${isCompleted ? styles.completed : styles.inProgress}`}>
          <span className={styles.dot} />
          {isCompleted ? "Completada" : "En progreso"}
        </span>
        <ActionMenu actions={actions} ariaLabel={`Acciones de ${inspection.projectName}`} />
      </div>
      {inspection.isCollaboration && <div className={styles.collabBadge}>Colaboras aquí</div>}
      <div className={styles.meta}>{inspection.address}</div>
      {inspection.date && <div className={styles.meta}>{dateFormatter.format(inspection.date)}</div>}
      <div className={styles.progressWrap}>
        <div className={styles.progressLabel}>{inspection.percent}% de avance</div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${inspection.percent}%` }} />
        </div>
      </div>

      {showDeleteModal && (
        <DeleteInspectionModal
          inspectionId={inspection.id}
          projectName={inspection.projectName}
          unitLabel={inspection.unitLabel}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
