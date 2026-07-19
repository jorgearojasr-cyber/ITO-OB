import Link from "next/link";
import styles from "./QuickAccessGrid.module.css";

const items = [
  {
    label: "Recintos",
    active: true,
    background: "var(--purple-100)",
    icon: (
      <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
        <path d="M3 9.5L10 3.5L17 9.5" stroke="#8E6EF0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 8.3V16H15V8.3" stroke="#8E6EF0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Elementos",
    active: false,
    background: "var(--green-100)",
    icon: (
      <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
        <path d="M4 5.5H16M4 10H16M4 14.5H11" stroke="#2E9E68" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Observaciones",
    active: false,
    background: "var(--amber-100)",
    icon: (
      <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L18 16.5H2L10 3Z" stroke="#D6890F" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M10 8V11.5" stroke="#D6890F" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="10" cy="14" r="0.9" fill="#D6890F" />
      </svg>
    ),
  },
  {
    label: "Mis fotos",
    active: false,
    background: "#F1E9FE",
    icon: (
      <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="6" width="14" height="10" rx="2" stroke="#9B5CF3" strokeWidth="1.7" />
        <circle cx="10" cy="11" r="2.6" stroke="#9B5CF3" strokeWidth="1.7" />
        <path d="M7.3 6L8.3 4H11.7L12.7 6" stroke="#9B5CF3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

type QuickAccessGridProps = {
  inspectionId: string | null;
  firstRoomId: string | null;
};

export function QuickAccessGrid({ inspectionId, firstRoomId }: QuickAccessGridProps) {
  return (
    <div className={styles.sectionPad}>
      <div className={styles.sectionTitle}>Acceso rápido</div>
      <div className={styles.grid}>
        {items.map((item) => {
          const className = item.active ? `${styles.item} ${styles.itemActive}` : styles.item;
          const content = (
            <>
              <div className={styles.icon} style={{ background: item.background }}>
                {item.icon}
              </div>
              <span className={styles.label}>{item.label}</span>
            </>
          );

          if (item.label === "Observaciones" && inspectionId) {
            return (
              <Link key={item.label} href={`/inspecciones/${inspectionId}/resumen`} className={className}>
                {content}
              </Link>
            );
          }

          if (item.label === "Recintos" && inspectionId && firstRoomId) {
            return (
              <Link
                key={item.label}
                href={`/inspecciones/${inspectionId}/recintos/${firstRoomId}`}
                className={className}
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={item.label} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
