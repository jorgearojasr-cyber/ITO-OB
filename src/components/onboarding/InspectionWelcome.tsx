import Link from "next/link";
import { DonJoseLuisAvatar } from "@/components/ui/DonJoseLuisAvatar";
import styles from "./InspectionWelcome.module.css";

type InspectionWelcomeProps = {
  userName: string;
  projectName: string;
  unitLabel: string;
  continueHref: string;
};

// Un respiro antes de comenzar, no un paso funcional del flujo de
// creación (Sprint 2b, Etapa 2, principio 7). Un único camino hacia
// adelante -- sin botón de saltar, a diferencia de OnboardingCarousel,
// que sigue siendo el único que "enseña a usar" la app (principio 6).
// Se muestra una sola vez, alcanzable solo desde el redirect de
// createInspection -- su "no repetición" es un efecto de la
// navegación, no de una bandera guardada (principio 5).
export function InspectionWelcome({ userName, projectName, unitLabel, continueHref }: InspectionWelcomeProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.center}>
        <DonJoseLuisAvatar variant="presente" size="lg" />
        <p className={styles.greeting}>
          Hola, {userName}.
          <br />
          Hoy comenzaremos la inspección de tu vivienda.
        </p>
        <p className={styles.promise}>No necesitas saber de construcción — yo te voy a guiar, paso a paso.</p>
        <span className={styles.context}>
          {projectName} — {unitLabel}
        </span>
      </div>
      <div className={styles.bottom}>
        <p className={styles.trust}>✓ Tu inspección quedará registrada paso a paso</p>
        <Link className={styles.cta} href={continueHref}>
          Comenzar inspección
        </Link>
      </div>
    </div>
  );
}
