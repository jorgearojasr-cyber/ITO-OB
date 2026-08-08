import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { CoverPhotoManager } from "@/components/inspecciones/CoverPhotoManager";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditCoverPhotoPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, ...inspectionAccessWhere(session.user.id, session.user.organizationId) },
    select: { coverPhotoUrl: true },
  });
  if (!inspection || !canManageInspection(session.user.role)) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Fotografía principal"
          subtitle="Foto de portada del proyecto"
          backHref={`/inspecciones/${inspectionId}/editar`}
        />
        <CoverPhotoManager inspectionId={inspectionId} initialUrl={inspection.coverPhotoUrl} />
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
