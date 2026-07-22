import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ToolCard } from "@/components/kit/ToolCard";
import { getInspectionKitData, GENERAL_TOOLS } from "@/lib/library/inspection-kit";
import { requireSession } from "@/lib/auth/session";
import styles from "./page.module.css";

export default async function InspectionKitPage() {
  await requireSession();
  const tools = await getInspectionKitData();

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title="Kit de inspección" subtitle="Qué llevar a terreno" backHref="/" />

        <div className={styles.sectionTitle}>Según el manual de tolerancias</div>
        <div className={styles.list}>
          {tools.map((tool) => (
            <ToolCard key={tool.id} id={tool.id} label={tool.label} categories={tool.categories} />
          ))}
        </div>

        <div className={styles.sectionTitle}>Herramientas generales</div>
        <div className={styles.list}>
          {GENERAL_TOOLS.map((tool) => (
            <ToolCard key={tool.id} id={tool.id} label={tool.label} description={tool.description} />
          ))}
        </div>
      </div>
      <BottomNav active="biblioteca" />
    </div>
  );
}
