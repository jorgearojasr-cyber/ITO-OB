import "server-only";

import { prisma } from "@/lib/db/prisma";

export type LibraryArticleData = {
  title: string;
  summary: string;
  body: string;
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
    summary: article.summary,
    body: article.body,
    categoryName: article.category.name,
    categorySlug: article.category.slug,
  };
}
