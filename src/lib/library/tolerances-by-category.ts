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
// "± 2 mm; sin luz visible...", etc.). Es una INSTRUCCIÓN de cómo
// pararse a revisar (distancia, tipo de luz, ángulo, o qué mirar) — no
// el dato técnico en sí; la cifra exacta queda en el detalle completo
// (la tabla de `items` de la ficha, sin cambios). Terminología tomada
// tal cual del manual (ej. "luz angulada", no "luz rasante") — y si la
// tolerancia ya trae la técnica incluida (ej. "sin luz visible con
// ventana cerrada"), se extrae tal cual en vez de inventar una nueva.
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
      { parameter: "Paralelismo entre hojas y entre marco y hojas", shortLabel: "Sello hoja-marco: con la ventana cerrada, revisa que no se vea luz entre marco y hoja" },
      { parameter: "Manchas, rayas, abolladuras o decoloraciones", shortLabel: "Marco: párate perpendicular a 1,5 m y busca manchas o rayas" },
    ],
    distanceLightSummary: "Marco a 1,5 m; vidrio: acercarse hasta 4 m si hay falla",
  },
  puertas: {
    fichaId: 12,
    highlightItems: [
      { parameter: "Paralelismo entre hoja y marco", shortLabel: "Con la puerta cerrada, revisa que el espacio entre la hoja y el marco sea parejo en todo el contorno" },
      { parameter: "Planeidad de la hoja", shortLabel: "Apoya una regla larga sobre la hoja y revisa que no queden espacios (sin pandeos)" },
      { parameter: "Verticalidad del vano", shortLabel: "Cuelga una plomada desde arriba del vano y revisa que quede a plomo en toda su altura" },
    ],
  },
  pisos: {
    fichaId: 25,
    highlightItems: [
      { parameter: "Planeidad", shortLabel: "Camina por toda la superficie y revisa que no haya zonas hundidas o levantadas" },
      { parameter: "Profundidad de rayas", shortLabel: "Rayas: revisa que sean solo superficiales, sin relieve ni marcas de otro tono" },
    ],
  },
  porcelanatos: {
    fichaId: 10,
    highlightItems: [
      { parameter: "Desnivel entre palmetas en pisos", shortLabel: "Pasa la mano por las uniones y revisa que no se sienta un escalón" },
      { parameter: "Alineación de canterías (ambos sentidos)", shortLabel: "Revisa con una regla o lienza que las líneas de junta queden rectas y parejas" },
      { parameter: "Palmetas quebradas, despuntadas, con grietas o sin esmalte", shortLabel: "Párate a 1 m con luz de día y revisa que no haya piezas trisadas ni sin esmalte" },
    ],
    distanceLightSummary: "Revisar a 1 m con luz de día",
  },
  ceramicas: {
    fichaId: 10,
    highlightItems: [
      { parameter: "Variación de tonalidad de una palmeta vs. el resto", shortLabel: "Párate a 1 m con luz de día y compara el tono entre palmetas vecinas" },
      { parameter: "Desnivel entre palmetas en otras superficies", shortLabel: "Pasa la mano por las uniones y revisa que no se sienta un escalón" },
      { parameter: "Palmetas quebradas, despuntadas, con grietas o sin esmalte", shortLabel: "Párate a 1 m con luz de día y revisa que no haya piezas trisadas ni sin esmalte" },
    ],
    distanceLightSummary: "Revisar a 1 m con luz de día",
  },
  pinturas: {
    fichaId: 23,
    highlightItems: [
      { parameter: "Pinturas interiores (lisas)", shortLabel: "Interior: párate a 1 m con luz angulada (de lado, no de frente)" },
      { parameter: "Pinturas exteriores", shortLabel: "Exterior: revisa desde 5 m, con luz de día" },
    ],
    distanceLightSummary: "Interior a 1 m; exterior a 5 m, con luz de día",
  },
  muebles: {
    fichaId: 22,
    highlightItems: [
      { parameter: "Paralelismo entre puertas y/o cajones del mueble", shortLabel: "Revisa que las puertas y cajones queden parejos entre sí" },
      { parameter: "Alineación horizontal superior e inferior entre puertas", shortLabel: "Revisa que los bordes superior e inferior de las puertas queden a la misma altura" },
      { parameter: "Paralelismo del mueble vs. paramentos/muebles próximos", shortLabel: "Revisa que el mueble quede parejo respecto a los muros o muebles vecinos" },
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
      { parameter: "Alineación entre artefactos", shortLabel: "Cuando hay dos cerca, revisa que queden alineados y a la misma altura" },
      { parameter: "Horizontalidad del artefacto", shortLabel: "Revisa con un nivel que la placa no quede torcida" },
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
  cornisas: {
    fichaId: 18,
    highlightItems: [
      { parameter: "Alineación de junta", shortLabel: "Alineación de junta entre cornisas: 1 mm" },
      { parameter: "Desajuste en junta", shortLabel: "Desajuste en junta entre cornisas: 1 mm" },
    ],
  },
  "pavimentos-vinilicos": {
    fichaId: 24,
    highlightItems: [
      { parameter: "Encuentro entre palmetas o paños", shortLabel: "Pasa la mano por las uniones y revisa que no se sienta un escalón" },
      { parameter: "Encuentro con sectores singulares sin guardapolvo ni junquillo", shortLabel: "Revisa los bordes sin guardapolvo (junto a puertas) que queden bien terminados" },
      { parameter: "Profundidad de rayas", shortLabel: "Revisa que las rayas sean solo superficiales, sin relieve ni marca de otro tono" },
    ],
  },
  "alfombras-y-cubrepisos": {
    fichaId: 17,
    highlightItems: [
      { parameter: "Juntas y encuentros de cubrepisos", shortLabel: "Revisa que las uniones entre paños queden parejas, sin espacios" },
      { parameter: "Encuentro de alfombra con marcos y pilastras", shortLabel: "Revisa el encuentro con marcos y pilastras, sin bordes sueltos" },
    ],
  },
  "papel-mural": {
    fichaId: 14,
    highlightItems: [
      { parameter: "Piquetes", shortLabel: "De pie a 1 m, revisa que no se vean piquetes ni burbujas" },
      { parameter: "Encuentro papel–cornisa / papel–guardapolvo", shortLabel: "Revisa el encuentro con cornisas o guardapolvos, sin separaciones grandes" },
      { parameter: "Encuentro con marcos de ventana u otros", shortLabel: "Revisa el encuentro con marcos de ventanas, sin quedar corto ni montado" },
    ],
  },
};
