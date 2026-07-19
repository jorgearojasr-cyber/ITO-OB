import Link from "next/link";
import { StatusChip } from "@/components/ui/StatusChip";
import { ElementIcon } from "./element-icons";
import styles from "./ElementListItem.module.css";

type ElementListItemProps = {
  id: string;
  name: string;
  status: "PENDING" | "CORRECT" | "OBSERVED";
  elementTemplateSlug: string;
  href: string;
};

export function ElementListItem({ name, status, elementTemplateSlug, href }: ElementListItemProps) {
  return (
    <Link href={href} className={styles.row}>
      <div className={styles.icon}>
        <ElementIcon elementTemplateSlug={elementTemplateSlug} />
      </div>
      <span className={styles.name}>{name}</span>
      <StatusChip status={status} />
      <span className={styles.chevron}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.5L13 10L7.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
