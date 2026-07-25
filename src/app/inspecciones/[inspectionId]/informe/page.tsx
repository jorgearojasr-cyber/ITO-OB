import { notFound } from "next/navigation";
import { BottomNav } from "@/components/inicio/BottomNav";
import { InformeToolbar } from "@/components/informe/InformeToolbar";
import { InformeCover } from "@/components/informe/InformeCover";
import { InformeSummary } from "@/components/informe/InformeSummary";
import { InformeRoomSection } from "@/components/informe/InformeRoomSection";
import { InformeSignatures } from "@/components/informe/InformeSignatures";
import { getInformeData, hydrateInformeSnapshot } from "@/lib/inspections/get-informe-data";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import styles from "./page.module.css";
import "./print.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

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
          signatureOwnerUrl: true,
          signatureBuilderUrl: true,
          signedAt: true,
          generatedAt: true,
          snapshot: true,
        },
      },
    },
  });
  if (!inspection) {
    notFound();
  }

  // Antes de cerrar la inspección, /informe es una previsualización en
  // vivo. Una vez cerrada, se congela: siempre lee del snapshot guardado
  // al momento del cierre, para que ediciones futuras al catálogo maestro
  // no alteren un informe ya firmado.
  const isClosed = inspection.status === "CLOSED" && inspection.report !== null;
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
            inspection.report
              ? { status: inspection.report.status, pdfStorageKey: inspection.report.pdfStorageKey }
              : null
          }
        />
        <div className={styles.paper}>
          <InformeCover
            inspection={data.inspection}
            percent={data.summary.percent}
            generatedAt={isClosed ? inspection.report!.generatedAt : undefined}
          />
          <InformeSummary summary={data.summary} />
          <div className={styles.sectionTitle}>Recorrido por recinto</div>
          {data.rooms.map((room) => (
            <InformeRoomSection key={room.id} room={room} />
          ))}
          {isClosed && (
            <InformeSignatures
              signatureOwnerUrl={inspection.report!.signatureOwnerUrl}
              signatureBuilderUrl={inspection.report!.signatureBuilderUrl}
              signedAt={inspection.report!.signedAt}
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
