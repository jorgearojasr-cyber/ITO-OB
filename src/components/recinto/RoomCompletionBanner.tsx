import Link from "next/link";
import styles from "./RoomCompletionBanner.module.css";

type RoomCompletionBannerProps = {
  roomName: string;
  inspectionId: string;
  // Ya resuelto por getRoomInstanceData con el algoritmo único de
  // "siguiente pendiente" (ver docs/PRODUCT_DECISIONS.md) -- este
  // componente no decide a dónde ir, solo presenta la sugerencia.
  nextPendingRoom: { id: string; name: string } | null;
};

// Completar un recinto es una transición, no un final (Sprint 3,
// principio 2) -- un único CTA, nunca una elección (principio 7).
export function RoomCompletionBanner({ roomName, inspectionId, nextPendingRoom }: RoomCompletionBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.check} aria-hidden="true">
        ✓
      </div>
      <div className={styles.title}>{roomName} listo</div>
      <p className={styles.desc}>
        {nextPendingRoom
          ? "Sigamos con el siguiente recinto del recorrido."
          : `Recorriste todos los recintos de esta inspección.`}
      </p>
      {nextPendingRoom ? (
        <Link className={styles.cta} href={`/inspecciones/${inspectionId}/recintos/${nextPendingRoom.id}`}>
          Continuar con {nextPendingRoom.name} →
        </Link>
      ) : (
        <Link className={`${styles.cta} ${styles.ctaFinal}`} href={`/inspecciones/${inspectionId}/resumen`}>
          Ir al resumen →
        </Link>
      )}
    </div>
  );
}
