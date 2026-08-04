"use client";

import { useRef, useState } from "react";
import { BackHeader } from "@/components/ui/BackHeader";
import { DonJoseLuisAvatar } from "@/components/ui/DonJoseLuisAvatar";
import { DonJoseLuisCard } from "@/components/ui/DonJoseLuisCard";
import { ElementLibraryCard } from "./ElementLibraryCard";
import { GoodBadExamplesSection } from "@/components/biblioteca/GoodBadExamplesSection";
import { ElementChecklist } from "./ElementChecklist";
import { goodBadExamplesByCategorySlug } from "@/lib/library/good-bad-examples";
import type { ElementInstanceData } from "@/lib/inspections/get-element-instance-data";
import styles from "./ElementInspectionExperience.module.css";

type ElementInspectionExperienceProps = {
  inspectionId: string;
  element: ElementInstanceData;
  backHref: string;
};

const ACTION_TOAST_MESSAGE = "Anotado ✓";
const ACTION_TOAST_DURATION_MS = 2400;

// Orquesta la capa visual nueva (Don José Luis + comparación Bien/Mal +
// progreso en el header) alrededor de la ficha técnica y el checklist
// existentes, sin tocar su lógica: ElementLibraryCard y ElementChecklist
// se reutilizan tal cual.
export function ElementInspectionExperience({ inspectionId, element, backHref }: ElementInspectionExperienceProps) {
  const totalCount = element.checklist.length;
  const initialAnsweredCount = element.checklist.filter((item) => item.observation !== null).length;

  // El progreso -- y por lo tanto si Don José Luis ya "colapsó" a su
  // avatar del header -- se deriva de element.checklist (datos del
  // servidor), no de localStorage: si el usuario abandona la pantalla y
  // vuelve, el estado visual correcto llega ya resuelto en la carga
  // siguiente, sin necesidad de persistencia en el cliente.
  const [answeredCount, setAnsweredCount] = useState(initialAnsweredCount);
  const introCollapsed = answeredCount > 0;

  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showActionToast() {
    setToastVisible(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastVisible(false), ACTION_TOAST_DURATION_MS);
  }

  const firstTip = element.libraryArticle?.quickCheckItems[0] ?? null;
  // Algunos tips ya traen su propia introducción (ej. "Exterior: revisa
  // desde 5 m...") -- anteponerles "Fíjate especialmente en:" produce un
  // doble prefijo. Si el tip ya tiene ":", se usa tal cual, sin el prefijo
  // extra ni forzarlo a minúsculas.
  const tipHasOwnIntro = firstTip?.includes(":") ?? false;
  const introMessage = firstTip
    ? tipHasOwnIntro
      ? `Vamos a revisar ${element.name}. ${firstTip}.`
      : `Vamos a revisar ${element.name}. Fíjate especialmente en: ${firstTip.toLowerCase()}.`
    : `Vamos a revisar ${element.name}. Marca "Está bien" en cada punto, o cuéntame si encuentras un problema.`;

  const examples = element.categorySlug ? goodBadExamplesByCategorySlug[element.categorySlug] : undefined;

  return (
    <>
      <BackHeader
        title={element.name}
        subtitle={`Volver a ${element.roomName}`}
        backHref={backHref}
        sticky
        action={
          <div className={styles.headerAction}>
            {totalCount > 0 && (
              <span className={styles.progressPill}>
                {answeredCount}/{totalCount}
              </span>
            )}
            {introCollapsed && <DonJoseLuisAvatar variant="enseñando" size="sm" />}
          </div>
        }
      />

      {!introCollapsed && <DonJoseLuisCard variant="enseñando" message={introMessage} />}

      <ElementLibraryCard libraryArticle={element.libraryArticle} lacksNormativeBacking={element.lacksNormativeBacking} />

      <GoodBadExamplesSection examples={examples} />

      <ElementChecklist
        inspectionId={inspectionId}
        elementInstanceId={element.id}
        elementName={element.name}
        roomInstanceId={element.roomInstanceId}
        roomName={element.roomName}
        checklist={element.checklist}
        onProgressChange={setAnsweredCount}
        onAction={showActionToast}
      />

      {toastVisible && <DonJoseLuisCard variant="escuchando" message={ACTION_TOAST_MESSAGE} />}
    </>
  );
}
