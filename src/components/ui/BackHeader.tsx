import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./BackHeader.module.css";

type BackHeaderProps = {
  title: string;
  subtitle?: string;
  backHref: string;
  action?: ReactNode;
  sticky?: boolean;
};

export function BackHeader({ title, subtitle, backHref, action, sticky }: BackHeaderProps) {
  return (
    <div className={sticky ? `${styles.header} ${styles.sticky}` : styles.header}>
      <Link className={styles.backBtn} href={backHref} aria-label="Volver">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M12.5 4.5L6 10L12.5 15.5"
            stroke="#101828"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <div className={styles.titles}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
