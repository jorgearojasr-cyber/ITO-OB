// Pares "Bien hecho / Mal hecho" por categoría de Biblioteca técnica,
// basados directamente en las tolerancias de tolerances-manual.ts.
// Cubre las 9 categorías con match real en el manual (ver
// tolerances-by-category.ts) — las demás no tienen ficha con contenido
// concreto para ilustrar un caso correcto vs. uno incorrecto.
//
// `imageUrl` queda sin usar por ahora (placeholder de ícono en la UI);
// cuando haya fotos propias, solo hace falta llenarlo acá.
export type GoodBadExample = {
  title: string;
  toleranceRef: string;
  good: { caption: string; imageUrl?: string };
  bad: { caption: string; imageUrl?: string };
};

export const goodBadExamplesByCategorySlug: Partial<Record<string, GoodBadExample[]>> = {
  ventanas: [
    {
      title: "Sello hoja-marco",
      toleranceRef: "Paralelismo ±2 mm, sin luz visible con la ventana cerrada",
      good: {
        caption: "Hoja y marco sin separación visible, sello continuo en todo el perímetro.",
      },
      bad: {
        caption: "Separación visible entre hoja y marco en alguna esquina — riesgo de filtración de aire o agua.",
      },
    },
    {
      title: "Vidrio",
      toleranceRef: "Protocolo ASTM 1036-01 — falla visible antes de 1 m = intensidad Media/Alta",
      good: {
        caption: "Sin fallas detectables al acercarse hasta 1 metro.",
      },
      bad: {
        caption:
          "Falla visible desde más de 1 metro de distancia — defecto de intensidad media o alta, no permitido en vidrios tinteados o reflectivos.",
      },
    },
  ],
  puertas: [
    {
      title: "Escuadra de la hoja",
      toleranceRef: "Paralelismo entre hoja y marco: 3 mm",
      good: {
        caption: "Holgura pareja entre la hoja y el marco en todo el perímetro (±3 mm).",
      },
      bad: {
        caption:
          "Holgura mayor en una esquina que en el resto — la hoja no quedó escuadrada, lo que después complica el cierre y puede dejar paso de aire.",
      },
    },
    {
      title: "Paralelismo con el marco",
      toleranceRef: "Paralelismo entre hoja y marco: 3 mm",
      good: {
        caption: "Hoja paralela al marco, cierre uniforme.",
      },
      bad: {
        caption: "Hoja más cerca del marco arriba que abajo (o viceversa) — fuera de la tolerancia de 3 mm de paralelismo.",
      },
    },
  ],
  ceramicas: [
    {
      title: "Nivel entre palmetas",
      toleranceRef: "Desnivel entre palmetas: 1 mm en piso, 2 mm en otras superficies",
      good: {
        caption: "Palmetas al mismo nivel, superficie lisa al pasar la mano.",
      },
      bad: {
        caption: "Una palmeta sobresale respecto a la vecina — fuera de tolerancia, riesgo de tropiezo y de que se despegue.",
      },
    },
    {
      title: "Adhesión",
      toleranceRef: "Contacto del adhesivo: mínimo 70 % de la superficie",
      good: {
        caption: "Sonido lleno al golpear suavemente la palmeta — adhesivo bien aplicado.",
      },
      bad: {
        caption:
          "Sonido hueco — adhesivo insuficiente (bajo el 70 % de cobertura mínima), la palmeta puede soltarse con el tiempo.",
      },
    },
  ],
  pisos: [
    {
      title: "Planeidad",
      toleranceRef: "Planeidad: 3 mm en 3 m",
      good: {
        caption: "Superficie pareja, sin ondulaciones al pasar una regla larga.",
      },
      bad: {
        caption: "Se nota un desnivel al pasar la regla — supera los 3 mm en 3 m de tolerancia.",
      },
    },
    {
      title: "Rayas",
      toleranceRef: "Profundidad de rayas: se aceptan superficiales, sin relieve ni marcas de otra tonalidad",
      good: {
        caption: "Sin marcas, o rayas mínimas que no cambian color ni relieve.",
      },
      bad: {
        caption: "Raya profunda que deja marca de otro tono o relieve — no es tolerable, a diferencia de una raya superficial.",
      },
    },
  ],
  porcelanatos: [
    {
      title: "Alineación de canterías",
      toleranceRef: "Alineación de canterías: ±2 mm en 3 m",
      good: {
        caption: "Líneas de junta rectas y parejas en ambos sentidos.",
      },
      bad: {
        caption: "Líneas de junta desalineadas — fuera de la tolerancia de ±2 mm en 3 m.",
      },
    },
    {
      title: "Aspecto superficial",
      toleranceRef: "Variación de tonalidad de una palmeta vs. el resto: 5 % si no es evidente",
      good: {
        caption: "Sin manchas ni diferencias de tono evidentes entre palmetas.",
      },
      bad: {
        caption: "Palmeta con tono claramente distinto al resto — supera el 5% de variación aceptable.",
      },
    },
  ],
  pinturas: [
    {
      title: "Interior",
      toleranceRef: "Sombras con luz angulada, máx. 1 mm de espesor y 5 mm de largo, observadas a 1 m",
      good: {
        caption: "Superficie pareja con luz angulada desde 1 metro, sin sombras marcadas.",
      },
      bad: {
        caption: "Sombra visible con luz angulada a 1 metro, mayor a 1 mm de espesor o 5 mm de largo — defecto no tolerable.",
      },
    },
    {
      title: "Exterior",
      toleranceRef: "Se aceptan imperfecciones no detectables a distancia mínima de 5 m",
      good: {
        caption: "Sin imperfecciones visibles a 5 metros de distancia.",
      },
      bad: {
        caption: "Mancha o corrimiento visible a 5 metros — no cumple la tolerancia.",
      },
    },
  ],
  muebles: [
    {
      title: "Paralelismo de puertas",
      toleranceRef: "Paralelismo entre puertas y/o cajones del mueble: 2 mm",
      good: {
        caption: "Puertas del mueble alineadas entre sí, separación pareja.",
      },
      bad: {
        caption: "Puerta más separada de su vecina que el resto — fuera de tolerancia de 2 mm.",
      },
    },
    {
      title: "Horizontalidad de mesón",
      toleranceRef: "Horizontalidad de superficies de mesones: 1 mm por metro lineal",
      good: {
        caption: "Mesón nivelado en toda su extensión.",
      },
      bad: {
        caption: "Mesón con pendiente visible — supera 1 mm por metro lineal de tolerancia.",
      },
    },
  ],
  interruptores: [
    {
      title: "Alineación entre artefactos",
      toleranceRef: "Alineación entre artefactos: ±2 mm",
      good: {
        caption: "Interruptores cercanos alineados entre sí, mismo nivel.",
      },
      bad: {
        caption: "Interruptor visiblemente más alto o bajo que el vecino — fuera de tolerancia de ±2 mm.",
      },
    },
    {
      title: "Horizontalidad",
      toleranceRef: "Horizontalidad del artefacto: ±1 mm",
      good: {
        caption: "Tapa perfectamente horizontal.",
      },
      bad: {
        caption: "Tapa inclinada, visible a simple vista — fuera de tolerancia de ±1 mm.",
      },
    },
  ],
  enchufes: [
    {
      title: "Alineación entre artefactos",
      toleranceRef: "Alineación entre artefactos: ±2 mm",
      good: {
        caption: "Enchufes cercanos alineados entre sí, mismo nivel.",
      },
      bad: {
        caption: "Enchufe visiblemente desalineado respecto al vecino.",
      },
    },
    {
      title: "Horizontalidad",
      toleranceRef: "Horizontalidad del artefacto: ±1 mm",
      good: {
        caption: "Enchufe instalado nivelado, tapa horizontal.",
      },
      bad: {
        caption: "Enchufe inclinado — fuera de tolerancia de ±1 mm.",
      },
    },
  ],
};
