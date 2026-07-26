"use client";

import { useState, useTransition } from "react";
import { ToggleGroup } from "@/components/ui/form/ToggleGroup";
import { FormField } from "@/components/ui/form/FormField";
import { applyFeatureChanges, type PendingRemovalItem } from "@/lib/inspections/actions";
import type { FeatureFlagsData } from "@/lib/inspections/get-feature-flags-data";
import { PendingRemovalsPanel } from "./PendingRemovalsPanel";
import styles from "./EditFeaturesForm.module.css";

type EditFeaturesFormProps = {
  inspectionId: string;
  data: NonNullable<FeatureFlagsData>;
};

export function EditFeaturesForm({ inspectionId, data }: EditFeaturesFormProps) {
  const isCasa = data.propertyType === "CASA";

  const [hasFrontYard, setHasFrontYard] = useState(data.hasFrontYard);
  const [hasBackYard, setHasBackYard] = useState(data.hasBackYard);
  const [hasRoofSpace, setHasRoofSpace] = useState(data.hasRoofSpace);
  const [hasStairs, setHasStairs] = useState(data.hasStairs);
  const [hasPedestrianGate, setHasPedestrianGate] = useState(data.hasPedestrianGate);
  const [hasVehicleGate, setHasVehicleGate] = useState(data.hasVehicleGate);
  const [isVehicleGateAutomatic, setIsVehicleGateAutomatic] = useState(data.isVehicleGateAutomatic);

  const [hasTerrace, setHasTerrace] = useState(data.hasTerrace);
  const [hasStorageRoom, setHasStorageRoom] = useState(data.hasStorageRoom);
  const [storageLockType, setStorageLockType] = useState(data.storageLockType ?? "CANDADO");
  const [hasParkingSpace, setHasParkingSpace] = useState(data.hasParkingSpace);
  const [parkingLocation, setParkingLocation] = useState(data.parkingLocation ?? "SUPERFICIE");
  const [parkingIsMarked, setParkingIsMarked] = useState(data.parkingIsMarked ?? true);

  const [hasGas, setHasGas] = useState(data.hasGas);
  const [hasClimatizacion, setHasClimatizacion] = useState(data.hasClimatizacion);
  const [hasPool, setHasPool] = useState(data.hasPool);
  const [hasQuincho, setHasQuincho] = useState(data.hasQuincho);
  const [hasPerimeterFence, setHasPerimeterFence] = useState(data.hasPerimeterFence);

  const [pendingRemovals, setPendingRemovals] = useState<PendingRemovalItem[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, startTransition] = useTransition();

  function handleSave() {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const result = await applyFeatureChanges({
          inspectionId,
          propertyType: data.propertyType,
          hasFrontYard,
          hasBackYard,
          hasRoofSpace,
          hasStairs,
          hasPedestrianGate,
          hasVehicleGate,
          isVehicleGateAutomatic,
          hasTerrace,
          hasStorageRoom,
          hasParkingSpace,
          storageLockType: hasStorageRoom ? storageLockType : null,
          parkingLocation: hasParkingSpace ? parkingLocation : null,
          parkingIsMarked: hasParkingSpace ? parkingIsMarked : null,
          hasGas,
          hasClimatizacion,
          hasPool,
          hasQuincho,
          hasPerimeterFence,
        });
        if (result.itemsToRemove.length > 0) {
          setPendingRemovals(result.itemsToRemove);
        } else {
          window.location.href = `/inspecciones/${inspectionId}/recintos`;
        }
      } catch {
        setErrorMessage("No se pudo guardar. Reintenta.");
      }
    });
  }

  if (pendingRemovals) {
    return (
      <PendingRemovalsPanel
        inspectionId={inspectionId}
        title="Recintos/elementos a eliminar"
        items={pendingRemovals}
        doneHref={`/inspecciones/${inspectionId}/recintos`}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      {errorMessage && <div className={styles.formError}>{errorMessage}</div>}

      {isCasa ? (
        <>
          <div className={styles.checkboxRow}>
            <input
              id="hasFrontYard"
              type="checkbox"
              checked={hasFrontYard}
              onChange={(event) => setHasFrontYard(event.target.checked)}
            />
            <label htmlFor="hasFrontYard">Patio delantero</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasBackYard"
              type="checkbox"
              checked={hasBackYard}
              onChange={(event) => setHasBackYard(event.target.checked)}
            />
            <label htmlFor="hasBackYard">Patio trasero</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasRoofSpace"
              type="checkbox"
              checked={hasRoofSpace}
              onChange={(event) => setHasRoofSpace(event.target.checked)}
            />
            <label htmlFor="hasRoofSpace">Cobertizo de acceso</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasStairs"
              type="checkbox"
              checked={hasStairs}
              onChange={(event) => setHasStairs(event.target.checked)}
            />
            <label htmlFor="hasStairs">¿Tiene escalera interior (más de un piso)?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasPedestrianGate"
              type="checkbox"
              checked={hasPedestrianGate}
              onChange={(event) => setHasPedestrianGate(event.target.checked)}
            />
            <label htmlFor="hasPedestrianGate">¿Tiene reja peatonal de acceso?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasVehicleGate"
              type="checkbox"
              checked={hasVehicleGate}
              onChange={(event) => setHasVehicleGate(event.target.checked)}
            />
            <label htmlFor="hasVehicleGate">¿Tiene acceso vehicular con portón?</label>
          </div>
          {hasVehicleGate && (
            <FormField label="¿El portón es automático o solo con cerradura?" htmlFor="isVehicleGateAutomatic">
              <ToggleGroup
                name="isVehicleGateAutomatic"
                defaultValue={isVehicleGateAutomatic ? "AUTOMATICO" : "MANUAL"}
                onChange={(value) => setIsVehicleGateAutomatic(value === "AUTOMATICO")}
                options={[
                  { value: "AUTOMATICO", label: "Automático" },
                  { value: "MANUAL", label: "Solo con cerradura" },
                ]}
              />
            </FormField>
          )}
          <div className={styles.checkboxRow}>
            <input
              id="hasPool"
              type="checkbox"
              checked={hasPool}
              onChange={(event) => setHasPool(event.target.checked)}
            />
            <label htmlFor="hasPool">¿Tiene piscina?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasQuincho"
              type="checkbox"
              checked={hasQuincho}
              onChange={(event) => setHasQuincho(event.target.checked)}
            />
            <label htmlFor="hasQuincho">¿Tiene quincho?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasPerimeterFence"
              type="checkbox"
              checked={hasPerimeterFence}
              onChange={(event) => setHasPerimeterFence(event.target.checked)}
            />
            <label htmlFor="hasPerimeterFence">¿Tiene cierre perimetral (rejas/panderetas)?</label>
          </div>
        </>
      ) : (
        <>
          <div className={styles.checkboxRow}>
            <input
              id="hasTerrace"
              type="checkbox"
              checked={hasTerrace}
              onChange={(event) => setHasTerrace(event.target.checked)}
            />
            <label htmlFor="hasTerrace">¿Tiene terraza?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasStorageRoom"
              type="checkbox"
              checked={hasStorageRoom}
              onChange={(event) => setHasStorageRoom(event.target.checked)}
            />
            <label htmlFor="hasStorageRoom">¿Tiene bodega?</label>
          </div>
          {hasStorageRoom && (
            <FormField label="¿Con qué tipo de cerradura?" htmlFor="storageLockType">
              <ToggleGroup
                name="storageLockType"
                defaultValue={storageLockType}
                onChange={(value) => setStorageLockType(value as typeof storageLockType)}
                options={[
                  { value: "CANDADO", label: "Candado" },
                  { value: "LLAVE", label: "Con llave" },
                  { value: "OTRO", label: "Otro" },
                ]}
              />
            </FormField>
          )}
          <div className={styles.checkboxRow}>
            <input
              id="hasParkingSpace"
              type="checkbox"
              checked={hasParkingSpace}
              onChange={(event) => setHasParkingSpace(event.target.checked)}
            />
            <label htmlFor="hasParkingSpace">¿Tiene estacionamiento?</label>
          </div>
          {hasParkingSpace && (
            <>
              <FormField label="¿Es subterráneo o de superficie?" htmlFor="parkingLocation">
                <ToggleGroup
                  name="parkingLocation"
                  defaultValue={parkingLocation}
                  onChange={(value) => setParkingLocation(value as typeof parkingLocation)}
                  options={[
                    { value: "SUBTERRANEO", label: "Subterráneo" },
                    { value: "SUPERFICIE", label: "De superficie" },
                  ]}
                />
              </FormField>
              <div className={`${styles.checkboxRow} ${styles.checkboxRowNested}`}>
                <input
                  id="parkingIsMarked"
                  type="checkbox"
                  checked={parkingIsMarked}
                  onChange={(event) => setParkingIsMarked(event.target.checked)}
                />
                <label htmlFor="parkingIsMarked">¿Está demarcado con líneas/numeración?</label>
              </div>
            </>
          )}
        </>
      )}

      <div className={styles.checkboxRow}>
        <input id="hasGas" type="checkbox" checked={hasGas} onChange={(event) => setHasGas(event.target.checked)} />
        <label htmlFor="hasGas">¿Tiene instalación de gas?</label>
      </div>
      <div className={styles.checkboxRow}>
        <input
          id="hasClimatizacion"
          type="checkbox"
          checked={hasClimatizacion}
          onChange={(event) => setHasClimatizacion(event.target.checked)}
        />
        <label htmlFor="hasClimatizacion">¿Tiene climatización o calefacción?</label>
      </div>

      <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Guardando…" : "Guardar cambios"}
      </button>
    </div>
  );
}
