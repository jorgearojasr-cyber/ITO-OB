import "server-only";

import { prisma } from "@/lib/db/prisma";

export type LibraryCategoryData = {
  name: string;
  slug: string;
  articles: { slug: string; title: string; summary: string }[];
} | null;

export async function getLibraryCategory(categorySlug: string): Promise<LibraryCategoryData> {
  const category = await prisma.libraryCategory.findUnique({
    where: { slug: categorySlug },
    include: { articles: { orderBy: { order: "asc" } } },
  });

  if (!category) {
    return null;
  }

  return {
    name: category.name,
    slug: category.slug,
    articles: category.articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      summary: article.summary,
    })),
  };
}
