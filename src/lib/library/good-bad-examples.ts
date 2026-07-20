// Pares "Bien hecho / Mal hecho" por categoría de Biblioteca técnica,
// basados directamente en las tolerancias de tolerances-manual.ts.
// Piloto en 3 categorías (Ventanas, Puertas, Cerámicos) — las que ya
// tienen ficha real del manual con contenido lo bastante concreto para
// ilustrar un caso correcto vs. uno incorrecto.
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
};
