import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ObservationsSummaryList } from "@/components/resumen/ObservationsSummaryList";
import { prisma } from "@/lib/db/prisma";
import { getObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import { requireSession } from "@/lib/auth/session";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

// Pantalla independiente de Observaciones (Sprint UX-02, P1b): se llega
// desde /inspecciones (cualquier proyecto, no solo el "activo"), a
// diferencia del bloque de observaciones que ya vive dentro de /resumen.
// Reutiliza los mismos tres bloques que /resumen -- ObservationsSummaryList,
// ObservationLifecycleModal (dentro de cada fila) y
// getObservationsSummaryData -- sin ninguna lógica nueva.
export default async function InspectionObservationsPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, ...inspectionAccessWhere(session.user.id, session.user.organizationId) },
    select: { projectName: true, unitLabel: true },
  });

  if (!inspection) {
    notFound();
  }

  const data = await getObservationsSummaryData(inspectionId);

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Observaciones"
          subtitle={`${inspection.projectName} — ${inspection.unitLabel}`}
          backHref="/inspecciones"
        />
        <ObservationsSummaryList inspectionId={inspectionId} data={data} />
      </div>
      <BottomNav active="inspecciones" responsive />
    </div>
  );
}
