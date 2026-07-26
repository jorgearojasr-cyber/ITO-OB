import { notFound, redirect } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { EditDistributionForm } from "@/components/inspecciones/EditDistributionForm";
import { getRoomDistributionData } from "@/lib/inspections/get-room-distribution-data";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function EditDistributionPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();
  if (!canManageInspection(session.user.role)) {
    redirect(`/inspecciones/${inspectionId}/editar`);
  }

  const data = await getRoomDistributionData(inspectionId);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Editar distribución"
          subtitle="N° de dormitorios y baños"
          backHref={`/inspecciones/${inspectionId}/recintos`}
        />
        <EditDistributionForm inspectionId={inspectionId} data={data} />
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
