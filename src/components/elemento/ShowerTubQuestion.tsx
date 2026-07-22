"use client";

import { useState, useTransition } from "react";
import { setBathroomFixtures } from "@/lib/inspections/actions";
import styles from "./ShowerTubQuestion.module.css";

type ShowerTubQuestionProps = {
  inspectionId: string;
  roomInstanceId: string;
  elementInstanceId: string;
};

export function ShowerTubQuestion({ inspectionId, roomInstanceId, elementInstanceId }: ShowerTubQuestionProps) {
  const [hasShower, setHasShower] = useState(false);
  const [hasBathtub, setHasBathtub] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleContinue() {
    startTransition(() => {
      setBathroomFixtures({ inspectionId, roomInstanceId, elementInstanceId, hasShower, hasBathtub });
    });
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>¿Qué tiene este baño?</div>
      <div className={styles.subtitle}>
        Marca todo lo que corresponda. Se pregunta una sola vez por recinto.
      </div>
      <div className={styles.options}>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={hasShower}
            onChange={(event) => setHasShower(event.target.checked)}
          />
          Ducha
        </label>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={hasBathtub}
            onChange={(event) => setHasBathtub(event.target.checked)}
          />
          Tina
        </label>
      </div>
      <button type="button" className={styles.continueBtn} onClick={handleContinue} disabled={isPending}>
        {isPending ? "Guardando…" : "Continuar"}
      </button>
    </div>
  );
}
