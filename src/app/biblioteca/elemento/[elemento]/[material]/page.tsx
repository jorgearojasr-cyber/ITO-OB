import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { InspectionPointList } from "@/components/biblioteca/InspectionPointList";
import { getLibraryElement } from "@/lib/library/library-elements";
import { getInspectionPoints } from "@/lib/library/inspection-points-data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ elemento: string; material: string }>;
};

export default async function LibraryElementMaterialPage({ params }: PageProps) {
  const { elemento, material } = await params;
  const element = getLibraryElement(elemento);

  if (!element || element.kind !== "materials") {
    notFound();
  }

  const materialEntry = element.materials?.find((entry) => entry.slug === material);
  if (!materialEntry) {
    notFound();
  }

  const points = getInspectionPoints(element.slug, materialEntry.slug);
  if (points.length === 0) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title={materialEntry.label}
          subtitle={`Volver a ${element.name}`}
          backHref={`/biblioteca/elemento/${element.slug}`}
        />
        <InspectionPointList points={points} />
      </div>
      <BottomNav active="biblioteca" />
    </div>
  );
}
