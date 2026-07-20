import { TOLERANCE_MANUAL_SOURCE } from "./tolerances-manual";

export type ToleranceTip = {
  categoryLabel: string;
  text: string;
  source: string;
};

// Los primeros 5 son las partidas donde el manual exige una distancia u
// condición de luz específica para detectar el defecto — son las más
// accionables en terreno. Enchapes de madera no tiene categoría propia
// en la Biblioteca técnica hoy; el consejo igual es contenido válido del
// manual.
export const toleranceTips: ToleranceTip[] = [
  {
    categoryLabel: "Pinturas interiores",
    text: "Revisa a 1 metro de distancia, con luz de día o la iluminación final del recinto. Solo cuentan como defecto las sombras de más de 1 mm de espesor y 5 mm de largo.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Pinturas exteriores",
    text: "Revisa a 5 metros de distancia, con luz de día. Lo que no se note desde ahí, no es defecto.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Ventanas",
    text: "Párate a 4 metros y acércate hasta detectar la falla. Si la ves recién antes de 1 metro, es un defecto leve; si la ves a más de 3,3 metros, es defecto alto.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Cerámicas y porcelanatos",
    text: "Revisa manchas o diferencias de tono a 1 metro, con luz de día o la iluminación definitiva del recinto.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Enchapes de madera",
    text: "Máximo 2 rayas o saltaduras por cara, y solo si no se ven a más de 1 metro de distancia.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Puertas",
    text: "Con la puerta cerrada, no debería verse luz entre la hoja y el marco: el manual permite un desajuste máximo de 3 mm.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Pisos",
    text: "Camina por todo el piso flotante: no debería ceder ni sonar hueco. La planeidad tolerada es de 3 mm cada 3 metros.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Muebles",
    text: "Revisa que las puertas y cajones de los muebles queden parejos entre sí: la tolerancia es de 2 mm.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
  {
    categoryLabel: "Enchufes e interruptores",
    text: "Compara la altura entre enchufes e interruptores cercanos: no deberían diferir más de 2 mm.",
    source: TOLERANCE_MANUAL_SOURCE,
  },
];
