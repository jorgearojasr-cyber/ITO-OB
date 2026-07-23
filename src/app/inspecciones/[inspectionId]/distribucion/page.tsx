import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { EditDistributionForm } from "@/components/inspecciones/EditDistributionForm";
import { getRoomDistributionData } from "@/lib/inspections/get-room-distribution-data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function EditDistributionPage({ params }: PageProps) {
  const { inspectionId } = await params;
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
