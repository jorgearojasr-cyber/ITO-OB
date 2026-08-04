import styles from "./DonJoseLuisAvatar.module.css";

// "enseñando"/"escuchando" nacieron en la Pantalla de Elemento (Sprint 1,
// cerrada -- solo bugfixes). "presente" es neutro: acompañamiento pasivo
// sin enseñar ni confirmar nada, para pantallas como Inicio (Sprint 2a)
// que no encajan en ninguna de las otras dos.
export type DonJoseLuisVariant = "enseñando" | "escuchando" | "presente";

type DonJoseLuisAvatarProps = {
  variant: DonJoseLuisVariant;
  size?: "lg" | "md" | "sm";
};

// Placeholder temporal -- ver Master Character Bible. Un solo lugar para
// swap futuro a la ilustración definitiva (SVG/imagen) sin tocar el
// layout de quien lo usa. `variant` ya está conectado por si cada estado
// termina necesitando una pose distinta más adelante.
const FACE_BY_VARIANT: Record<DonJoseLuisVariant, string> = {
  "enseñando": "🧑‍🔧",
  "escuchando": "🧑‍🔧",
  "presente": "🧑‍🔧",
};

const SIZE_CLASS: Record<NonNullable<DonJoseLuisAvatarProps["size"]>, string | null> = {
  lg: styles.lg,
  md: null,
  sm: styles.sm,
};

export function DonJoseLuisAvatar({ variant, size = "md" }: DonJoseLuisAvatarProps) {
  const sizeClass = SIZE_CLASS[size];
  return (
    <div className={sizeClass ? `${styles.avatar} ${sizeClass}` : styles.avatar} aria-hidden="true">
      <span className={styles.face}>{FACE_BY_VARIANT[variant]}</span>
    </div>
  );
}
