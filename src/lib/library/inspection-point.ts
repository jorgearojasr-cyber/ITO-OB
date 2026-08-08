// Modelo de presentación para un "punto de inspección" dentro de la
// Biblioteca Técnica (ej. "Uniformidad del color" dentro de Pintura).
// No corresponde a ninguna tabla de Prisma: hoy no existe una fuente de
// datos por punto (imágenes Bien/Mal, video, estado de producción) más
// allá del nombre del punto (LibraryArticle.quickCheckItems, ya real).
// Este tipo deja preparada la forma que va a tomar ese contenido cuando
// se cargue de forma masiva, sin requerir cambios de componente después.

export type InspectionPointStatus = "sin-contenido" | "en-produccion" | "completo";

export type InspectionPoint = {
  id: string;
  name: string;
  description?: string | null;
  observations?: string[];
  // La mayoría de los puntos se verifican a simple vista y por lo tanto
  // necesitan comparación fotográfica Bien/Mal. Algunos se verifican por
  // tacto, oído o una prueba funcional (ej. "Sonido hueco" en piso) y no
  // tiene sentido forzarlos a un formato de foto -- needsImages:false
  // oculta la grilla de comparación para esos casos.
  needsImages?: boolean;
  bienImageUrl?: string | null;
  malImageUrl?: string | null;
  // Un punto puede requerir video (ej. "Funcionamiento de una ventana")
  // sin tener todavía el archivo cargado -- por eso son dos campos
  // independientes: requiresVideo decide si la sección se muestra,
  // videoUrl decide si muestra el video real o un placeholder.
  requiresVideo?: boolean;
  videoUrl?: string | null;
  status: InspectionPointStatus;
};

export const INSPECTION_POINT_STATUS_LABEL: Record<InspectionPointStatus, string> = {
  "sin-contenido": "Sin contenido",
  "en-produccion": "En producción",
  completo: "Completo",
};
