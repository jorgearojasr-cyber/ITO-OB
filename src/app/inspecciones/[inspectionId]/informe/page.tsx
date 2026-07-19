import { notFound } from "next/navigation";
import { InformeToolbar } from "@/components/informe/InformeToolbar";
import { InformeCover } from "@/components/informe/InformeCover";
import { InformeSummary } from "@/components/informe/InformeSummary";
import { InformeRoomSection } from "@/components/informe/InformeRoomSection";
import { getInformeData } from "@/lib/inspections/get-informe-data";
import styles from "./page.module.css";
import "./print.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function InformePage({ params }: PageProps) {
  const { inspectionId } = await params;
  const data = await getInformeData(inspectionId);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.wrap}>
      <InformeToolbar
        title="Informe final"
        subtitle={`${data.inspection.projectName} — ${data.inspection.unitLabel}`}
        backHref={`/inspecciones/${inspectionId}/resumen`}
        shareUrl={`/inspecciones/${inspectionId}/informe`}
        shareText={`Informe de recepción - ${data.inspection.projectName} — ${data.inspection.unitLabel}`}
      />
      <div className={styles.paper}>
        <InformeCover inspection={data.inspection} percent={data.summary.percent} />
        <InformeSummary summary={data.summary} />
        <div className={styles.sectionTitle}>Recorrido por recinto</div>
        {data.rooms.map((room) => (
          <InformeRoomSection key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
