"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markOnboardingSeen } from "@/lib/auth/actions";
import styles from "./OnboardingCarousel.module.css";

const STEPS = [
  {
    eyebrow: "Bienvenido",
    title: "Bienvenido a ObraBien Inspección",
    body: "Registra la recepción de tu vivienda nueva: recorre cada recinto, revisa cada elemento y deja registro con fotos, prioridades y respaldo del Manual de Tolerancias CDT.",
    miniSteps: undefined as { label: string; desc: string }[] | undefined,
  },
  {
    eyebrow: "Cómo funciona",
    title: "Recorre en 3 pasos",
    body: "",
    miniSteps: [
      { label: "Recintos", desc: "Elige el recinto que estás revisando." },
      { label: "Elementos", desc: "Repasa cada elemento de ese recinto." },
      { label: "Observaciones", desc: "Marca ✔ u ⚠ — con foto y prioridad si hay un problema." },
    ],
  },
  {
    eyebrow: "Todo listo",
    title: "Empecemos",
    body: "Crea tu primera inspección y arranca el recorrido guiado, recinto por recinto.",
    miniSteps: undefined,
  },
];

export function OnboardingCarousel() {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const touchStartX = useRef(0);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  function goNext() {
    if (!isLast) setStep((current) => current + 1);
  }

  function goPrev() {
    if (step > 0) setStep((current) => current - 1);
  }

  function finish(destination: string) {
    startTransition(async () => {
      await markOnboardingSeen();
      router.push(destination);
    });
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext();
      else goPrev();
    }
  }

  return (
    <div className={styles.screen} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={styles.topRow}>
        <div className={styles.dots}>
          {STEPS.map((_, index) => (
            <span key={index} className={index === step ? `${styles.dot} ${styles.dotOn}` : styles.dot} />
          ))}
        </div>
        <button type="button" className={styles.skipBtn} onClick={() => finish("/")} disabled={isPending}>
          Saltar
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>{current.eyebrow}</div>
        <div className={styles.title}>{current.title}</div>
        {current.body && <p className={styles.body}>{current.body}</p>}
        {current.miniSteps && (
          <div className={styles.miniSteps}>
            {current.miniSteps.map((miniStep, index) => (
              <div key={miniStep.label} className={styles.miniStep}>
                <span className={styles.miniStepNumber}>{index + 1}</span>
                <div>
                  <div className={styles.miniStepLabel}>{miniStep.label}</div>
                  <div className={styles.miniStepDesc}>{miniStep.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.nav}>
        {step > 0 && (
          <button type="button" className={styles.backBtn} onClick={goPrev} disabled={isPending}>
            Atrás
          </button>
        )}
        {isLast ? (
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => finish("/inspecciones/nueva")}
            disabled={isPending}
          >
            Comenzar mi primera inspección
          </button>
        ) : (
          <button type="button" className={styles.primaryBtn} onClick={goNext} disabled={isPending}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
