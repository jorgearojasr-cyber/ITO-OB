import { notFound } from "next/navigation";
import { BottomNav } from "@/components/inicio/BottomNav";
import { InformeToolbar } from "@/components/informe/InformeToolbar";
import { InformeCover } from "@/components/informe/InformeCover";
import { InformeSummary } from "@/components/informe/InformeSummary";
import { InformeRoomSection } from "@/components/informe/InformeRoomSection";
import { InformeSignatures } from "@/components/informe/InformeSignatures";
import { getInformeData, hydrateInformeSnapshot } from "@/lib/inspections/get-informe-data";
import { MAX_REPORT_RETRIES, REPORT_RETRY_COUNT_RESET_MS } from "@/lib/inspections/report-retry-config";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import styles from "./page.module.css";
import "./print.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

// Sin cola/cron en el proyecto: after() es "mejor esfuerzo" y un Report
// puede quedar en PENDING para siempre si el proceso serverless se
// recicla a mitad de camino. Esta pantalla ya se vuelve a consultar cada
// 3s mientras está PENDING (ver InformeToolbar) — se aprovecha ese mismo
// latido para reconciliar perezosamente: si pasó demasiado tiempo desde
// el último intento, se marca FAILED acá mismo, sin cron externo.
const STALE_PENDING_THRESHOLD_MS = 90_000;

function isReportStale(lastAttemptAt: Date): boolean {
  return Date.now() - lastAttemptAt.getTime() > STALE_PENDING_THRESHOLD_MS;
}

// Mismo criterio que retryReportGeneration (actions.ts): si se agotaron
// los reintentos hace más de una hora, el servidor los va a resetear al
// primer intento nuevo — la UI refleja eso para no mostrar un mensaje
// terminal cuando en realidad todavía se puede reintentar.
function isRetryExhausted(retryCount: number, lastAttemptAt: Date): boolean {
  return retryCount >= MAX_REPORT_RETRIES && Date.now() - lastAttemptAt.getTime() <= REPORT_RETRY_COUNT_RESET_MS;
}

export default async function InformePage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: {
      status: true,
      report: {
        select: {
          status: true,
          pdfStorageKey: true,
          errorMessage: true,
          signatureOwnerUrl: true,
          signatureBuilderUrl: true,
          signedAt: true,
          generatedAt: true,
          lastAttemptAt: true,
          retryCount: true,
          snapshot: true,
        },
      },
    },
  });
  if (!inspection) {
    notFound();
  }

  let report = inspection.report;
  if (report?.status === "PENDING" && isReportStale(report.lastAttemptAt)) {
    const errorMessage = "Se agotó el tiempo de espera al generar el informe.";
    await prisma.report.update({ where: { inspectionId }, data: { status: "FAILED", errorMessage } });
    report = { ...report, status: "FAILED", errorMessage };
  }

  // Antes de cerrar la inspección, /informe es una previsualización en
  // vivo. Una vez cerrada, se congela: siempre lee del snapshot guardado
  // al momento del cierre, para que ediciones futuras al catálogo maestro
  // no alteren un informe ya firmado.
  const isClosed = inspection.status === "CLOSED" && report !== null;
  const data = isClosed ? hydrateInformeSnapshot(inspection.report!.snapshot) : await getInformeData(inspectionId);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.wrap}>
        <InformeToolbar
          title="Informe final"
          subtitle={`${data.inspection.projectName} — ${data.inspection.unitLabel}`}
          backHref={`/inspecciones/${inspectionId}/resumen`}
          shareUrl={`/inspecciones/${inspectionId}/informe`}
          shareText={`Informe de recepción - ${data.inspection.projectName} — ${data.inspection.unitLabel}`}
          inspectionId={inspectionId}
          report={
            report
              ? {
                  status: report.status,
                  pdfStorageKey: report.pdfStorageKey,
                  errorMessage: report.errorMessage,
                  isRetryExhausted: isRetryExhausted(report.retryCount, report.lastAttemptAt),
                }
              : null
          }
        />
        <div className={styles.paper}>
          <InformeCover
            inspection={data.inspection}
            percent={data.summary.percent}
            generatedAt={isClosed ? report!.generatedAt : undefined}
          />
          <InformeSummary summary={data.summary} />
          <div className={styles.sectionTitle}>Recorrido por recinto</div>
          {data.rooms.map((room) => (
            <InformeRoomSection key={room.id} room={room} />
          ))}
          {isClosed && (
            <InformeSignatures
              signatureOwnerUrl={report!.signatureOwnerUrl}
              signatureBuilderUrl={report!.signatureBuilderUrl}
              signedAt={report!.signedAt}
            />
          )}
        </div>
      </div>
      <div className="no-print">
        <BottomNav active="inspecciones" />
      </div>
    </div>
  );
}
