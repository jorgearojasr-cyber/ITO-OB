import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { ObservationsSummaryList } from "@/components/resumen/ObservationsSummaryList";
import { prisma } from "@/lib/db/prisma";
import { getObservationsSummaryData } from "@/lib/inspections/get-observations-summary-data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function ObservationsSummaryPage({ params }: PageProps) {
  const { inspectionId } = await params;

  const inspection = await prisma.inspection.findUnique({
    where: { id: inspectionId },
    select: { projectName: true, unitLabel: true },
  });

  if (!inspection) {
    notFound();
  }

  const data = await getObservationsSummaryData(inspectionId);

  return (
    <div className={styles.screen}>
      <BackHeader
        title="Resumen de observaciones"
        subtitle={`${inspection.projectName} — ${inspection.unitLabel}`}
        backHref="/"
      />
      <ObservationsSummaryList inspectionId={inspectionId} data={data} />
    </div>
  );
}
