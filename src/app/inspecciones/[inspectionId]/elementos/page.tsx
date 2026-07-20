import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ElementListRow } from "@/components/elementos/ElementListRow";
import { prisma } from "@/lib/db/prisma";
import { getElementsListData } from "@/lib/inspections/get-elements-list-data";
import { requireSession } from "@/lib/auth/session";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function ElementsListPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: { projectName: true, unitLabel: true },
  });

  if (!inspection) {
    notFound();
  }

  const elements = await getElementsListData(inspectionId);

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Elementos"
          subtitle={`${inspection.projectName} — ${inspection.unitLabel}`}
          backHref="/"
        />
        {elements.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Aún no hay elementos</div>
            <div className={styles.emptyDesc}>
              Los elementos de cada recinto van a aparecer acá a medida que avances en el recorrido.
            </div>
          </div>
        ) : (
          <div className={styles.list}>
            {elements.map((element) => (
              <ElementListRow key={element.id} inspectionId={inspectionId} element={element} />
            ))}
          </div>
        )}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
