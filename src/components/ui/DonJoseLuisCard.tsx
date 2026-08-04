import { DonJoseLuisAvatar, type DonJoseLuisVariant } from "./DonJoseLuisAvatar";
import styles from "./DonJoseLuisCard.module.css";

type DonJoseLuisCardProps = {
  variant: DonJoseLuisVariant;
  message: string;
};

// Un solo componente para las 2 variantes de la V1 ("enseñando" en la
// entrada al elemento, "escuchando" como confirmación breve tras una
// acción). Estructurado para que sumar variantes futuras (Resumiendo,
// Celebrando) sea agregar una entrada más, no rediseñar el layout.
export function DonJoseLuisCard({ variant, message }: DonJoseLuisCardProps) {
  if (variant === "escuchando") {
    return (
      <div className={styles.toast} role="status">
        <DonJoseLuisAvatar variant={variant} size="sm" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <DonJoseLuisAvatar variant={variant} />
      <div>
        <div className={styles.name}>Don José Luis</div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
