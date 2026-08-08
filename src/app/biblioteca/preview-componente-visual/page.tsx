import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { InspectionPointList } from "@/components/biblioteca/InspectionPointList";
import type { InspectionPoint } from "@/lib/library/inspection-point";
import styles from "./page.module.css";

// Ruta interna de revisión de diseño -- no está enlazada desde ningún
// menú. Sirve para mostrar el componente reutilizable de "punto de
// inspección" con datos de ejemplo (no contenido real de ningún
// artículo) mientras se decide el diseño definitivo, antes de la carga
// masiva de imágenes Bien/Mal.

const VENTANAS_POINTS: InspectionPoint[] = [
  {
    id: "ventanas-sellos",
    name: "Sellos",
    description: "Revisa que el sello perimetral entre el marco y el muro sea continuo, sin cortes ni burbujas de aire.",
    observations: [
      "Presiona suavemente el sello con el dedo: no debe estar seco ni quebradizo.",
      "Revisa especialmente las esquinas, donde es más común que falte sello.",
    ],
    status: "completo",
  },
  {
    id: "ventanas-vidrios",
    name: "Vidrios",
    description: "Verifica que el vidrio no tenga rayas, burbujas, ni marcas de golpes, y que ambos paños del termopanel estén limpios por dentro.",
    observations: ["Si ves humedad o manchas entre los dos vidrios, es un defecto del sellado del termopanel."],
    status: "en-produccion",
  },
  {
    id: "ventanas-marco",
    name: "Marco",
    description: "El marco debe estar a escuadra, sin pandeos, y con las mismas holguras a ambos lados de la hoja.",
    status: "sin-contenido",
  },
  {
    id: "ventanas-funcionamiento",
    name: "Funcionamiento",
    description: "Abre y cierra la ventana completa varias veces: debe deslizar o girar sin forzarla ni rozar el marco.",
    observations: [
      "Prueba también el seguro/pestillo: debe trabar sin necesidad de levantar o empujar la hoja.",
    ],
    requiresVideo: true,
    status: "sin-contenido",
  },
  {
    id: "ventanas-rayas",
    name: "Rayas",
    description: "Revisa el marco y el vidrio con luz rasante (de lado) para detectar rayas superficiales que a simple vista no se ven.",
    status: "sin-contenido",
  },
];

const PUERTAS_POINTS: InspectionPoint[] = [
  {
    id: "puertas-cuadratura",
    name: "Cuadratura",
    description: "La puerta debe cerrar pareja, con la misma holgura arriba, abajo y a los costados del marco.",
    status: "sin-contenido",
  },
  {
    id: "puertas-cerradura",
    name: "Cerradura",
    description: "Prueba llave y manilla varias veces: debe trabar y destrabar sin forzar ni requerir ajustar la puerta con la mano.",
    requiresVideo: true,
    status: "sin-contenido",
  },
  {
    id: "puertas-pintura",
    name: "Pintura",
    description: "La pintura o barniz debe cubrir parejo, sin escurrimientos, burbujas ni zonas sin cubrir en los bordes.",
    status: "sin-contenido",
  },
  {
    id: "puertas-bisagras",
    name: "Bisagras",
    description: "Las bisagras deben estar firmes, alineadas y sin ruido al mover la puerta.",
    status: "sin-contenido",
  },
];

const PINTURA_POINTS: InspectionPoint[] = [
  {
    id: "pintura-uniformidad",
    name: "Uniformidad del color",
    description: "El color debe verse parejo en todo el muro, sin manchas más oscuras ni zonas con distinto brillo.",
    observations: ["Revisa con luz angulada (de lado), no de frente: así se notan más las diferencias."],
    status: "sin-contenido",
  },
  {
    id: "pintura-traslapos",
    name: "Traslapos",
    description: "No deben verse las marcas donde el pintor retomó el rodillo: franjas o líneas ligeramente más oscuras.",
    status: "sin-contenido",
  },
  {
    id: "pintura-cobertura",
    name: "Cobertura",
    description: "La pintura debe cubrir completamente la superficie, sin dejar ver el color o material de base.",
    status: "sin-contenido",
  },
];

export default function PreviewComponenteVisualPage() {
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title="Vista previa — Componente visual" backHref="/biblioteca" />
        <p className={styles.notice}>
          Ruta interna de revisión de diseño. Los textos y estados son datos de ejemplo, no contenido real de la
          Biblioteca Técnica. Ninguna imagen ni video es definitivo.
        </p>
        <InspectionPointList title="Ventanas" points={VENTANAS_POINTS} />
        <InspectionPointList title="Puertas" points={PUERTAS_POINTS} />
        <InspectionPointList title="Pintura" points={PINTURA_POINTS} />
      </div>
      <BottomNav active="biblioteca" />
    </div>
  );
}
