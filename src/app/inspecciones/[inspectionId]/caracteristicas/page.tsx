import { notFound, redirect } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { EditFeaturesForm } from "@/components/inspecciones/EditFeaturesForm";
import { getFeatureFlagsData } from "@/lib/inspections/get-feature-flags-data";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function EditFeaturesPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();
  if (!canManageInspection(session.user.role)) {
    redirect(`/inspecciones/${inspectionId}/editar`);
  }

  const data = await getFeatureFlagsData(inspectionId);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Características de la propiedad"
          subtitle={data.propertyType === "CASA" ? "Casa" : "Departamento"}
          backHref={`/inspecciones/${inspectionId}/editar`}
        />
        <EditFeaturesForm inspectionId={inspectionId} data={data} />
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
