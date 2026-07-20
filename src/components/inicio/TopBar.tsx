import styles from "./TopBar.module.css";

export function TopBar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M4 15L16 5L28 15"
              stroke="#DD7A36"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M7 13V27H25V13"
              stroke="#DD7A36"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M12.5 18.5L15 21.5L20 16"
              stroke="#3FC98A"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <div className={styles.brandText}>
          <span className={styles.name}>ObraBien</span>
          <span className={styles.tag}>Asistente de Recepción</span>
        </div>
      </div>
      <button className={styles.iconBtn} aria-label="Notificaciones" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2.5C7.6 2.5 5.6 4.5 5.6 6.9V9.4C5.6 9.9 5.4 10.4 5.1 10.8L4 12.3C3.5 13 4 14 4.9 14H15.1C16 14 16.5 13 16 12.3L14.9 10.8C14.6 10.4 14.4 9.9 14.4 9.4V6.9C14.4 4.5 12.4 2.5 10 2.5Z"
            stroke="#101828"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 16.2C8.5 16.9 9.2 17.4 10 17.4C10.8 17.4 11.5 16.9 11.8 16.2"
            stroke="#101828"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <span className={styles.dotBadge} />
      </button>
    </div>
  );
}
