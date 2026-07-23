"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { updateRoomCounts, deleteRoomInstance, type RoomCountReduction } from "@/lib/inspections/actions";
import type { RoomDistributionData, RoomDistributionInstance } from "@/lib/inspections/get-room-distribution-data";
import { DeleteRoomModal } from "./DeleteRoomModal";
import formStyles from "@/components/ui/form/FormField.module.css";
import { FormField } from "@/components/ui/form/FormField";
import styles from "./EditDistributionForm.module.css";

type EditDistributionFormProps = {
  inspectionId: string;
  data: NonNullable<RoomDistributionData>;
};

type Step = "counts" | "reduce";

type PendingDelete = {
  roomSlug: "dormitorios" | "banos";
  instance: RoomDistributionInstance;
};

function evidenceLabel(instance: RoomDistributionInstance): string {
  const parts = [`${instance.elementsDone} de ${instance.elementsTotal} elementos revisados`];
  parts.push(`${instance.photoCount} foto${instance.photoCount === 1 ? "" : "s"}`);
  parts.push(`${instance.observationCount} ${instance.observationCount === 1 ? "observación" : "observaciones"}`);
  return parts.join(", ");
}

export function EditDistributionForm({ inspectionId, data }: EditDistributionFormProps) {
  const [step, setStep] = useState<Step>("counts");
  const [bedroomCount, setBedroomCount] = useState(String(data.bedroomCount));
  const [bathroomCount, setBathroomCount] = useState(String(data.bathroomCount));
  const [reductions, setReductions] = useState<RoomCountReduction[]>([]);
  const [instancesBySlug, setInstancesBySlug] = useState<Record<"dormitorios" | "banos", RoomDistributionInstance[]>>({
    dormitorios: data.dormitorios,
    banos: data.banos,
  });
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, startSaveTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  function handleSaveCounts() {
    setErrorMessage(null);
    startSaveTransition(async () => {
      try {
        const result = await updateRoomCounts({
          inspectionId,
          bedroomCount: parseInt(bedroomCount, 10) || 1,
          bathroomCount: parseInt(bathroomCount, 10) || 1,
        });
        if (result.needsReduction.length > 0) {
          setReductions(result.needsReduction);
          setStep("reduce");
        } else {
          window.location.href = `/inspecciones/${inspectionId}/recintos`;
        }
      } catch {
        setErrorMessage("No se pudo guardar. Reintenta.");
      }
    });
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    const { roomSlug, instance } = pendingDelete;
    startDeleteTransition(async () => {
      try {
        await deleteRoomInstance({ inspectionId, roomInstanceId: instance.id });
        setInstancesBySlug((current) => ({
          ...current,
          [roomSlug]: current[roomSlug].filter((item) => item.id !== instance.id),
        }));
        setPendingDelete(null);
      } catch {
        setErrorMessage("No se pudo eliminar. Reintenta.");
        setPendingDelete(null);
      }
    });
  }

  if (step === "counts") {
    return (
      <div className={styles.wrap}>
        {errorMessage && <div className={styles.formError}>{errorMessage}</div>}
        <FormField label="N° de dormitorios" htmlFor="bedroomCount">
          <input
            id="bedroomCount"
            type="number"
            min={1}
            max={10}
            value={bedroomCount}
            onChange={(event) => setBedroomCount(event.target.value)}
            className={formStyles.input}
          />
        </FormField>
        <FormField label="N° de baños" htmlFor="bathroomCount">
          <input
            id="bathroomCount"
            type="number"
            min={1}
            max={10}
            value={bathroomCount}
            onChange={(event) => setBathroomCount(event.target.value)}
            className={formStyles.input}
          />
        </FormField>
        <button type="button" className={styles.saveBtn} onClick={handleSaveCounts} disabled={isSaving}>
          {isSaving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    );
  }

  const allDone = reductions.every((reduction) => instancesBySlug[reduction.roomSlug].length <= reduction.to);

  return (
    <div className={styles.wrap}>
      {errorMessage && <div className={styles.formError}>{errorMessage}</div>}

      {reductions.map((reduction) => {
        const instances = instancesBySlug[reduction.roomSlug];
        const remaining = instances.length - reduction.to;

        return (
          <div key={reduction.roomSlug} className={styles.section}>
            <div className={styles.sectionTitle}>
              {reduction.label}s — de {reduction.from} a {reduction.to}
            </div>
            <div className={styles.counter}>
              {remaining > 0
                ? `Elimina ${remaining} de ${instances.length} para continuar`
                : "Listo — cantidad alcanzada"}
            </div>
            <div className={styles.list}>
              {instances.map((instance) => (
                <div key={instance.id} className={styles.row}>
                  <div className={styles.rowBody}>
                    <div className={styles.rowName}>{instance.name}</div>
                    <div className={styles.rowEvidence}>{evidenceLabel(instance)}</div>
                  </div>
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    disabled={remaining <= 0}
                    onClick={() => setPendingDelete({ roomSlug: reduction.roomSlug, instance })}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {allDone && (
        <Link href={`/inspecciones/${inspectionId}/recintos`} className={styles.saveBtn}>
          Volver a Recintos
        </Link>
      )}

      {pendingDelete && (
        <DeleteRoomModal
          roomName={pendingDelete.instance.name}
          photoCount={pendingDelete.instance.photoCount}
          observationCount={pendingDelete.instance.observationCount}
          isPending={isDeleting}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
