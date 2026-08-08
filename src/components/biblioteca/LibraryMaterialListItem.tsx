import Link from "next/link";
import styles from "./LibraryMaterialListItem.module.css";

type LibraryMaterialListItemProps = {
  label: string;
  pointCount: number;
  href: string | null;
};

export function LibraryMaterialListItem({ label, pointCount, href }: LibraryMaterialListItemProps) {
  const content = (
    <>
      <div className={styles.info}>
        <div className={styles.title}>{label}</div>
        <div className={styles.summary}>
          {href
            ? `${pointCount} punto${pointCount === 1 ? "" : "s"} de inspección`
            : "Sin contenido aún"}
        </div>
      </div>
      {href && (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.5L13 10L7.5 15.5" stroke="#9AA5B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (!href) {
    return <div className={`${styles.row} ${styles.rowDisabled}`}>{content}</div>;
  }

  return (
    <Link href={href} className={styles.row}>
      {content}
    </Link>
  );
}
