"use client";

import { useState } from "react";
import Link from "next/link";
import type { LibraryElementSummary } from "@/lib/library/get-library-elements";
import { categoryImageBySlug, fallbackCategoryImage } from "@/lib/library/category-images";
import styles from "./LibraryElementGrid.module.css";

type LibraryElementGridProps = {
  elements: LibraryElementSummary[];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function imageForElement(element: LibraryElementSummary) {
  return categoryImageBySlug[element.slug] ?? fallbackCategoryImage;
}

export function LibraryElementGrid({ elements }: LibraryElementGridProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query.trim());
  const filteredElements = normalizedQuery
    ? elements.filter((element) => normalize(element.name).includes(normalizedQuery))
    : elements;

  return (
    <div className={styles.wrap}>
      <input
        className={styles.search}
        type="search"
        placeholder="Buscar un elemento…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Buscar en la biblioteca técnica"
      />

      {filteredElements.length === 0 ? (
        <div className={styles.empty}>No encontramos resultados para &ldquo;{query}&rdquo;.</div>
      ) : (
        <div className={styles.grid}>
          {filteredElements.map((element) => {
            const card = (
              <>
                <div className={styles.thumb}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageForElement(element)}
                    alt=""
                    className={styles.thumbImg}
                    loading="lazy"
                  />
                  {!element.hasContent && <span className={styles.pendingBadge}>Próximamente</span>}
                </div>
                <div className={styles.body}>
                  <div className={styles.t}>{element.name}</div>
                  <div className={styles.n}>
                    {element.hasContent
                      ? `${element.pointCount} punto${element.pointCount === 1 ? "" : "s"} de inspección`
                      : "Sin contenido aún"}
                  </div>
                </div>
              </>
            );

            if (!element.href) {
              return (
                <div key={element.slug} className={`${styles.card} ${styles.cardDisabled}`}>
                  {card}
                </div>
              );
            }

            return (
              <Link key={element.slug} href={element.href} className={styles.card}>
                {card}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
