import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { EmptyState } from "@/components/ui/EmptyState";
import { RoomListRow } from "@/components/recinto/RoomListRow";
import { prisma } from "@/lib/db/prisma";
import { getRoomsListData } from "@/lib/inspections/get-rooms-list-data";
import { requireSession } from "@/lib/auth/session";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function RoomsListPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: { projectName: true, unitLabel: true },
  });

  if (!inspection) {
    notFound();
  }

  const rooms = await getRoomsListData(inspectionId);
  if (!rooms) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Recintos"
          subtitle={`${inspection.projectName} — ${inspection.unitLabel}`}
          backHref="/"
        />
        {rooms.length === 0 ? (
          <EmptyState
            className={styles.emptyMargin}
            title="Aún no hay recintos"
            description="Los recintos de esta inspección van a aparecer acá."
          />
        ) : (
          <div className={styles.list}>
            {rooms.map((room) => (
              <RoomListRow
                key={room.id}
                name={room.name}
                done={room.done}
                total={room.total}
                percent={room.percent}
                href={`/inspecciones/${inspectionId}/recintos/${room.id}`}
              />
            ))}
          </div>
        )}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
