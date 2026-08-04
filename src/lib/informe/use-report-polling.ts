"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReportStatus } from "@prisma/client";

// Compartido entre InformeToolbar y ClosingExperience -- mismo mecanismo
// de polling y mismo umbral de "esto se está demorando" en un solo lugar,
// para no repetir la constante en dos componentes por separado (Sprint 5,
// Etapa 4, Escenario 2: el pill de cierre nunca debe adelantarse al
// estado real del Report, siempre lo lee del servidor).
export const SLOW_GENERATION_WARNING_MS = 90_000;

// Sin cola/cron en el proyecto: la reconciliación real ocurre en el
// servidor (ver informe/page.tsx) la próxima vez que esta pantalla se
// recarga -- este hook solo dispara esa recarga cada 3s y avisa cuando
// la espera ya se está demorando; no decide por su cuenta que el informe
// está listo.
export function useReportPolling(status: ReportStatus | undefined) {
  const router = useRouter();
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (status !== "PENDING") return;
    const interval = setInterval(() => router.refresh(), 3000);
    const slowTimer = setTimeout(() => setIsSlow(true), SLOW_GENERATION_WARNING_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(slowTimer);
    };
  }, [status, router]);

  // Expuesto para que quien reintenta (evento de click, no un efecto)
  // pueda limpiar el aviso de "esto se está demorando" del intento
  // anterior antes de que el nuevo período PENDING arranque de cero.
  function resetSlow() {
    setIsSlow(false);
  }

  return { isSlow, resetSlow };
}
