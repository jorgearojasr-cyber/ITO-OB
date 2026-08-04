import { BottomNav } from "@/components/inicio/BottomNav";
import { HeroProgressCard } from "@/components/inicio/HeroProgressCard";
import { LibraryCarousel } from "@/components/inicio/LibraryCarousel";
import { NextStepCard } from "@/components/inicio/NextStepCard";
import { QuickAccessGrid } from "@/components/inicio/QuickAccessGrid";
import { TipOfTheDayCard } from "@/components/inicio/TipOfTheDayCard";
import { TopBar } from "@/components/inicio/TopBar";
import { OnboardingCarousel } from "@/components/onboarding/OnboardingCarousel";
import { getInicioData } from "@/lib/inspections/get-inicio-data";
import { getUnreadNotificationCount } from "@/lib/notifications/get-notifications-data";
import styles from "./page.module.css";

export default async function InicioPage() {
  const [data, unreadCount] = await Promise.all([getInicioData(), getUnreadNotificationCount()]);

  if (!data.hasAnyInspections && !data.hasSeenOnboarding) {
    return <OnboardingCarousel />;
  }

  // Don José Luis solo acompaña cuando hay una inspección real que
  // acompañar (activa o recién terminada) -- en los estados "sin
  // proyectos"/"sin inspección activa" no hay nada que confirmar
  // todavía, así que no se le fuerza un mensaje sin contexto.
  const donJoseLuisMessage = !data.inspection
    ? undefined
    : data.nextStep
      ? "¡Qué bien vas! Sigamos"
      : "¡Lo lograste! Buen trabajo";

  return (
    <div className={styles.screen}>
      <TopBar unreadCount={unreadCount} donJoseLuisMessage={donJoseLuisMessage} />
      <div className={styles.content}>
        <div className={styles.hero}>
          <HeroProgressCard
            inspection={data.inspection}
            progress={data.progress}
            nextStep={data.nextStep}
            hasAnyInspections={data.hasAnyInspections}
          />
        </div>
        <div className={styles.next}>
          <NextStepCard
            inspectionId={data.inspection?.id ?? ""}
            nextStep={data.nextStep}
            hasAnyInspections={data.hasAnyInspections}
            progress={data.progress}
          />
        </div>
        <div className={styles.quick}>
          <QuickAccessGrid inspectionId={data.inspection?.id ?? null} />
        </div>
        <div className={styles.tip}>
          <TipOfTheDayCard />
        </div>
        <div className={styles.library}>
          <LibraryCarousel categories={data.libraryCategories} />
        </div>
        <div className={styles.bottomSpacer} />
      </div>
      <BottomNav active="inicio" responsive />
    </div>
  );
}
