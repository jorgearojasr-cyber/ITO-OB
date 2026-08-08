import { notFound } from "next/navigation";
import Link from "next/link";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function EditInspectionHubPage({ params }: PageProps) {
  const { inspectionId } = await params;
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: { id: true, coverPhotoUrl: true },
  });
  if (!inspection) {
    notFound();
  }

  const canManage = canManageInspection(session.user.role);

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Editar inspección"
          backHref={`/inspecciones/${inspectionId}/recintos`}
        />
        <div className={styles.list}>
          {canManage && (
            <>
              <Link href={`/inspecciones/${inspectionId}/editar/foto`} className={styles.row}>
                <div className={styles.rowTitle}>Fotografía principal</div>
                <div className={styles.rowDesc}>
                  {inspection.coverPhotoUrl ? "Reemplazar o eliminar la foto de portada" : "Agregar una foto de portada del proyecto"}
                </div>
              </Link>
              <Link href={`/inspecciones/${inspectionId}/distribucion`} className={styles.row}>
                <div className={styles.rowTitle}>Distribución</div>
                <div className={styles.rowDesc}>N° de dormitorios y baños</div>
              </Link>
              <Link href={`/inspecciones/${inspectionId}/caracteristicas`} className={styles.row}>
                <div className={styles.rowTitle}>Características de la propiedad</div>
                <div className={styles.rowDesc}>Patio, bodega, estacionamiento, portón, etc.</div>
              </Link>
              <Link href={`/inspecciones/${inspectionId}/tipo-vivienda`} className={styles.row}>
                <div className={styles.rowTitle}>Tipo de vivienda</div>
                <div className={styles.rowDesc}>Casa / Departamento — puede afectar varios recintos a la vez</div>
              </Link>
            </>
          )}
        </div>
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
