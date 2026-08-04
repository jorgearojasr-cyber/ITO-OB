import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { RoomProgressBar } from "@/components/recinto/RoomProgressBar";
import { ElementListItem } from "@/components/recinto/ElementListItem";
import { RoomCompletionBanner } from "@/components/recinto/RoomCompletionBanner";
import { RoomListRow } from "@/components/recinto/RoomListRow";
import { getRoomInstanceData } from "@/lib/inspections/get-room-instance-data";
import { getRoomsListData } from "@/lib/inspections/get-rooms-list-data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string; roomId: string }>;
};

export default async function RoomInstancePage({ params }: PageProps) {
  const { inspectionId, roomId } = await params;
  // getRoomsListData solo alimenta el índice de recintos del patrón
  // P3 (maestro-detalle, D1 §10/§11) visible desde 1024px -- en móvil
  // no se renderiza, pero se pide igual para no bifurcar la página en
  // dos variantes de datos según ancho de pantalla.
  const [room, rooms] = await Promise.all([
    getRoomInstanceData(inspectionId, roomId),
    getRoomsListData(inspectionId),
  ]);

  if (!room) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.layout}>
        {rooms && (
          <aside className={styles.roomIndex} aria-label="Todos los recintos">
            {rooms.map((item) => (
              <RoomListRow
                key={item.id}
                name={item.name}
                done={item.done}
                total={item.total}
                percent={item.percent}
                href={`/inspecciones/${inspectionId}/recintos/${item.id}`}
                isCurrent={item.id === roomId}
              />
            ))}
          </aside>
        )}
        <div className={styles.content}>
          <BackHeader
            title={room.name}
            subtitle={`${room.projectName} — ${room.unitLabel}`}
            backHref={`/inspecciones/${inspectionId}/recintos`}
            action={
              <span className={styles.positionPill}>
                Recinto {room.position} de {room.totalRooms}
              </span>
            }
          />
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
          {room.progress.total > 0 && room.progress.percent === 100 && (
            <RoomCompletionBanner roomName={room.name} inspectionId={inspectionId} nextPendingRoom={room.nextPendingRoom} />
          )}
        </div>
      </div>
      <BottomNav active="inspecciones" responsive />
    </div>
  );
}
