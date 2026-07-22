import "server-only";

import { prisma } from "@/lib/db/prisma";
import { toleranceManual } from "./tolerances-manual";
import { toleranceMappingByCategorySlug } from "./tolerances-by-category";

// Deriva el "Kit de inspección" a partir del campo `verification` de las 26
// fichas del manual (tolerances-manual.ts), cruzado con el mapeo real
// ficha → categoría de Biblioteca técnica (tolerances-by-category.ts). No es
// una lista curada a mano: si el manual o el mapeo cambian, esta lista se
// recalcula sola.
//
// Solo se listan herramientas que terminan asociadas a al menos una
// categoría — las fichas sin categoría mapeada (13 de las 26) no aportan
// herramientas a esta pantalla, aunque mencionen instrumentos.

type ToolId =
  | "regla-huincha"
  | "nivel-carpintero"
  | "escuadra"
  | "plomada"
  | "laina"
  | "galga"
  | "martillo"
  | "nivel";

type ToolDefinition = { id: ToolId; label: string };

// Orden de presentación en pantalla.
const TOOL_DEFINITIONS: ToolDefinition[] = [
  { id: "regla-huincha", label: "Regla o huincha graduada" },
  { id: "nivel", label: "Nivel" },
  { id: "nivel-carpintero", label: "Nivel carpintero" },
  { id: "escuadra", label: "Escuadra" },
  { id: "plomada", label: "Plomada" },
  { id: "laina", label: "Laina" },
  { id: "galga", label: "Galga" },
  { id: "martillo", label: "Martillo pequeño" },
];

// "Instrumento graduado" y "lienza" se agrupan dentro de regla-huincha:
// cumplen la misma función de medición lineal y el manual los usa como
// alternativas intercambiables con "regla"/"huincha" en el mismo ítem.
//
// "Instrumento topográfico" y "Nivel de burbuja" se excluyen a propósito
// (decisión explícita): solo aparecen en fichas sin categoría mapeada, así
// que nunca producirían un chip — mostrarlos sería una entrada sin destino.
function detectTools(verification: string): ToolId[] {
  const text = verification.toLowerCase();
  const found: ToolId[] = [];

  if (/huincha|\bregla\b|instrumento graduado|\blienza\b/.test(text)) {
    found.push("regla-huincha");
  }

  if (/nivel de burbuja|nivel topográfico|instrumento topográfico/.test(text)) {
    // omitido a propósito, ver nota arriba
  } else if (/nivel carpintero/.test(text)) {
    found.push("nivel-carpintero");
  } else if (/\bnivel\b/.test(text)) {
    found.push("nivel");
  }

  if (/escuadra/.test(text)) found.push("escuadra");
  if (/plomada|\bplomo\b/.test(text)) found.push("plomada");
  if (/\blaina\b/.test(text)) found.push("laina");
  if (/\bgalga\b/.test(text)) found.push("galga");
  if (/martillo peque/.test(text)) found.push("martillo");

  return found;
}

function buildFichaToCategorySlugs(): Map<number, string[]> {
  const map = new Map<number, string[]>();
  for (const [slug, mapping] of Object.entries(toleranceMappingByCategorySlug)) {
    if (!mapping) continue;
    const existing = map.get(mapping.fichaId) ?? [];
    existing.push(slug);
    map.set(mapping.fichaId, existing);
  }
  return map;
}

export type InspectionKitTool = {
  id: ToolId;
  label: string;
  categories: { slug: string; name: string }[];
};

export async function getInspectionKitData(): Promise<InspectionKitTool[]> {
  const fichaToCategorySlugs = buildFichaToCategorySlugs();
  const categorySlugsByTool = new Map<ToolId, Set<string>>();

  for (const ficha of toleranceManual) {
    const categorySlugs = fichaToCategorySlugs.get(ficha.id);
    if (!categorySlugs || categorySlugs.length === 0) continue;

    for (const item of ficha.items) {
      for (const toolId of detectTools(item.verification)) {
        const set = categorySlugsByTool.get(toolId) ?? new Set<string>();
        for (const slug of categorySlugs) set.add(slug);
        categorySlugsByTool.set(toolId, set);
      }
    }
  }

  const categories = await prisma.libraryCategory.findMany({
    select: { slug: true, name: true },
  });
  const nameBySlug = new Map(categories.map((category) => [category.slug, category.name]));

  const tools: InspectionKitTool[] = [];
  for (const definition of TOOL_DEFINITIONS) {
    const slugs = categorySlugsByTool.get(definition.id);
    if (!slugs || slugs.size === 0) continue;

    tools.push({
      id: definition.id,
      label: definition.label,
      categories: Array.from(slugs)
        .map((slug) => ({ slug, name: nameBySlug.get(slug) ?? slug }))
        .sort((a, b) => a.name.localeCompare(b.name, "es")),
    });
  }

  return tools;
}

export type GeneralTool = {
  id: string;
  label: string;
  description: string;
};

export const GENERAL_TOOLS: GeneralTool[] = [
  {
    id: "linterna",
    label: "Linterna o luz portátil",
    description: "Para observar con luz angulada/rasante en pinturas y superficies.",
  },
  {
    id: "detector-corriente",
    label: "Detector de corriente/voltaje",
    description: "Para verificar enchufes e iluminación de forma segura antes de manipular.",
  },
  {
    id: "cinta-adhesiva",
    label: "Cinta adhesiva o masking tape",
    description: "Para marcar en el momento los puntos con observación, antes de fotografiarlos.",
  },
  {
    id: "celular",
    label: "Celular con cámara",
    description: "Ya lo tienes — es el que usas para las fotos de la app.",
  },
];
