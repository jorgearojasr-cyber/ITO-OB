"use client";

import { useActionState, useRef, useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/form/FormField";
import { ToggleGroup } from "@/components/ui/form/ToggleGroup";
import { createInspection, type CreateInspectionState } from "@/lib/inspections/actions";
import type { ProjectOption } from "@/lib/inspections/get-inspection-options";
import formStyles from "@/components/ui/form/FormField.module.css";
import styles from "./NuevaInspeccionForm.module.css";

const INITIAL_STATE: CreateInspectionState = {};

const REQUIRED_TEXT_FIELDS = ["projectName", "unitLabel", "address"] as const;

type NuevaInspeccionFormProps = {
  existingProjects: ProjectOption[];
};

export function NuevaInspeccionForm({ existingProjects }: NuevaInspeccionFormProps) {
  const [state, formAction, isPending] = useActionState(createInspection, INITIAL_STATE);

  const [propertyType, setPropertyType] = useState("CASA");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const projectNameRef = useRef<HTMLInputElement>(null);
  const developerNameRef = useRef<HTMLInputElement>(null);
  const builderNameRef = useRef<HTMLInputElement>(null);

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

  function handleExistingProjectSelect(projectName: string) {
    const project = existingProjects.find((p) => p.projectName === projectName);
    if (projectNameRef.current) projectNameRef.current.value = project?.projectName ?? "";
    if (developerNameRef.current) developerNameRef.current.value = project?.developerName ?? "";
    if (builderNameRef.current) builderNameRef.current.value = project?.builderName ?? "";
    setFieldErrors((prev) => {
      if (!prev.projectName) return prev;
      const { projectName: _removed, ...rest } = prev;
      return rest;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const errors: Record<string, string> = {};
    for (const field of REQUIRED_TEXT_FIELDS) {
      const input = form.elements.namedItem(field) as HTMLInputElement | null;
      if (!input?.value.trim()) errors[field] = "Completa este campo.";
    }
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setFieldErrors(errors);
      (form.elements.namedItem(Object.keys(errors)[0]) as HTMLElement | null)?.focus();
      return;
    }
    setFieldErrors({});
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className={styles.form}>
      {state.error && <div className={styles.formError}>{state.error}</div>}

      <div className={styles.sectionTitle}>Proyecto</div>
      {existingProjects.length >= 2 && (
        <FormField label="¿Es un proyecto que ya ingresaste?" htmlFor="existingProject">
          <select
            id="existingProject"
            className={formStyles.select}
            onChange={(event) => handleExistingProjectSelect(event.target.value)}
            defaultValue=""
          >
            <option value="">Proyecto nuevo</option>
            {existingProjects.map((project) => (
              <option key={project.projectName} value={project.projectName}>
                {project.projectName}
              </option>
            ))}
          </select>
        </FormField>
      )}
      <FormField label="Proyecto inmobiliario" htmlFor="projectName" required error={fieldErrors.projectName}>
        <input
          id="projectName"
          name="projectName"
          ref={projectNameRef}
          className={formStyles.input}
          placeholder="Condominio Los Robles"
        />
      </FormField>
      <FormField label="Unidad" htmlFor="unitLabel" required error={fieldErrors.unitLabel}>
        <input id="unitLabel" name="unitLabel" className={formStyles.input} placeholder="Casa 15" />
      </FormField>
      <FormField label="Dirección" htmlFor="address" required error={fieldErrors.address}>
        <input id="address" name="address" className={formStyles.input} placeholder="Av. Los Robles 1234, Santiago" />
      </FormField>
      <FormField label="Inmobiliaria" htmlFor="developerName">
        <input id="developerName" name="developerName" ref={developerNameRef} className={formStyles.input} />
      </FormField>
      <FormField label="Constructora" htmlFor="builderName">
        <input id="builderName" name="builderName" ref={builderNameRef} className={formStyles.input} />
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

      <div className={styles.sectionTitle}>Distribución</div>
      <FormField label="N° de dormitorios" htmlFor="bedroomCount">
        <input
          id="bedroomCount"
          name="bedroomCount"
          type="number"
          min={1}
          max={10}
          defaultValue={1}
          className={formStyles.input}
        />
      </FormField>
      <FormField label="N° de baños" htmlFor="bathroomCount">
        <input
          id="bathroomCount"
          name="bathroomCount"
          type="number"
          min={1}
          max={10}
          defaultValue={1}
          className={formStyles.input}
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
