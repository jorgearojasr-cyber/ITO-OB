import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { PhotoListItem } from "@/components/fotos/PhotoListItem";
import { ProjectFilterChips } from "@/components/fotos/ProjectFilterChips";
import { getInspectionPhotosData } from "@/lib/inspections/get-inspection-photos-data";
import { getInspectionOptions } from "@/lib/inspections/get-inspection-options";
import styles from "./page.module.css";

type PageProps = {
  searchParams: Promise<{ inspeccion?: string }>;
};

export default async function AllPhotosPage({ searchParams }: PageProps) {
  const { inspeccion } = await searchParams;

  const [photos, options] = await Promise.all([
    getInspectionPhotosData(inspeccion),
    getInspectionOptions(),
  ]);

  const showProject = !inspeccion && options.length > 1;

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title="Mis fotos" backHref="/" />
        <ProjectFilterChips options={options} selectedInspectionId={inspeccion} />
        {photos.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Aún no hay fotos</div>
            <div className={styles.emptyDesc}>
              Las fotos que agregues al revisar cada elemento van a aparecer acá.
            </div>
          </div>
        ) : (
          <div className={styles.list}>
            {photos.map((photo) => (
              <PhotoListItem key={photo.id} photo={photo} showProject={showProject} />
            ))}
          </div>
        )}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
