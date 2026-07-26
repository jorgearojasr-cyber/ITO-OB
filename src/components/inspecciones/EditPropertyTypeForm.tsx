"use client";

import { useState, useTransition } from "react";
import type { PropertyType } from "@prisma/client";
import { ToggleGroup } from "@/components/ui/form/ToggleGroup";
import { FormField } from "@/components/ui/form/FormField";
import {
  previewPropertyTypeChange,
  applyFeatureChanges,
  type PendingRemovalItem,
  type PropertyTypeDiffPreview,
} from "@/lib/inspections/actions";
import { evidenceLabel } from "@/lib/inspections/evidence-label";
import { PendingRemovalsPanel } from "./PendingRemovalsPanel";
import styles from "./EditPropertyTypeForm.module.css";

type EditPropertyTypeFormProps = {
  inspectionId: string;
  currentPropertyType: PropertyType;
};

type Step = "select" | "preview" | "remove";

export function EditPropertyTypeForm({ inspectionId, currentPropertyType }: EditPropertyTypeFormProps) {
  const [step, setStep] = useState<Step>("select");
  const [propertyType, setPropertyType] = useState<PropertyType>(currentPropertyType);
  const isCasa = propertyType === "CASA";
  const changed = propertyType !== currentPropertyType;

  // Casa (defaults de creación, no los del tipo viejo — no tienen sentido cruzados)
  const [hasFrontYard, setHasFrontYard] = useState(true);
  const [hasBackYard, setHasBackYard] = useState(true);
  const [hasRoofSpace, setHasRoofSpace] = useState(true);
  const [hasStairs, setHasStairs] = useState(false);
  const [hasPedestrianGate, setHasPedestrianGate] = useState(false);
  const [hasVehicleGate, setHasVehicleGate] = useState(false);
  const [isVehicleGateAutomatic, setIsVehicleGateAutomatic] = useState(false);

  // Departamento
  const [hasTerrace, setHasTerrace] = useState(true);
  const [hasStorageRoom, setHasStorageRoom] = useState(false);
  const [storageLockType, setStorageLockType] = useState<"CANDADO" | "LLAVE" | "OTRO">("CANDADO");
  const [hasParkingSpace, setHasParkingSpace] = useState(false);
  const [parkingLocation, setParkingLocation] = useState<"SUBTERRANEO" | "SUPERFICIE">("SUPERFICIE");
  const [parkingIsMarked, setParkingIsMarked] = useState(true);

  const [hasGas, setHasGas] = useState(false);
  const [hasClimatizacion, setHasClimatizacion] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [hasQuincho, setHasQuincho] = useState(false);
  const [hasPerimeterFence, setHasPerimeterFence] = useState(false);

  const [preview, setPreview] = useState<PropertyTypeDiffPreview | null>(null);
  const [pendingRemovals, setPendingRemovals] = useState<PendingRemovalItem[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const rawFlags = {
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
    hasGas,
    hasClimatizacion,
    hasPool,
    hasQuincho,
    hasPerimeterFence,
  };

  function handlePreview() {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const result = await previewPropertyTypeChange({ inspectionId, propertyType, ...rawFlags });
        setPreview(result);
        setStep("preview");
      } catch (caughtError) {
        setErrorMessage(
          caughtError instanceof Error ? caughtError.message : "No se pudo calcular el impacto. Reintenta.",
        );
      }
    });
  }

  function handleConfirm() {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const result = await applyFeatureChanges({
          inspectionId,
          propertyType,
          ...rawFlags,
          storageLockType: hasStorageRoom ? storageLockType : null,
          parkingLocation: hasParkingSpace ? parkingLocation : null,
          parkingIsMarked: hasParkingSpace ? parkingIsMarked : null,
        });
        if (result.itemsToRemove.length > 0) {
          setPendingRemovals(result.itemsToRemove);
          setStep("remove");
        } else {
          window.location.href = `/inspecciones/${inspectionId}/recintos`;
        }
      } catch (caughtError) {
        setErrorMessage(caughtError instanceof Error ? caughtError.message : "No se pudo aplicar el cambio. Reintenta.");
      }
    });
  }

  if (step === "remove" && pendingRemovals) {
    return (
      <PendingRemovalsPanel
        inspectionId={inspectionId}
        title="Recintos/elementos a eliminar"
        items={pendingRemovals}
        doneHref={`/inspecciones/${inspectionId}/recintos`}
      />
    );
  }

  if (step === "preview" && preview) {
    const hasAdditions = preview.roomsToAddNames.length > 0 || preview.elementsToAddNames.length > 0;
    return (
      <div className={styles.wrap}>
        {errorMessage && <div className={styles.formError}>{errorMessage}</div>}

        {hasAdditions && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Se van a agregar</div>
            <ul className={styles.plainList}>
              {[...preview.roomsToAddNames, ...preview.elementsToAddNames].map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}

        {preview.itemsToRemove.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Se van a eliminar (vas a confirmar cada una por separado)</div>
            <div className={styles.list}>
              {preview.itemsToRemove.map((item) => (
                <div key={item.id} className={styles.row}>
                  <div className={styles.rowName}>{item.name}</div>
                  <div className={styles.rowEvidence}>{evidenceLabel(item)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasAdditions && preview.itemsToRemove.length === 0 && (
          <div className={styles.section}>No hay recintos ni elementos afectados por este cambio.</div>
        )}

        <button type="button" className={styles.saveBtn} onClick={handleConfirm} disabled={isPending}>
          {isPending ? "Aplicando…" : `Confirmar cambio a ${isCasa ? "Casa" : "Departamento"}`}
        </button>
        <button type="button" className={styles.backBtn} onClick={() => setStep("select")} disabled={isPending}>
          Volver a editar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {errorMessage && <div className={styles.formError}>{errorMessage}</div>}

      <FormField label="Tipo de vivienda" htmlFor="propertyType">
        <ToggleGroup
          name="propertyType"
          defaultValue={currentPropertyType}
          onChange={(value) => setPropertyType(value as PropertyType)}
          options={[
            { value: "CASA", label: "Casa" },
            { value: "DEPARTAMENTO", label: "Departamento" },
          ]}
        />
      </FormField>

      {!changed && <div className={styles.hint}>Ya es de tipo {isCasa ? "Casa" : "Departamento"}.</div>}

      {changed && (
        <>
          <div className={styles.sectionTitle}>{isCasa ? "Características de la casa" : "Características del departamento"}</div>
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
                    defaultValue="MANUAL"
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
            <input
              id="hasGas"
              type="checkbox"
              checked={hasGas}
              onChange={(event) => setHasGas(event.target.checked)}
            />
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
        </>
      )}

      <button type="button" className={styles.saveBtn} onClick={handlePreview} disabled={!changed || isPending}>
        {isPending ? "Calculando…" : "Ver cambios"}
      </button>
    </div>
  );
}
