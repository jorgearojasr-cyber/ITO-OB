import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { LibraryMaterialListItem } from "@/components/biblioteca/LibraryMaterialListItem";
import { InspectionPointList } from "@/components/biblioteca/InspectionPointList";
import { getLibraryElementMaterials } from "@/lib/library/get-library-elements";
import { getLibraryElement } from "@/lib/library/library-elements";
import { getInspectionPoints } from "@/lib/library/inspection-points-data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ elemento: string }>;
};

// Mismo motivo que /biblioteca: sin cookies/sesión de por medio Next.js
// prerenderizaría en build, obligando a Prisma a conectar desde el
// sandbox de build.
export const dynamic = "force-dynamic";

export default async function LibraryElementPage({ params }: PageProps) {
  const { elemento } = await params;
  const element = getLibraryElement(elemento);

  if (!element) {
    notFound();
  }

  if (element.kind === "direct") {
    const points = getInspectionPoints(element.slug);
    if (points.length === 0) {
      notFound();
    }

    return (
      <div className={styles.screen}>
        <div className={styles.content}>
          <BackHeader title={element.name} backHref="/biblioteca" />
          <InspectionPointList points={points} />
        </div>
        <BottomNav active="biblioteca" />
      </div>
    );
  }

  const result = await getLibraryElementMaterials(elemento);
  if (!result) {
    notFound();
  }

  const { materials } = result;

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title={element.name} backHref="/biblioteca" />
        <p className={styles.hint}>Elige el material para ver su ficha de inspección.</p>
        <div className={styles.list}>
          {materials.map((material) => (
            <LibraryMaterialListItem
              key={material.slug}
              label={material.label}
              pointCount={material.pointCount}
              href={material.hasContent ? `/biblioteca/elemento/${element.slug}/${material.slug}` : null}
            />
          ))}
        </div>
      </div>
      <BottomNav active="biblioteca" />
    </div>
  );
}
