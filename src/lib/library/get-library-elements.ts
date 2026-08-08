import "server-only";

import { getLibraryCategories } from "@/lib/library/get-library-categories";
import { LIBRARY_ELEMENTS, type LibraryElement } from "@/lib/library/library-elements";
import { getInspectionPoints } from "@/lib/library/inspection-points-data";

export type LibraryElementSummary = {
  slug: string;
  name: string;
  icon: string;
  kind: LibraryElement["kind"];
  href: string | null;
  pointCount: number;
  hasContent: boolean;
};

export type LibraryElementMaterialSummary = {
  slug: string;
  label: string;
  categorySlug: string | null;
  articleHref: string | null;
  pointCount: number;
  hasContent: boolean;
};

export async function getLibraryElementSummaries(): Promise<LibraryElementSummary[]> {
  return LIBRARY_ELEMENTS.map((element) => {
    if (element.kind === "direct") {
      const pointCount = getInspectionPoints(element.slug).length;
      return {
        slug: element.slug,
        name: element.name,
        icon: element.icon,
        kind: element.kind,
        href: `/biblioteca/elemento/${element.slug}`,
        pointCount,
        hasContent: pointCount > 0,
      };
    }

    const materials = element.materials ?? [];
    const pointCount = materials.reduce(
      (total, material) => total + getInspectionPoints(element.slug, material.slug).length,
      0,
    );

    return {
      slug: element.slug,
      name: element.name,
      icon: element.icon,
      kind: element.kind,
      href: `/biblioteca/elemento/${element.slug}`,
      pointCount,
      hasContent: pointCount > 0,
    };
  });
}

export async function getLibraryElementMaterials(
  elementSlug: string,
): Promise<{ element: LibraryElement; materials: LibraryElementMaterialSummary[] } | null> {
  const element = LIBRARY_ELEMENTS.find((entry) => entry.slug === elementSlug);
  if (!element || element.kind !== "materials") {
    return null;
  }

  const categories = await getLibraryCategories();
  const articleCountBySlug = new Map(categories.map((category) => [category.slug, category.articleCount]));

  const materials = (element.materials ?? []).map((material) => {
    const points = getInspectionPoints(element.slug, material.slug);
    const hasArticle = material.categorySlug ? (articleCountBySlug.get(material.categorySlug) ?? 0) > 0 : false;
    return {
      slug: material.slug,
      label: material.label,
      categorySlug: material.categorySlug,
      articleHref: hasArticle ? `/biblioteca/${material.categorySlug}` : null,
      pointCount: points.length,
      hasContent: points.length > 0,
    };
  });

  return { element, materials };
}
