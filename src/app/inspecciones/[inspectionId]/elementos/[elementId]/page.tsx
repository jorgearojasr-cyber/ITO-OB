import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ElementLibraryCard } from "@/components/elemento/ElementLibraryCard";
import { ElementChecklist } from "@/components/elemento/ElementChecklist";
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
        <BackHeader
          title={element.name}
          subtitle={`Volver a ${element.roomName}`}
          backHref={`/inspecciones/${inspectionId}/recintos/${element.roomInstanceId}`}
          sticky
        />
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
          <>
            <ElementLibraryCard libraryArticle={element.libraryArticle} />
            <ElementChecklist
              inspectionId={inspectionId}
              elementInstanceId={element.id}
              elementName={element.name}
              roomInstanceId={element.roomInstanceId}
              roomName={element.roomName}
              checklist={element.checklist}
            />
          </>
        )}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
