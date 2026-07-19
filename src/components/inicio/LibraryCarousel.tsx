import type { InicioData } from "@/lib/inspections/get-inicio-data";
import styles from "./LibraryCarousel.module.css";

type LibraryCarouselProps = {
  categories: InicioData["libraryCategories"];
};

const iconsBySlug: Record<string, React.ReactNode> = {
  ventanas: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="32" rx="2" stroke="#2C5A87" strokeWidth="2" />
      <path d="M24 8V40M8 24H40" stroke="#2C5A87" strokeWidth="2" />
    </svg>
  ),
  puertas: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="6" width="24" height="36" rx="1.5" stroke="#6B4322" strokeWidth="2" />
      <circle cx="30" cy="24" r="1.6" fill="#6B4322" />
    </svg>
  ),
  pisos: (
    <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
      <rect x="7" y="7" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
      <rect x="26" y="7" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
      <rect x="7" y="26" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
      <rect x="26" y="26" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
    </svg>
  ),
  banos: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path d="M9 26H39" stroke="#43617D" strokeWidth="2" />
      <path
        d="M12 26V16C12 13.8 13.8 12 16 12H16.2C18 12 19.5 13.3 19.9 15"
        stroke="#43617D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M11 26C11 31 15 35 20 35H28C33 35 37 31 37 26" stroke="#43617D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="17" stroke="#5A6472" strokeWidth="2" />
    <path d="M24 17V25L29 29" stroke="#5A6472" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function LibraryCarousel({ categories }: LibraryCarouselProps) {
  return (
    <div className={styles.sectionPad}>
      <div className={styles.sectionTitle}>
        Biblioteca técnica <span className={styles.seeAll}>Ver todas</span>
      </div>
      <div className={styles.scroll}>
        {categories.map((category) => (
          <div key={category.id} className={styles.card}>
            <div className={styles.thumb}>{iconsBySlug[category.slug] ?? fallbackIcon}</div>
            <div className={styles.body}>
              <div className={styles.t}>{category.name}</div>
              <div className={styles.n}>
                {category.articleCount} artículo{category.articleCount === 1 ? "" : "s"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
