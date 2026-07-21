import Link from "next/link";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { EmptyState } from "@/components/ui/EmptyState";
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
          <EmptyState
            className={styles.emptyMargin}
            title="Aún no tienes inspecciones"
            description="Crea la primera para empezar a recorrer tu vivienda."
            action={
              <Link href="/inspecciones/nueva" className={styles.emptyBtn}>
                Crear mi primera inspección
              </Link>
            }
          />
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
