import Link from "next/link";
import styles from "./BottomNav.module.css";

export function BottomNav() {
  return (
    <div className={styles.bottomnav}>
      <button className={`${styles.navItem} ${styles.navItemActive}`} type="button">
        <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
          <path d="M3 9L10 3L17 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 8V16.5H15V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Inicio</span>
      </button>
      <button className={styles.navItem} type="button">
        <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
          <rect x="4.5" y="3.5" width="11" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 3V2.5C7.5 2.2 7.7 2 8 2H12C12.3 2 12.5 2.2 12.5 2.5V3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 8.5H13M7 11.5H13M7 14.5H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span>Inspecciones</span>
      </button>
      <Link className={styles.fab} href="/inspecciones/nueva" aria-label="Nueva inspección">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </Link>
      <button className={styles.navItem} type="button">
        <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 4.5C6 3.5 8 3.5 10 4.5V16.5C8 15.5 6 15.5 4 16.5V4.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M16 4.5C14 3.5 12 3.5 10 4.5V16.5C12 15.5 14 15.5 16 16.5V4.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span>Biblioteca</span>
      </button>
      <Link className={styles.navItem} href="/perfil">
        <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.5 17C4.3 13.8 6.9 12 10 12C13.1 12 15.7 13.8 16.5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span>Perfil</span>
      </Link>
    </div>
  );
}
