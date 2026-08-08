// Modelo del Sistema Maestro de Producción Visual — herramienta interna
// de producción, no visible para el usuario final de ObraBien. No es una
// tabla de Prisma: es contenido/estado versionado en código, mismo
// patrón que inspection-points-data.ts. Se puede migrar a un modelo de
// base de datos más adelante si la producción masiva lo requiere; por
// ahora (etapa de preparación, ninguna imagen generada todavía) no hay
// necesidad de persistencia con escritura concurrente.

export type ImageStatus = "pendiente" | "prompt-listo" | "generada" | "revisada" | "aprobada" | "integrada";

export type ImageType = "BIEN" | "MAL";

export type Framing = "general" | "medio" | "primer-plano";

export type LightCondition = "difusa" | "rasante";

export const IMAGE_STATUS_LABEL: Record<ImageStatus, string> = {
  pendiente: "Pendiente",
  "prompt-listo": "Prompt listo",
  generada: "Generada",
  revisada: "Revisada",
  aprobada: "Aprobada",
  integrada: "Integrada",
};

export type ProductionImage = {
  // Código único: IMG-{número de toma}-B para la imagen Bien, o
  // IMG-{número de toma}-M{01,02,...} para cada variante Mal.
  code: string;
  tomaCode: string;
  type: ImageType;
  // Nombre corto de la variante (ej. "Traslapo visible") -- obligatorio
  // en MAL cuando una misma toma produce varias variantes de defecto,
  // opcional en BIEN.
  variantLabel?: string;
  status: ImageStatus;
  observations?: string;
};

export type ProductionTake = {
  // Código único dentro del escenario: T-001, T-002, ...
  code: string;
  scenarioCode: string;
  name: string;
  description: string;
  framing: Framing;
  light: LightCondition;
  // Referencia de solo lectura a los puntos reales de la Biblioteca
  // Técnica que esta toma resuelve (ids de InspectionPoint en
  // inspection-points-data.ts) -- nunca se duplica el texto del punto,
  // solo se referencia su id para trazabilidad.
  inspectionPointIds: string[];
  images: ProductionImage[];
};

export type ProductionScenario = {
  // Código único: ESC-001, ESC-002, ...
  code: string;
  name: string;
  elementSlug: string;
  elementName: string;
  materialLabel: string;
  // Constantes del escenario -- lo que nunca cambia entre tomas de un
  // mismo escenario (misma vivienda, misma cámara, mismo punto de vista
  // base, mismo criterio de color).
  location: string;
  camera: string;
  baseLight: string;
  colorCriteria: string;
  viewpoint: string;
  takes: ProductionTake[];
};
