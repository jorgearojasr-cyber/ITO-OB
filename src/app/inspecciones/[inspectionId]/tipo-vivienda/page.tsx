import { notFound, redirect } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { EditPropertyTypeForm } from "@/components/inspecciones/EditPropertyTypeForm";
import { getFeatureFlagsData } from "@/lib/inspections/get-feature-flags-data";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function EditPropertyTypePage({ params }: PageProps) {
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
          title="Tipo de vivienda"
          subtitle="Puede afectar varios recintos a la vez"
          backHref={`/inspecciones/${inspectionId}/editar`}
        />
        <EditPropertyTypeForm inspectionId={inspectionId} currentPropertyType={data.propertyType} />
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
