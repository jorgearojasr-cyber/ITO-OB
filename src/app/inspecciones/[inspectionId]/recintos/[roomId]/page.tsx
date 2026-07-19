import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { RoomProgressBar } from "@/components/recinto/RoomProgressBar";
import { ElementListItem } from "@/components/recinto/ElementListItem";
import { getRoomInstanceData } from "@/lib/inspections/get-room-instance-data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string; roomId: string }>;
};

export default async function RoomInstancePage({ params }: PageProps) {
  const { inspectionId, roomId } = await params;
  const room = await getRoomInstanceData(inspectionId, roomId);

  if (!room) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <BackHeader title={room.name} backHref="/" />
      <RoomProgressBar {...room.progress} />
      <div className={styles.list}>
        {room.elements.map((element) => (
          <ElementListItem
            key={element.id}
            id={element.id}
            name={element.name}
            status={element.status}
            elementTemplateSlug={element.elementTemplateSlug}
            href={`/inspecciones/${inspectionId}/elementos/${element.id}`}
          />
        ))}
      </div>
    </div>
  );
}
