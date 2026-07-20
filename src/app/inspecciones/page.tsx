import Link from "next/link";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { InspectionListItem } from "@/components/inspecciones/InspectionListItem";
import { getInspectionsListData } from "@/lib/inspections/get-inspections-list-data";
import styles from "./page.module.css";

export default async function InspectionsListPage() {
  const inspections = await getInspectionsListData();

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title="Inspecciones"
          backHref="/"
          action={
            <Link href="/inspecciones/nueva" className={styles.newLink}>
              + Nueva
            </Link>
          }
        />
        {inspections.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Aún no tienes inspecciones</div>
            <div className={styles.emptyDesc}>Crea la primera para empezar a recorrer tu vivienda.</div>
            <Link href="/inspecciones/nueva" className={styles.emptyBtn}>
              Crear mi primera inspección
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {inspections.map((inspection) => (
              <InspectionListItem key={inspection.id} inspection={inspection} />
            ))}
          </div>
        )}
      </div>
      <BottomNav active="inspecciones" />
    </div>
  );
}
