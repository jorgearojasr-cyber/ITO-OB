import { BottomNav } from "@/components/inicio/BottomNav";
import { HeroProgressCard } from "@/components/inicio/HeroProgressCard";
import { LibraryCarousel } from "@/components/inicio/LibraryCarousel";
import { NextStepCard } from "@/components/inicio/NextStepCard";
import { QuickAccessGrid } from "@/components/inicio/QuickAccessGrid";
import { TipOfTheDayCard } from "@/components/inicio/TipOfTheDayCard";
import { TopBar } from "@/components/inicio/TopBar";
import { getInicioData } from "@/lib/inspections/get-inicio-data";
import styles from "./page.module.css";

export default async function InicioPage() {
  const data = await getInicioData();

  return (
    <div className={styles.screen}>
      <TopBar />
      <div className={styles.content}>
        <HeroProgressCard inspection={data.inspection} progress={data.progress} />
        <NextStepCard inspectionId={data.inspection?.id ?? ""} nextStep={data.nextStep} />
        <QuickAccessGrid inspectionId={data.inspection?.id ?? null} />
        <TipOfTheDayCard />
        <LibraryCarousel categories={data.libraryCategories} />
        <div className={styles.bottomSpacer} />
      </div>
      <BottomNav />
    </div>
  );
}
