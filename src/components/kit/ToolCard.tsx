import Link from "next/link";
import { ToolIcon } from "./ToolIcon";
import styles from "./ToolCard.module.css";

type ToolCardProps = {
  id: string;
  label: string;
  description?: string;
  categories?: { slug: string; name: string }[];
};

export function ToolCard({ id, label, description, categories }: ToolCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <ToolIcon id={id} />
      </div>
      <div className={styles.body}>
        <div className={styles.label}>{label}</div>
        {description && <div className={styles.description}>{description}</div>}
        {categories && categories.length > 0 && (
          <div className={styles.chips}>
            {categories.map((category) => (
              <Link key={category.slug} href={`/biblioteca/${category.slug}`} className={styles.chip}>
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
