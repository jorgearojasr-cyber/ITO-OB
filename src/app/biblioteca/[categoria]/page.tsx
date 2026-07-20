import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { LibraryArticleListItem } from "@/components/biblioteca/LibraryArticleListItem";
import { getLibraryCategory } from "@/lib/library/get-library-category";
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

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title={category.name} backHref="/biblioteca" />
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
