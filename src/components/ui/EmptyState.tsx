import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={className ? `${styles.empty} ${className}` : styles.empty}>
      <div className={styles.title}>{title}</div>
      <div className={action ? `${styles.desc} ${styles.descWithAction}` : styles.desc}>{description}</div>
      {action}
    </div>
  );
}
