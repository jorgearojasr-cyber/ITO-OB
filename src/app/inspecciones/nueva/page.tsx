import { BackHeader } from "@/components/ui/BackHeader";
import { NuevaInspeccionForm } from "@/components/inspecciones/NuevaInspeccionForm";
import { getInspectionOptions, toDistinctProjects } from "@/lib/inspections/get-inspection-options";
import styles from "./page.module.css";

export default async function NuevaInspeccionPage() {
  const options = await getInspectionOptions();
  const existingProjects = toDistinctProjects(options);

  return (
    <div className={styles.screen}>
      <BackHeader title="Nueva inspección" backHref="/" />
      <NuevaInspeccionForm existingProjects={existingProjects} />
    </div>
  );
}
