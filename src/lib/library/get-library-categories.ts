import "server-only";

import { prisma } from "@/lib/db/prisma";

export type LibraryCategoriesData = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  articleCount: number;
  articleTitles: string[];
}[];

export async function getLibraryCategories(): Promise<LibraryCategoriesData> {
  const categories = await prisma.libraryCategory.findMany({
    orderBy: { order: "asc" },
    include: { articles: { select: { title: true }, orderBy: { order: "asc" } } },
  });

  return categories.map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    icon: category.icon,
    articleCount: category.articles.length,
    articleTitles: category.articles.map((article) => article.title),
  }));
}
