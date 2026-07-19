import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { ElementLibraryCard } from "@/components/elemento/ElementLibraryCard";
import { ChecklistItemRow } from "@/components/elemento/ChecklistItemRow";
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
      <BackHeader
        title={element.name}
        subtitle={element.roomName}
        backHref={`/inspecciones/${inspectionId}/recintos/${element.roomInstanceId}`}
      />
      <ElementLibraryCard libraryArticle={element.libraryArticle} />
      <div className={styles.list}>
        {element.checklist.map((item) => (
          <ChecklistItemRow
            key={item.checklistItemTemplateId}
            inspectionId={inspectionId}
            elementInstanceId={element.id}
            checklistItemTemplateId={item.checklistItemTemplateId}
            question={item.question}
            helpText={item.helpText}
            initialObservation={item.observation}
          />
        ))}
      </div>
    </div>
  );
}
