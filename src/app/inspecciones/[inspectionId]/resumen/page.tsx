import Link from "next/link";
import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ShareReportButton } from "@/components/ui/ShareReportButton";
import { ObservationsSummaryList } from "@/components/resumen/ObservationsSummaryList";
import { CloseInspectionSection } from "@/components/resumen/CloseInspectionSection";
import { prisma } from "@/lib/db/prisma";
import { getObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import { requireSession } from "@/lib/auth/session";
import styles from "./page.module.css";

// La generación real del PDF (Puppeteer + Chromium headless) puede tardar
// más que el límite por defecto — closeInspection hereda este maxDuration.
// 60s es el techo estándar del plan Vercel Hobby (confirmado en este
// proyecto); si el volumen de fotos por informe resulta insuficiente,
// hay que evaluar Fluid Compute o acotar fotos/resolución en el PDF.
export const maxDuration = 60;

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function ObservationsSummaryPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: { projectName: true, unitLabel: true, status: true },
  });

  if (!inspection) {
    notFound();
  }

  const data = await getObservationsSummaryData(inspectionId);

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Resumen de observaciones"
          subtitle={`${inspection.projectName} — ${inspection.unitLabel}`}
          backHref="/"
          action={
            <div className={styles.actions}>
              <Link href={`/inspecciones/${inspectionId}/informe`} className={styles.informeLink}>
                Ver informe
              </Link>
              <ShareReportButton
                url={`/inspecciones/${inspectionId}/informe`}
                title="Informe de recepción"
                text={`Informe de recepción - ${inspection.projectName} — ${inspection.unitLabel}`}
              />
            </div>
          }
        />
        <ObservationsSummaryList inspectionId={inspectionId} data={data} />
        {inspection.status !== "CLOSED" && <CloseInspectionSection inspectionId={inspectionId} />}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
