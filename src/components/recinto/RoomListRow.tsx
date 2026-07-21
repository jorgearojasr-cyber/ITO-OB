import Link from "next/link";
import styles from "./RoomListRow.module.css";

type RoomListRowProps = {
  name: string;
  done: number;
  total: number;
  percent: number;
  href: string;
};

export function RoomListRow({ name, done, total, percent, href }: RoomListRowProps) {
  const pending = total - done;
  const isDone = total > 0 && pending === 0;

  return (
    <Link href={href} className={styles.row}>
      <div className={styles.body}>
        <div className={styles.name}>{name}</div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${percent}%` }} />
        </div>
        <div className={styles.meta}>
          {done} de {total} elemento{total === 1 ? "" : "s"} revisado{total === 1 ? "" : "s"}
        </div>
      </div>
      <span className={isDone ? `${styles.badge} ${styles.badgeDone}` : `${styles.badge} ${styles.badgePending}`}>
        {isDone ? "Completo" : `${pending} pendiente${pending === 1 ? "" : "s"}`}
      </span>
      <span className={styles.chevron}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.5L13 10L7.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
