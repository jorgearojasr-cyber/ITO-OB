import { BackHeader } from "@/components/ui/BackHeader";
import { NuevaInspeccionForm } from "@/components/inspecciones/NuevaInspeccionForm";
import styles from "./page.module.css";

export default function NuevaInspeccionPage() {
  return (
    <div className={styles.screen}>
      <BackHeader title="Nueva inspección" backHref="/" />
      <NuevaInspeccionForm />
    </div>
  );
}
