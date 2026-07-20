// Mapeo curado de categoría de Biblioteca técnica → ficha del Manual de
// Tolerancias + ítems destacados. Solo 9 de las 19 categorías tienen
// match real con una ficha (ver tolerances-manual.ts) — el manual cubre
// partidas constructivas/terminaciones, no instalaciones sanitarias,
// eléctricas ni cubiertas. Las categorías fuera de este mapeo no
// muestran ficha de tolerancias.
export type CategoryToleranceMapping = {
  fichaId: number;
  /** Subconjunto curado de items[].parameter de la ficha, en este orden. */
  highlightParameters: string[];
};

export const toleranceMappingByCategorySlug: Partial<Record<string, CategoryToleranceMapping>> = {
  ventanas: {
    fichaId: 13,
    highlightParameters: ["Paralelismo entre hojas y entre marco y hojas", "Manchas, rayas, abolladuras o decoloraciones"],
  },
  puertas: {
    fichaId: 12,
    highlightParameters: ["Paralelismo entre hoja y marco", "Planeidad de la hoja", "Verticalidad del vano"],
  },
  pisos: {
    fichaId: 25,
    highlightParameters: ["Planeidad", "Profundidad de rayas"],
  },
  porcelanatos: {
    fichaId: 10,
    highlightParameters: [
      "Desnivel entre palmetas en pisos",
      "Alineación de canterías (ambos sentidos)",
      "Palmetas quebradas, despuntadas, con grietas o sin esmalte",
    ],
  },
  ceramicas: {
    fichaId: 10,
    highlightParameters: [
      "Variación de tonalidad de una palmeta vs. el resto",
      "Desnivel entre palmetas en otras superficies",
      "Palmetas quebradas, despuntadas, con grietas o sin esmalte",
    ],
  },
  pinturas: {
    fichaId: 23,
    highlightParameters: ["Pinturas interiores (lisas)", "Pinturas exteriores"],
  },
  muebles: {
    fichaId: 22,
    highlightParameters: [
      "Paralelismo entre puertas y/o cajones del mueble",
      "Alineación horizontal superior e inferior entre puertas",
      "Paralelismo del mueble vs. paramentos/muebles próximos",
    ],
  },
  interruptores: {
    fichaId: 26,
    highlightParameters: ["Alineación entre artefactos", "Horizontalidad del artefacto"],
  },
  enchufes: {
    fichaId: 26,
    highlightParameters: ["Alineación entre artefactos", "Horizontalidad del artefacto"],
  },
};
