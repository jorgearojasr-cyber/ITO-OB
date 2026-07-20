import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { LibraryArticleListItem } from "@/components/biblioteca/LibraryArticleListItem";
import { CategoryToleranceCard } from "@/components/biblioteca/CategoryToleranceCard";
import { GoodBadExamplesSection } from "@/components/biblioteca/GoodBadExamplesSection";
import { getLibraryCategory } from "@/lib/library/get-library-category";
import { categoryImageBySlug, fallbackCategoryImage } from "@/lib/library/category-images";
import { toleranceMappingByCategorySlug } from "@/lib/library/tolerances-by-category";
import { toleranceManual } from "@/lib/library/tolerances-manual";
import { goodBadExamplesByCategorySlug } from "@/lib/library/good-bad-examples";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ categoria: string }>;
};

export default async function LibraryCategoryPage({ params }: PageProps) {
  const { categoria } = await params;
  const category = await getLibraryCategory(categoria);

  if (!category) {
    notFound();
  }

  const mapping = toleranceMappingByCategorySlug[category.slug];
  const ficha = mapping ? toleranceManual.find((f) => f.id === mapping.fichaId) : undefined;
  const items = ficha?.items.filter((item) => mapping!.highlightParameters.includes(item.parameter));

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title={category.name} backHref="/biblioteca" />
        <CategoryToleranceCard
          imageUrl={categoryImageBySlug[category.slug] ?? fallbackCategoryImage}
          distanceLight={ficha?.distanceLight}
          items={items}
        />
        <GoodBadExamplesSection examples={goodBadExamplesByCategorySlug[category.slug]} />
        <div className={styles.list}>
          {category.articles.map((article) => (
            <LibraryArticleListItem
              key={article.slug}
              title={article.title}
              summary={article.summary}
              href={`/biblioteca/${category.slug}/${article.slug}`}
            />
          ))}
        </div>
      </div>
      <BottomNav active="biblioteca" />
    </div>
  );
}
