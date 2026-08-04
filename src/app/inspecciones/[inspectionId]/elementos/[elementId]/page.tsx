import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ElementInspectionExperience } from "@/components/elemento/ElementInspectionExperience";
import { RoomMaterialQuestion } from "@/components/elemento/RoomMaterialQuestion";
import { ShowerTubQuestion } from "@/components/elemento/ShowerTubQuestion";
import { getElementInstanceData } from "@/lib/inspections/get-element-instance-data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string; elementId: string }>;
};

export default async function ElementInstancePage({ params }: PageProps) {
  const { inspectionId, elementId } = await params;
  const element = await getElementInstanceData(inspectionId, elementId);

  if (!element) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        {(element.materialQuestion || element.showerTubQuestion) && (
          <BackHeader
            title={element.name}
            subtitle={`Volver a ${element.roomName}`}
            backHref={`/inspecciones/${inspectionId}/recintos/${element.roomInstanceId}`}
            sticky
          />
        )}
        {element.materialQuestion ? (
          <RoomMaterialQuestion
            inspectionId={inspectionId}
            roomInstanceId={element.roomInstanceId}
            elementInstanceId={element.id}
            slot={element.materialQuestion.slot}
            options={element.materialQuestion.options}
          />
        ) : element.showerTubQuestion ? (
          <ShowerTubQuestion
            inspectionId={inspectionId}
            roomInstanceId={element.roomInstanceId}
            elementInstanceId={element.id}
          />
        ) : (
          <ElementInspectionExperience
            inspectionId={inspectionId}
            element={element}
            backHref={`/inspecciones/${inspectionId}/recintos/${element.roomInstanceId}`}
          />
        )}
      </div>
      <BottomNav active="inspecciones" responsive />
    </div>
  );
}
