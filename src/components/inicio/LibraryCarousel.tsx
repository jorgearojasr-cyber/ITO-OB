import Link from "next/link";
import type { InicioData } from "@/lib/inspections/get-inicio-data";
import { categoryImageBySlug, fallbackCategoryImage } from "@/lib/library/category-images";
import styles from "./LibraryCarousel.module.css";

type LibraryCarouselProps = {
  categories: InicioData["libraryCategories"];
};

export function LibraryCarousel({ categories }: LibraryCarouselProps) {
  return (
    <div className={styles.sectionPad}>
      <div className={styles.sectionTitle}>
        Biblioteca técnica
        <Link href="/biblioteca" className={styles.seeAll}>
          Ver todas
        </Link>
      </div>
      <div className={styles.scroll}>
        {categories.map((category) => (
          <Link key={category.id} href={`/biblioteca/${category.slug}`} className={styles.card}>
            <div className={styles.thumb}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={categoryImageBySlug[category.slug] ?? fallbackCategoryImage}
                alt=""
                className={styles.thumbImg}
                loading="lazy"
              />
            </div>
            <div className={styles.body}>
              <div className={styles.t}>{category.name}</div>
              <div className={styles.n}>
                {category.articleCount} artículo{category.articleCount === 1 ? "" : "s"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
