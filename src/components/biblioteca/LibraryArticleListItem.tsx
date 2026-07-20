import Link from "next/link";
import styles from "./LibraryArticleListItem.module.css";

type LibraryArticleListItemProps = {
  title: string;
  summary: string;
  href: string;
};

export function LibraryArticleListItem({ title, summary, href }: LibraryArticleListItemProps) {
  return (
    <Link href={href} className={styles.row}>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.summary}>{summary}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M7.5 4.5L13 10L7.5 15.5" stroke="#9AA5B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
