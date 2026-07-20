"use client";

import { useState } from "react";
import Link from "next/link";
import type { LibraryCategoriesData } from "@/lib/library/get-library-categories";
import styles from "./LibraryCategoryGrid.module.css";

type LibraryCategoryGridProps = {
  categories: LibraryCategoriesData;
};

const iconsBySlug: Record<string, React.ReactNode> = {
  ventanas: (
    <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="32" rx="2" stroke="#2C5A87" strokeWidth="2" />
      <path d="M24 8V40M8 24H40" stroke="#2C5A87" strokeWidth="2" />
    </svg>
  ),
  puertas: (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="6" width="24" height="36" rx="1.5" stroke="#6B4322" strokeWidth="2" />
      <circle cx="30" cy="24" r="1.6" fill="#6B4322" />
    </svg>
  ),
  pisos: (
    <svg width="29" height="29" viewBox="0 0 48 48" fill="none">
      <rect x="7" y="7" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
      <rect x="26" y="7" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
      <rect x="7" y="26" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
      <rect x="26" y="26" width="15" height="15" stroke="#5A6472" strokeWidth="2" />
    </svg>
  ),
  banos: (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
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
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="17" stroke="#5A6472" strokeWidth="2" />
    <path d="M24 17V25L29 29" stroke="#5A6472" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
              <div className={styles.thumb}>{iconsBySlug[category.slug] ?? fallbackIcon}</div>
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
