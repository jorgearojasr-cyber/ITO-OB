"use client";

import { useState } from "react";
import Link from "next/link";
import type { LibraryCategoriesData } from "@/lib/library/get-library-categories";
import { categoryImageBySlug, fallbackCategoryImage } from "@/lib/library/category-images";
import styles from "./LibraryCategoryGrid.module.css";

type LibraryCategoryGridProps = {
  categories: LibraryCategoriesData;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function LibraryCategoryGrid({ categories }: LibraryCategoryGridProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query.trim());
  const filteredCategories = normalizedQuery
    ? categories.filter(
        (category) =>
          normalize(category.name).includes(normalizedQuery) ||
          category.articleTitles.some((title) => normalize(title).includes(normalizedQuery)),
      )
    : categories;

  return (
    <div className={styles.wrap}>
      <input
        className={styles.search}
        type="search"
        placeholder="Buscar por categoría o artículo…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Buscar en la biblioteca técnica"
      />

      {filteredCategories.length === 0 ? (
        <div className={styles.empty}>No encontramos resultados para &ldquo;{query}&rdquo;.</div>
      ) : (
        <div className={styles.grid}>
          {filteredCategories.map((category) => (
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
      )}
    </div>
  );
}
