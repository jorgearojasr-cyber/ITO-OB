import Link from "next/link";
import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ShareReportButton } from "@/components/ui/ShareReportButton";
import { ObservationsSummaryList } from "@/components/resumen/ObservationsSummaryList";
import { CloseInspectionSection } from "@/components/resumen/CloseInspectionSection";
import { InviteCollaboratorSection } from "@/components/resumen/InviteCollaboratorSection";
import { prisma } from "@/lib/db/prisma";
import { getObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import { getInspectionInvitesData } from "@/lib/inspections/get-invite-data";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";
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
    where: { id: inspectionId, ...inspectionAccessWhere(session.user.id, session.user.organizationId) },
    select: { organizationId: true, projectName: true, unitLabel: true, status: true },
  });

  if (!inspection) {
    notFound();
  }

  // canManageInspection solo mira el rol de ESTA sesión — un colaborador
  // externo puede ser PROPIETARIO en su propia organización, así que sin
  // el chequeo de organizationId igual vería acciones que no le
  // corresponden en una inspección ajena a la que solo colabora.
  const isOrgMember = inspection.organizationId === session.user.organizationId;
  const canManage = isOrgMember && canManageInspection(session.user.role);

  const data = await getObservationsSummaryData(inspectionId);
  const invites = canManage ? await getInspectionInvitesData(inspectionId) : [];

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Resumen de observaciones"
          subtitle={`${inspection.projectName} — ${inspection.unitLabel}`}
          backHref="/"
          action={
            isOrgMember ? (
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
            ) : undefined
          }
        />
        <ObservationsSummaryList inspectionId={inspectionId} data={data} />
        {inspection.status !== "CLOSED" && canManage && <CloseInspectionSection inspectionId={inspectionId} />}
        {canManage && <InviteCollaboratorSection inspectionId={inspectionId} invites={invites} />}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
