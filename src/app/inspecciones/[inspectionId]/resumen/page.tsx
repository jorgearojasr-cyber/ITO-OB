import Link from "next/link";
import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ShareReportButton } from "@/components/ui/ShareReportButton";
import { ObservationsSummaryList } from "@/components/resumen/ObservationsSummaryList";
import { InspectionSynthesisCard } from "@/components/resumen/InspectionSynthesisCard";
import { CloseInspectionSection } from "@/components/resumen/CloseInspectionSection";
import { InviteCollaboratorSection } from "@/components/resumen/InviteCollaboratorSection";
import { prisma } from "@/lib/db/prisma";
import { getObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import { getInspectionInvitesData } from "@/lib/inspections/get-invite-data";
import { computeInspectionSynthesis, formatSynthesisProgressText } from "@/lib/inspections/synthesis-rules";
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

  // Síntesis "¿Cómo quedó esta vivienda?" (Sprint 4) -- calculada acá,
  // en la page, con el mismo criterio ya usado en Inicio/Bienvenida:
  // el componente de presentación recibe el resultado ya resuelto, sin
  // lógica de negocio propia.
  const byPriority = data.observations.reduce(
    (acc, observation) => {
      if (observation.priority) acc[observation.priority] += 1;
      return acc;
    },
    { ALTA: 0, MEDIA: 0, BAJA: 0 },
  );
  const synthesis = computeInspectionSynthesis({ totalObservations: data.observations.length, byPriority });
  const progressText = formatSynthesisProgressText(data.progress);

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div className={styles.header}>
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
        </div>
        <div className={styles.main}>
          <InspectionSynthesisCard
            tone={synthesis.tone}
            headline={synthesis.headline}
            progressText={progressText}
            byPriority={byPriority}
          />
          <ObservationsSummaryList inspectionId={inspectionId} data={data} />
        </div>
        <div className={styles.context}>
          {inspection.status !== "CLOSED" && canManage && <CloseInspectionSection inspectionId={inspectionId} />}
          {inspection.status === "CLOSED" && isOrgMember && (
            <div className={styles.closedSection}>
              <span className={styles.closedBadge}>✓ Inspección cerrada</span>
              <Link href={`/inspecciones/${inspectionId}/informe`} className={styles.informeCta}>
                <span className={styles.informeCtaIcon}>📄</span>
                <span className={styles.informeCtaBody}>
                  <span className={styles.informeCtaTitle}>Ver el informe firmado</span>
                  <span className={styles.informeCtaDesc}>Documento oficial de cierre, con firmas</span>
                </span>
              </Link>
            </div>
          )}
          {canManage && <InviteCollaboratorSection inspectionId={inspectionId} invites={invites} />}
        </div>
      </div>
      <BottomNav active="inspecciones" responsive />
    </div>
  );
}
