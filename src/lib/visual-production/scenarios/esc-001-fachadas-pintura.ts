// ESC-001 -- Fachada, Pintura sobre estuco.
//
// Primer escenario del Sistema Maestro de Producción Visual, completo y
// listo para producción según el plan aprobado en
// docs/ObraBien-Plan-Produccion-Biblioteca-Visual.md.
//
// Los inspectionPointIds referencian directamente los ids reales
// generados en inspection-points-data.ts para la clave
// "fachadas:pintura" (build("fachadas-pintura", FACHADA_HUMEDA_SOBRE_ESTUCO)):
//   0 Plomo y regla · 1 Fisuras de retracción · 2 Fisuras estructurales
//   3 Color y textura uniformes · 4 Filtraciones muro-alero
//   5 Esquinas y contornos de vanos · 6 Humedad ascendente
//   7 Sellos en marcos · 8 Uniformidad de grano (no aplica a Pintura lisa)
//
// Todas las imágenes nacen en estado "pendiente" -- no se generó ninguna
// imagen en este Sprint, solo se preparó la estructura.

import type { ProductionScenario } from "../types";

export const ESC_001_FACHADAS_PINTURA: ProductionScenario = {
  code: "ESC-001",
  name: "Fachada — Pintura sobre estuco",
  elementSlug: "fachadas",
  elementName: "Fachadas",
  materialLabel: "Pintura sobre estuco",
  location: "Vivienda de referencia con fachada de pintura lisa recién entregada, terminación impecable.",
  camera: "Misma cámara/lente en todas las tomas de este escenario, para mantener consistencia de perspectiva.",
  baseLight: "Luz de día natural. Cada toma especifica si requiere luz difusa o rasante.",
  colorCriteria: "Balance de blancos fijo para todo el escenario -- no ajustar entre tomas, para que el color sea comparable entre imágenes.",
  viewpoint: "Fachada principal orientada de forma que reciba luz rasante lateral al atardecer, para poder resolver T-002 y T-003 sin cambiar de vivienda.",
  takes: [
    {
      code: "T-001",
      scenarioCode: "ESC-001",
      name: "Vista general del paño",
      description: "Encuadre general (~4-5 m) de un paño de muro limpio, sin vehículos ni personas. Resuelve el punto de uniformidad de color y textura, con varias variantes de defecto reutilizando el mismo encuadre.",
      framing: "general",
      light: "difusa",
      inspectionPointIds: ["fachadas-pintura-3"],
      images: [
        { code: "IMG-001-B", tomaCode: "T-001", type: "BIEN", status: "pendiente" },
        { code: "IMG-001-M01", tomaCode: "T-001", type: "MAL", variantLabel: "Traslapo visible", status: "pendiente" },
        { code: "IMG-001-M02", tomaCode: "T-001", type: "MAL", variantLabel: "Marca de rodillo", status: "pendiente" },
        { code: "IMG-001-M03", tomaCode: "T-001", type: "MAL", variantLabel: "Diferencia de brillo entre paños", status: "pendiente" },
        { code: "IMG-001-M04", tomaCode: "T-001", type: "MAL", variantLabel: "Escurrimiento", status: "pendiente" },
        { code: "IMG-001-M05", tomaCode: "T-001", type: "MAL", variantLabel: "Parche o mancha de retoque", status: "pendiente" },
      ],
    },
    {
      code: "T-002",
      scenarioCode: "ESC-001",
      name: "Regla apoyada en el muro",
      description: "Encuadre medio (~1-1,5 m) con la regla de 2 m apoyada contra el muro. Requiere luz rasante para que la sombra bajo la regla revele ondulaciones.",
      framing: "medio",
      light: "rasante",
      inspectionPointIds: ["fachadas-pintura-0"],
      images: [
        { code: "IMG-002-B", tomaCode: "T-002", type: "BIEN", status: "pendiente" },
        { code: "IMG-002-M01", tomaCode: "T-002", type: "MAL", variantLabel: "Ondulación bajo la regla", status: "pendiente" },
      ],
    },
    {
      code: "T-003",
      scenarioCode: "ESC-001",
      name: "Primer plano de fisuras",
      description: "Primer plano (~20-40 cm) con elemento de escala en el marco. Luz rasante, misma sesión que T-002. Resuelve dos puntos de inspección con el mismo encuadre, sin duplicarlo.",
      framing: "primer-plano",
      light: "rasante",
      inspectionPointIds: ["fachadas-pintura-1", "fachadas-pintura-2"],
      images: [
        { code: "IMG-003-B", tomaCode: "T-003", type: "BIEN", status: "pendiente" },
        { code: "IMG-003-M01", tomaCode: "T-003", type: "MAL", variantLabel: "Fisura capilar (de retracción)", status: "pendiente" },
        { code: "IMG-003-M02", tomaCode: "T-003", type: "MAL", variantLabel: "Fisura estructural (con espesor)", status: "pendiente" },
      ],
    },
    {
      code: "T-004",
      scenarioCode: "ESC-001",
      name: "Encuentro muro-alero",
      description: "Encuadre medio, cámara hacia arriba, la unión entre el muro y el alero. Luz difusa.",
      framing: "medio",
      light: "difusa",
      inspectionPointIds: ["fachadas-pintura-4"],
      images: [
        { code: "IMG-004-B", tomaCode: "T-004", type: "BIEN", status: "pendiente" },
        { code: "IMG-004-M01", tomaCode: "T-004", type: "MAL", variantLabel: "Filtración/mancha de humedad", status: "pendiente" },
      ],
    },
    {
      code: "T-005",
      scenarioCode: "ESC-001",
      name: "Esquina de vano — vista completa",
      description: "Encuadre medio de una esquina de ventana o puerta exterior. Luz difusa. Mismo lugar físico que T-006, sin mover el trípode.",
      framing: "medio",
      light: "difusa",
      inspectionPointIds: ["fachadas-pintura-5"],
      images: [
        { code: "IMG-005-B", tomaCode: "T-005", type: "BIEN", status: "pendiente" },
        { code: "IMG-005-M01", tomaCode: "T-005", type: "MAL", variantLabel: "Terminación irregular de esquina/contorno", status: "pendiente" },
      ],
    },
    {
      code: "T-006",
      scenarioCode: "ESC-001",
      name: "Esquina de vano — sello en primer plano",
      description: "Primer plano de la línea de sello, mismo lugar físico que T-005, solo cambia el zoom. Luz difusa.",
      framing: "primer-plano",
      light: "difusa",
      inspectionPointIds: ["fachadas-pintura-7"],
      images: [
        { code: "IMG-006-B", tomaCode: "T-006", type: "BIEN", status: "pendiente" },
        { code: "IMG-006-M01", tomaCode: "T-006", type: "MAL", variantLabel: "Sello cortado o discontinuo", status: "pendiente" },
      ],
    },
    {
      code: "T-007",
      scenarioCode: "ESC-001",
      name: "Base del muro",
      description: "Encuadre medio a nivel de piso, franja inferior del muro cercana al terreno. Luz difusa.",
      framing: "medio",
      light: "difusa",
      inspectionPointIds: ["fachadas-pintura-6"],
      images: [
        { code: "IMG-007-B", tomaCode: "T-007", type: "BIEN", status: "pendiente" },
        { code: "IMG-007-M01", tomaCode: "T-007", type: "MAL", variantLabel: "Humedad ascendente por capilaridad", status: "pendiente" },
      ],
    },
  ],
};
