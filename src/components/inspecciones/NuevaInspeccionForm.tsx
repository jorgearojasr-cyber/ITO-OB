"use client";

import { useActionState, useState } from "react";
import { FormField } from "@/components/ui/form/FormField";
import { ToggleGroup } from "@/components/ui/form/ToggleGroup";
import { createInspection, type CreateInspectionState } from "@/lib/inspections/actions";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "./NuevaInspeccionForm.module.css";

const INITIAL_STATE: CreateInspectionState = {};

export function NuevaInspeccionForm() {
  const [state, formAction, isPending] = useActionState(createInspection, INITIAL_STATE);

  const [propertyType, setPropertyType] = useState("CASA");

  // Casa
  const [hasFrontYard, setHasFrontYard] = useState(true);
  const [hasBackYard, setHasBackYard] = useState(true);
  const [hasRoofSpace, setHasRoofSpace] = useState(true);
  const [hasStairs, setHasStairs] = useState(false);
  const [hasPedestrianGate, setHasPedestrianGate] = useState(false);
  const [hasVehicleGate, setHasVehicleGate] = useState(false);

  // Departamento
  const [hasTerrace, setHasTerrace] = useState(true);
  const [hasStorageRoom, setHasStorageRoom] = useState(false);
  const [hasParkingSpace, setHasParkingSpace] = useState(false);

  function handlePropertyTypeChange(value: string) {
    setPropertyType(value);
  }

  return (
    <form action={formAction} className={styles.form}>
      {state.error && <div className={styles.formError}>{state.error}</div>}

      <div className={styles.sectionTitle}>Proyecto</div>
      <FormField label="Proyecto inmobiliario" htmlFor="projectName" required>
        <input id="projectName" name="projectName" className={formStyles.input} placeholder="Condominio Los Robles" />
      </FormField>
      <FormField label="Unidad" htmlFor="unitLabel" required>
        <input id="unitLabel" name="unitLabel" className={formStyles.input} placeholder="Casa 15" />
      </FormField>
      <FormField label="Dirección" htmlFor="address" required>
        <input id="address" name="address" className={formStyles.input} placeholder="Av. Los Robles 1234, Santiago" />
      </FormField>
      <FormField label="Inmobiliaria" htmlFor="developerName">
        <input id="developerName" name="developerName" className={formStyles.input} />
      </FormField>
      <FormField label="Constructora" htmlFor="builderName">
        <input id="builderName" name="builderName" className={formStyles.input} />
      </FormField>
      <FormField label="Fecha de recepción" htmlFor="receptionDate">
        <input id="receptionDate" name="receptionDate" type="date" className={formStyles.input} />
      </FormField>
      <FormField label="Número de recepción" htmlFor="receptionNumber">
        <input id="receptionNumber" name="receptionNumber" className={formStyles.input} />
      </FormField>

      <div className={styles.sectionTitle}>Tipo de vivienda</div>
      <FormField label="Tipo de vivienda" htmlFor="propertyType" required>
        <ToggleGroup
          name="propertyType"
          defaultValue="CASA"
          onChange={handlePropertyTypeChange}
          options={[
            { value: "CASA", label: "Casa" },
            { value: "DEPARTAMENTO", label: "Departamento" },
          ]}
        />
      </FormField>

      <div className={styles.sectionTitle}>Características de la propiedad</div>
      {propertyType === "CASA" ? (
        <>
          <div className={styles.checkboxRow}>
            <input
              id="hasFrontYard"
              name="hasFrontYard"
              type="checkbox"
              checked={hasFrontYard}
              onChange={(event) => setHasFrontYard(event.target.checked)}
            />
            <label htmlFor="hasFrontYard">Patio delantero</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasBackYard"
              name="hasBackYard"
              type="checkbox"
              checked={hasBackYard}
              onChange={(event) => setHasBackYard(event.target.checked)}
            />
            <label htmlFor="hasBackYard">Patio trasero</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasRoofSpace"
              name="hasRoofSpace"
              type="checkbox"
              checked={hasRoofSpace}
              onChange={(event) => setHasRoofSpace(event.target.checked)}
            />
            <label htmlFor="hasRoofSpace">Cobertizo de acceso</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasStairs"
              name="hasStairs"
              type="checkbox"
              checked={hasStairs}
              onChange={(event) => setHasStairs(event.target.checked)}
            />
            <label htmlFor="hasStairs">¿Tiene escalera interior (más de un piso)?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasPedestrianGate"
              name="hasPedestrianGate"
              type="checkbox"
              checked={hasPedestrianGate}
              onChange={(event) => setHasPedestrianGate(event.target.checked)}
            />
            <label htmlFor="hasPedestrianGate">¿Tiene reja peatonal de acceso?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasVehicleGate"
              name="hasVehicleGate"
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
                options={[
                  { value: "AUTOMATICO", label: "Automático" },
                  { value: "MANUAL", label: "Solo con cerradura" },
                ]}
              />
            </FormField>
          )}
        </>
      ) : (
        <>
          <div className={styles.checkboxRow}>
            <input
              id="hasTerrace"
              name="hasTerrace"
              type="checkbox"
              checked={hasTerrace}
              onChange={(event) => setHasTerrace(event.target.checked)}
            />
            <label htmlFor="hasTerrace">¿Tiene terraza?</label>
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="hasStorageRoom"
              name="hasStorageRoom"
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
                defaultValue="CANDADO"
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
              name="hasParkingSpace"
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
                  defaultValue="SUPERFICIE"
                  options={[
                    { value: "SUBTERRANEO", label: "Subterráneo" },
                    { value: "SUPERFICIE", label: "De superficie" },
                  ]}
                />
              </FormField>
              <div className={`${styles.checkboxRow} ${styles.checkboxRowNested}`}>
                <input id="parkingIsMarked" name="parkingIsMarked" type="checkbox" defaultChecked />
                <label htmlFor="parkingIsMarked">¿Está demarcado con líneas/numeración?</label>
              </div>
            </>
          )}
        </>
      )}

      <button type="submit" className={styles.submitBtn} disabled={isPending}>
        {isPending ? "Creando…" : "Crear inspección"}
      </button>
    </form>
  );
}
