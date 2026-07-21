// Mapeo curado de categoría de Biblioteca técnica → ficha del Manual de
// Tolerancias + ítems destacados. Solo 9 de las 19 categorías tienen
// match real con una ficha (ver tolerances-manual.ts) — el manual cubre
// partidas constructivas/terminaciones, no instalaciones sanitarias,
// eléctricas ni cubiertas. Las categorías fuera de este mapeo no
// muestran ficha de tolerancias.
//
// `shortLabel` es el resumen de una línea para el checklist rápido
// (nivel 1 de la vista de categoría) — escrito a mano por ítem, no hay
// patrón automático confiable a partir de parameter+tolerance (los
// valores vienen en formatos muy distintos: "3 mm", "No se aceptan",
// "± 2 mm; sin luz visible...", etc.).
// `distanceLightSummary` es el resumen de una línea del `distanceLight`
// completo de la ficha (solo en las categorías donde aplica).
export type CategoryToleranceMapping = {
  fichaId: number;
  /** Subconjunto curado de items[].parameter de la ficha, en este orden,
   *  cada uno con su resumen de checklist. */
  highlightItems: { parameter: string; shortLabel: string }[];
  distanceLightSummary?: string;
};

export const toleranceMappingByCategorySlug: Partial<Record<string, CategoryToleranceMapping>> = {
  ventanas: {
    fichaId: 13,
    highlightItems: [
      { parameter: "Paralelismo entre hojas y entre marco y hojas", shortLabel: "Sello hoja-marco: sin luz visible, ±2 mm" },
      { parameter: "Manchas, rayas, abolladuras o decoloraciones", shortLabel: "Marco: sin manchas/rayas visibles a 1,5 m" },
    ],
    distanceLightSummary: "Marco a 1,5 m; vidrio: acercarse hasta 4 m si hay falla",
  },
  puertas: {
    fichaId: 12,
    highlightItems: [
      { parameter: "Paralelismo entre hoja y marco", shortLabel: "Paralelismo hoja-marco: máx. 3 mm" },
      { parameter: "Planeidad de la hoja", shortLabel: "Planeidad de la hoja: ±3 mm" },
      { parameter: "Verticalidad del vano", shortLabel: "Verticalidad del vano: ±0,3% de la altura" },
    ],
  },
  pisos: {
    fichaId: 25,
    highlightItems: [
      { parameter: "Planeidad", shortLabel: "Planeidad: 3 mm cada 3 m" },
      { parameter: "Profundidad de rayas", shortLabel: "Solo rayas superficiales, sin relieve" },
    ],
  },
  porcelanatos: {
    fichaId: 10,
    highlightItems: [
      { parameter: "Desnivel entre palmetas en pisos", shortLabel: "Desnivel entre palmetas: máx. 1 mm" },
      { parameter: "Alineación de canterías (ambos sentidos)", shortLabel: "Alineación de canterías: ±2 mm en 3 m" },
      { parameter: "Palmetas quebradas, despuntadas, con grietas o sin esmalte", shortLabel: "Sin palmetas quebradas ni despuntadas" },
    ],
    distanceLightSummary: "Revisar a 1 m con luz de día",
  },
  ceramicas: {
    fichaId: 10,
    highlightItems: [
      { parameter: "Variación de tonalidad de una palmeta vs. el resto", shortLabel: "Tono parejo entre palmetas (máx. 5%)" },
      { parameter: "Desnivel entre palmetas en otras superficies", shortLabel: "Desnivel entre palmetas: máx. 2 mm" },
      { parameter: "Palmetas quebradas, despuntadas, con grietas o sin esmalte", shortLabel: "Sin palmetas quebradas ni despuntadas" },
    ],
    distanceLightSummary: "Revisar a 1 m con luz de día",
  },
  pinturas: {
    fichaId: 23,
    highlightItems: [
      { parameter: "Pinturas interiores (lisas)", shortLabel: "Interior: sombras máx. 1 mm espesor, 5 mm largo" },
      { parameter: "Pinturas exteriores", shortLabel: "Exterior: sin imperfecciones visibles a 5 m" },
    ],
    distanceLightSummary: "Interior a 1 m; exterior a 5 m, con luz de día",
  },
  muebles: {
    fichaId: 22,
    highlightItems: [
      { parameter: "Paralelismo entre puertas y/o cajones del mueble", shortLabel: "Paralelismo entre puertas/cajones: máx. 2 mm" },
      { parameter: "Alineación horizontal superior e inferior entre puertas", shortLabel: "Alineación horizontal entre puertas: máx. 1 mm" },
      { parameter: "Paralelismo del mueble vs. paramentos/muebles próximos", shortLabel: "Paralelismo con muros/muebles vecinos: máx. 3 mm" },
    ],
  },
  interruptores: {
    fichaId: 26,
    highlightItems: [
      { parameter: "Alineación entre artefactos", shortLabel: "Alineación entre artefactos: ±2 mm" },
      { parameter: "Horizontalidad del artefacto", shortLabel: "Horizontalidad: ±1 mm" },
    ],
  },
  enchufes: {
    fichaId: 26,
    highlightItems: [
      { parameter: "Alineación entre artefactos", shortLabel: "Alineación entre artefactos: ±2 mm" },
      { parameter: "Horizontalidad del artefacto", shortLabel: "Horizontalidad: ±1 mm" },
    ],
  },
  guardapolvos: {
    fichaId: 16,
    highlightItems: [
      { parameter: "Distancia guardapolvo–muro", shortLabel: "Distancia guardapolvo-muro: 1 mm" },
      { parameter: "Alineación en junta entre guardapolvos/junquillos", shortLabel: "Alineación de junta entre guardapolvos: 1 mm" },
      { parameter: "Desajuste en junta entre guardapolvos/junquillos", shortLabel: "Desajuste en junta: 1 mm" },
    ],
  },
};
