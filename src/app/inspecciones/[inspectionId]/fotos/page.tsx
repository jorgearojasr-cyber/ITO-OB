import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { PhotoListItem } from "@/components/fotos/PhotoListItem";
import { prisma } from "@/lib/db/prisma";
import { getInspectionPhotosData } from "@/lib/inspections/get-inspection-photos-data";
import { requireSession } from "@/lib/auth/session";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function InspectionPhotosPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: { projectName: true, unitLabel: true },
  });

  if (!inspection) {
    notFound();
  }

  const photos = await getInspectionPhotosData(inspectionId);

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Mis fotos"
          subtitle={`${inspection.projectName} — ${inspection.unitLabel}`}
          backHref="/"
        />
        {photos.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Aún no hay fotos</div>
            <div className={styles.emptyDesc}>
              Las fotos que agregues al revisar cada elemento van a aparecer acá.
            </div>
          </div>
        ) : (
          <div className={styles.list}>
            {photos.map((photo) => (
              <PhotoListItem key={photo.id} inspectionId={inspectionId} photo={photo} />
            ))}
          </div>
        )}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
