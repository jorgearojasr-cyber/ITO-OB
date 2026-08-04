"use client";

import { useState, type ReactNode } from "react";
import { ClosingExperience, type ClosingExperienceReport } from "./ClosingExperience";

type InformeCloseGateProps = {
  showInitially: boolean;
  closingProps: {
    inspectionId: string;
    projectName: string;
    unitLabel: string;
    summary: {
      percent: number;
      totalRooms: number;
      totalElements: number;
      doneElements: number;
      totalObservations: number;
    };
    report: ClosingExperienceReport;
  } | null;
  children: ReactNode;
};

// El documento (children) ya llega renderizado desde el Server Component
// de /informe -- este componente solo decide si se muestra o si, en su
// lugar, se muestra la experiencia de cierre (Sprint 5, Etapa 4,
// Escenario 6: mismo /informe de siempre, sin ruta nueva). "dismissed"
// es estado de sesión de esta visita, no persistencia -- si el usuario
// recarga antes de tocar "Ver informe" vuelve a ver el cierre, lo cual es
// correcto: técnicamente no lo dejó atrás todavía.
export function InformeCloseGate({ showInitially, closingProps, children }: InformeCloseGateProps) {
  const [dismissed, setDismissed] = useState(false);

  if (showInitially && closingProps && !dismissed) {
    return <ClosingExperience {...closingProps} onContinue={() => setDismissed(true)} />;
  }

  return <>{children}</>;
}
