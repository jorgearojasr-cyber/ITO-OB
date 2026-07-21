import "server-only";

import { prisma } from "@/lib/db/prisma";

export type LibraryArticleData = {
  title: string;
  body: string;
  quickCheckItems: string[];
  categoryName: string;
  categorySlug: string;
} | null;

export async function getLibraryArticle(
  categorySlug: string,
  articleSlug: string,
): Promise<LibraryArticleData> {
  const article = await prisma.libraryArticle.findFirst({
    where: { slug: articleSlug, category: { slug: categorySlug } },
    include: { category: true },
  });

  if (!article) {
    return null;
  }

  return {
    title: article.title,
    body: article.body,
    quickCheckItems: article.quickCheckItems,
    categoryName: article.category.name,
    categorySlug: article.category.slug,
  };
}
