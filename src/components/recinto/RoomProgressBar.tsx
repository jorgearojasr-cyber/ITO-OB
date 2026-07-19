import styles from "./RoomProgressBar.module.css";

type RoomProgressBarProps = {
  done: number;
  total: number;
  percent: number;
};

export function RoomProgressBar({ done, total, percent }: RoomProgressBarProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>
        {done} de {total} elemento{total === 1 ? "" : "s"} revisado{total === 1 ? "" : "s"}
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
