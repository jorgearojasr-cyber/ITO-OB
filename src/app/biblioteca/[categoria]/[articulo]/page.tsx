import { notFound } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { ElementLibraryCard } from "@/components/elemento/ElementLibraryCard";
import { getLibraryArticle } from "@/lib/library/get-library-article";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ categoria: string; articulo: string }>;
};

export default async function LibraryArticlePage({ params }: PageProps) {
  const { categoria, articulo } = await params;
  const article = await getLibraryArticle(categoria, articulo);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader
          title={article.title}
          subtitle={`Volver a ${article.categoryName}`}
          backHref={`/biblioteca/${article.categorySlug}`}
        />
        <ElementLibraryCard libraryArticle={article} />
      </div>
      <BottomNav active="biblioteca" />
    </div>
  );
}
