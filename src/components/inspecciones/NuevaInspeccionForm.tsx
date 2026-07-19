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

  const [hasTerrace, setHasTerrace] = useState(true);
  const [hasRoofSpace, setHasRoofSpace] = useState(true);
  const [hasStairs, setHasStairs] = useState(false);
  const [terraceTouched, setTerraceTouched] = useState(false);
  const [roofTouched, setRoofTouched] = useState(false);

  function handlePropertyTypeChange(value: string) {
    const defaultValue = value === "CASA";
    if (!terraceTouched) setHasTerrace(defaultValue);
    if (!roofTouched) setHasRoofSpace(defaultValue);
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

      <div className={styles.checkboxRow}>
        <input
          id="hasTerrace"
          name="hasTerrace"
          type="checkbox"
          checked={hasTerrace}
          onChange={(event) => {
            setHasTerrace(event.target.checked);
            setTerraceTouched(true);
          }}
        />
        <label htmlFor="hasTerrace">¿Tiene terraza o patio?</label>
      </div>
      <div className={styles.checkboxRow}>
        <input
          id="hasRoofSpace"
          name="hasRoofSpace"
          type="checkbox"
          checked={hasRoofSpace}
          onChange={(event) => {
            setHasRoofSpace(event.target.checked);
            setRoofTouched(true);
          }}
        />
        <label htmlFor="hasRoofSpace">¿Tiene techumbre con acceso propio?</label>
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

      <button type="submit" className={styles.submitBtn} disabled={isPending}>
        {isPending ? "Creando…" : "Crear inspección"}
      </button>
    </form>
  );
}
