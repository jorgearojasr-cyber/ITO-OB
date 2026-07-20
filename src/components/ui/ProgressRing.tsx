import styles from "./ProgressRing.module.css";

type ProgressRingProps = {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
};

export function ProgressRing({
  percent,
  size = 92,
  strokeWidth = 9,
  label = "Avance general",
}: ProgressRingProps) {
  const clampedPercent = Math.min(100, Math.max(0, Math.round(percent)));
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clampedPercent / 100);

  return (
    <div className={styles.wrap} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="var(--accent-100)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="var(--accent-600)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className={styles.label}>
        <div className={styles.pct}>
          {clampedPercent}
          <sup>%</sup>
        </div>
        <div className={styles.cap}>{label}</div>
      </div>
    </div>
  );
}
