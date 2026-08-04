import { DonJoseLuisAvatar } from "./DonJoseLuisAvatar";
import styles from "./DonJoseLuisPresence.module.css";

type DonJoseLuisPresenceProps = {
  message: string;
};

// Presencia discreta de Don José Luis en un header, sin ser protagonista:
// un chip de una línea, sin animación de llamado de atención y sin abrir
// nada al tocarlo. Pensado para reutilizarse en el TopBar de cualquier
// pantalla del ecosistema, no solo Inicio -- el mensaje llega siempre
// resuelto por prop, este componente no calcula ni consulta nada.
export function DonJoseLuisPresence({ message }: DonJoseLuisPresenceProps) {
  return (
    <div className={styles.chip}>
      <DonJoseLuisAvatar variant="presente" size="sm" />
      <span className={styles.message}>{message}</span>
    </div>
  );
}
