// Resumen estructurado de las 26 fichas del "Manual de Tolerancias para
// Edificaciones", CDT (Corporación de Desarrollo Tecnológico) — Cámara
// Chilena de la Construcción, 3ª edición, 2018 (Documento Técnico CDT N°42).
// Fuente del resumen: docs/obrabien-manual-tolerancias-resumen.docx.
//
// Nota del manual: cuando existan Especificaciones Técnicas del proyecto,
// estas prevalecen sobre los valores de esta ficha.
//
// Este archivo es una transcripción fiel del documento — no mezcla mapeo
// a categorías de la Biblioteca técnica de la app (eso vive aparte).

export type ToleranceItem = {
  parameter: string;
  tolerance: string;
  verification: string;
};

export type GlassDefectIntensityLevel = {
  intensity: "Alta" | "Media" | "Leve" | "Débil";
  distance: string;
};

export type ToleranceFicha = {
  id: number;
  name: string;
  description: string;
  /** Presente solo en las fichas donde el manual exige una distancia u
   *  condición de luz específica para detectar el defecto. */
  distanceLight?: string;
  /** Solo en la ficha 13 (Ventanas): protocolo ASTM 1036-01 — la
   *  distancia a la que se detecta una falla lineal en el vidrio define
   *  su nivel de intensidad. */
  glassDefectIntensityByDistance?: GlassDefectIntensityLevel[];
  items: ToleranceItem[];
};

export const toleranceManual: ToleranceFicha[] = [
  {
    id: 1,
    name: "Muros de Albañilería de Ladrillos",
    description: "Muros confeccionados de albañilería de ladrillos cerámicos hechos a máquina.",
    items: [
      { parameter: "Espesor cantería (10–15 mm)", tolerance: "-1 mm / +3 mm", verification: "Huincha o regla graduada, antes de tratamiento superficial" },
      { parameter: "Espesor cantería (15–20 mm)", tolerance: "± 3 mm", verification: "Ídem" },
      { parameter: "Pérdida de linealidad en junta horizontal", tolerance: "± 4 mm / 3 m", verification: "Instrumento topográfico o nivel manual con regla" },
      { parameter: "Unidades con fisuras (máx. por paño)", tolerance: "2 %", verification: "Conteo de unidades fisuradas / total del paño" },
      { parameter: "Verticalidad (h ≤ 3 m)", tolerance: "0,2 % de h", verification: "Nivel manual con regla de 2 m, antes de tratamiento superficial" },
      { parameter: "Verticalidad (3 m < h ≤ 6 m)", tolerance: "0,15 % de h", verification: "Plomo o instrumento topográfico" },
      { parameter: "Verticalidad (6 m < h ≤ 12 m)", tolerance: "0,1 % de h", verification: "Plomo o instrumento topográfico" },
      { parameter: "Planeidad de superficie", tolerance: "± 3 mm / lado alineado", verification: "Regla de 1,2 m, medir contra el paño" },
      { parameter: "Verticalidad entre unidades adyacentes", tolerance: "± 3 mm", verification: "Plomada" },
      { parameter: "Alineamiento hilada superior", tolerance: "± 6 mm / 3 m", verification: "Regla de 3 m horizontal sobre la hilada" },
    ],
  },
  {
    id: 2,
    name: "Muros de Hormigón",
    description: "Muros construidos in situ en hormigón, estructura soportante. Clasificación G1 (arquitectónico a la vista) a G4 (obra gruesa).",
    items: [
      { parameter: "Planeidad (h ≤ 1,5 m)", tolerance: "G1 ±4 · G2 ±5 · G3 ±7 · G4 ±8 mm", verification: "Regla de 1,2 m o más en distintas ubicaciones y direcciones" },
      { parameter: "Planeidad (h ≤ 3 m)", tolerance: "G1 ±6 · G2 ±7 · G3 ±12 · G4 ±15 mm", verification: "Ídem" },
      { parameter: "Planeidad (3 < h ≤ 6 m)", tolerance: "G1 ±10 · G2 ±12 · G3 ±18 · G4 ±20 mm", verification: "Regla de 3 m (onda larga)" },
      { parameter: "Planeidad (h > 6 m)", tolerance: "G1 ±25 · G2 ±30 · G3 ±30 · G4 ±30 mm", verification: "Regla de 3 m (onda larga)" },
      { parameter: "Resaltes puntuales y lineales", tolerance: "G1 3 · G2 5 · G3 5 · G4 8 mm", verification: "Regla + laina o galga" },
      { parameter: "Variaciones respecto a ejes", tolerance: "G1 ±5 · G2 ±6 · G3 ±10 · G4 ±15 mm", verification: "Medición desde eje de replanteo" },
      { parameter: "Variaciones en vanos", tolerance: "G1 ±5 · G2 ±5 · G3 ±5 · G4 ±10 mm", verification: "Huincha en el vano" },
      { parameter: "Cuadratura muro–losa (cielo o piso)", tolerance: "2 mm", verification: "Escuadra + regla pequeña graduada a 40 cm" },
      { parameter: "Cuadratura muro–muro", tolerance: "3 mm", verification: "Ídem" },
      { parameter: "Espesor de muro (e ≤ 30 cm)", tolerance: "+10 mm / -6 mm", verification: "Huincha en bordes libres, vanos o perforaciones" },
      { parameter: "Espesor de muro (30 < e ≤ 60 cm)", tolerance: "+13 mm / -10 mm", verification: "Ídem" },
      { parameter: "Espesor de muro (e > 60 cm)", tolerance: "+25 mm / -19 mm", verification: "Ídem" },
    ],
  },
  {
    id: 3,
    name: "Losas de Hormigón",
    description: "Losas de hormigón armado colado in situ, como piso (G5/G6) o como cielo (G1–G4).",
    distanceLight: "Medición antes de colocar el revestimiento de piso y después de 2 días de haber retirado las alzaprimas.",
    items: [
      { parameter: "Planeidad piso (L ≤ 1,5 m)", tolerance: "G5 ±3 · G6 ±4 mm", verification: "Regla de largo conforme a la losa, o cuadrícula + nivel topográfico" },
      { parameter: "Planeidad piso (1,5 < L ≤ 3 m)", tolerance: "G5 ±5 · G6 ±7 mm", verification: "Ídem" },
      { parameter: "Planeidad piso (3 < L ≤ 6 m)", tolerance: "G5 ±7 · G6 ±10 mm", verification: "Ídem" },
      { parameter: "Planeidad piso (L > 6 m)", tolerance: "G5 ±10 · G6 ±15 mm", verification: "Ídem" },
      { parameter: "Planeidad cielo (L ≤ 1,5 m)", tolerance: "G1 ±6 · G2 ±7 · G3 ±8 · G4 ±9 mm", verification: "Ídem, sobre cara inferior" },
      { parameter: "Planeidad cielo (L > 6 m)", tolerance: "G1 ±20 · G2 ±22 · G3 ±25 · G4 ±30 mm", verification: "Ídem" },
      { parameter: "Variación de espesor", tolerance: "-6 mm", verification: "Huincha en bordes libres/vanos de escalera, testigos o nivel topográfico" },
      { parameter: "Variación de pendiente", tolerance: "± 0,5 %", verification: "Nivel topográfico" },
    ],
  },
  {
    id: 4,
    name: "Radieres de Hormigón",
    description: "Radieres de hormigón ejecutados in situ; misma clasificación G5/G6 que losas como piso.",
    distanceLight: "Mediciones antes de instalar el revestimiento de piso.",
    items: [
      { parameter: "Planeidad (L ≤ 1,5 m)", tolerance: "G5 ±3 · G6 ±4 mm", verification: "Regla o cuadrícula + nivel topográfico" },
      { parameter: "Planeidad (1,5 < L ≤ 3 m)", tolerance: "G5 ±5 · G6 ±7 mm", verification: "Ídem" },
      { parameter: "Planeidad (3 < L ≤ 6 m)", tolerance: "G5 ±7 · G6 ±10 mm", verification: "Ídem" },
      { parameter: "Planeidad (L > 6 m)", tolerance: "G5 ±10 · G6 ±15 mm", verification: "Ídem" },
    ],
  },
  {
    id: 5,
    name: "Tabiques",
    description: "Tabiques con entramado de madera o metálico, revestidos con placas de distinta materialidad.",
    items: [
      { parameter: "Distancia entre fijaciones", tolerance: "± 10 mm", verification: "Huincha o regla graduada, antes de intervenir las planchas" },
      { parameter: "Distancia de fijación al borde de plancha", tolerance: "± 2 mm", verification: "Ídem" },
      { parameter: "Distancia entre planchas", tolerance: "+ 3 mm", verification: "Ídem" },
      { parameter: "Planeidad tabique sin huinchas", tolerance: "± 5 mm", verification: "Regla adecuada al tamaño del paño" },
      { parameter: "Planeidad tabique terminado", tolerance: "± 3 mm", verification: "Ídem" },
      { parameter: "Verticalidad (altura piso–cielo)", tolerance: "máx. 5 mm", verification: "Plomo a 5 cm del borde superior" },
      { parameter: "Cuadratura tabique–tabique", tolerance: "3 mm (escuadra a 40 cm)", verification: "Escuadra + regla graduada" },
      { parameter: "Cuadratura tabique–cielo", tolerance: "3 mm (escuadra a 40 cm)", verification: "Ídem, antes de colocar cornisas o esquineros" },
    ],
  },
  {
    id: 6,
    name: "Encuentro de Paramentos",
    description: "Encuentros de paramentos verticales, independiente de su materialidad.",
    items: [
      { parameter: "Verticalidad", tolerance: "± 2 mm por metro de altura", verification: "Plomo en eje auxiliar a 5 cm del borde superior" },
    ],
  },
  {
    id: 7,
    name: "Cielos Rasos",
    description: "Cielos con entramado de madera o metálico revestidos con placas.",
    items: [
      { parameter: "Planeidad", tolerance: "± 3 mm con regla de 1,2 m o más, en cualquier dirección", verification: "Regla + laina o galga, sobre el cielo terminado" },
    ],
  },
  {
    id: 8,
    name: "Estucos",
    description: "Estuco de mortero de cemento, con o sin aditivos, como revestimiento de muros y otros elementos.",
    items: [
      { parameter: "Verticalidad de líneas, superficies y encuentros", tolerance: "± 5 mm en la altura de un piso", verification: "Nivel manual, plomo o instrumento topográfico" },
      { parameter: "Planeidad", tolerance: "± 5 mm (regla en cualquier posición y dirección)", verification: "Regla adecuada al elemento, con cero en el borde" },
    ],
  },
  {
    id: 9,
    name: "Enlucidos de Yeso",
    description: "Enlucidos de yeso; los elementos base deben cumplir además las tolerancias de sus fichas correspondientes.",
    items: [
      { parameter: "Planeidad", tolerance: "± 3 mm con regla de 1,2 m o más, en cualquier dirección", verification: "Regla graduada" },
      { parameter: "Linealidad de aristas", tolerance: "± 3 mm por metro", verification: "Instrumento graduado con trazos auxiliares" },
      { parameter: "Verticalidad de aristas", tolerance: "± 2 mm por metro", verification: "Nivel de burbuja" },
      { parameter: "Cuadratura de esquinas internas y externas", tolerance: "3 mm con escuadra de 30 cm", verification: "Escuadra de 30 cm, en varios puntos del encuentro" },
    ],
  },
  {
    id: 10,
    name: "Revestimientos Cerámicos",
    description: "Terminación de revestimientos cerámicos y porcelanatos, verticales u horizontales.",
    distanceLight: "Observador a 1 m de la superficie, con luz día o la iluminación definitiva que tendrá el recinto.",
    items: [
      { parameter: "Variación de tonalidad de una palmeta vs. el resto", tolerance: "5 % si no es evidente", verification: "Observación directa" },
      { parameter: "Defectos de esmalte/impresión (lista de 10 tipos)", tolerance: "Máximo 5 %", verification: "Observación directa" },
      { parameter: "Palmetas quebradas, despuntadas, con grietas o sin esmalte", tolerance: "No se aceptan", verification: "Observación directa" },
      { parameter: "Desnivel entre palmetas en pisos", tolerance: "1 mm", verification: "Regla con cero en el borde + instrumento graduado" },
      { parameter: "Desnivel entre palmetas en otras superficies", tolerance: "2 mm", verification: "Regla con cero en el borde + instrumento graduado" },
      { parameter: "Contacto del adhesivo con la palmeta", tolerance: "Mínimo 70 % de la superficie", verification: "Golpe con martillo pequeño: sonido hueco = adhesivo insuficiente" },
      { parameter: "Alineación de canterías (ambos sentidos)", tolerance: "± 2 mm en 3 m", verification: "Regla o lienza" },
      { parameter: "Espesor de canterías", tolerance: "± 2 mm", verification: "Regla graduada, perpendicular" },
    ],
  },
  {
    id: 11,
    name: "Gradas de Escaleras",
    description: "Dimensiones de gradas con su recubrimiento de terminación.",
    items: [
      { parameter: "Altura de contrahuella", tolerance: "± 5 mm", verification: "Huincha o regla graduada con cero en el extremo" },
      { parameter: "Diferencia entre 2 gradas consecutivas", tolerance: "± 5 mm", verification: "Ídem" },
      { parameter: "Huella", tolerance: "± 5 mm", verification: "Ídem" },
      { parameter: "Puntos de medición (ancho ≤ 0,75 m)", tolerance: "1 medición por grada, al centro", verification: "—" },
      { parameter: "Puntos de medición (0,75–1,5 m)", tolerance: "2 mediciones por grada, a 1/3 y 2/3", verification: "—" },
      { parameter: "Puntos de medición (> 1,5 m)", tolerance: "1 medición cada 0,75 m de ancho", verification: "—" },
    ],
  },
  {
    id: 12,
    name: "Puertas",
    description: "Marcos y hojas de puertas de madera o con bastidor de madera.",
    items: [
      { parameter: "Verticalidad del vano", tolerance: "± 0,3 % de la altura", verification: "Plomada desde la parte superior del vano" },
      { parameter: "Horizontalidad del vano", tolerance: "± 0,3 % del ancho", verification: "Nivel carpintero" },
      { parameter: "Altura del vano", tolerance: "± 6 mm", verification: "Huincha, en extremos y centro" },
      { parameter: "Ancho del vano", tolerance: "± 6 mm", verification: "Huincha, mínimo 3 medidas" },
      { parameter: "Rectitud de bastidores (cabezales/batientes)", tolerance: "± 1,5 mm", verification: "Regla igual o mayor a la dimensión de la hoja" },
      { parameter: "Planeidad de la hoja", tolerance: "± 3 mm", verification: "Regla de 1,2 m o más" },
      { parameter: "Paralelismo entre hoja y marco", tolerance: "3 mm", verification: "Huincha o regla pequeña, hoja instalada y cerrada" },
      { parameter: "Paralelismo entre puertas de dos hojas", tolerance: "3 mm", verification: "Ídem, entre bordes adyacentes" },
    ],
  },
  {
    id: 13,
    name: "Ventanas",
    description: "Marcos y hojas de ventanas en aluminio o PVC.",
    distanceLight:
      "Marcos y hojas: observador a 1,5 m perpendicular. Vidrios: protocolo ASTM 1036-01 — muestra en posición vertical, observador comienza a 4 m y se acerca hasta detectar la falla mirando a 90°, con luz de día (sin sol directo) o iluminación equivalente a mínimo 160 pie-candela (1722 lux). La distancia a la que se detecta la falla define su intensidad: > 3,3 m = Alta · 3,3–1,01 m = Media · 1–0,2 m = Leve · < 0,2 m = Débil.",
    glassDefectIntensityByDistance: [
      { intensity: "Alta", distance: "> 3,3 m" },
      { intensity: "Media", distance: "3,3–1,01 m" },
      { intensity: "Leve", distance: "1–0,2 m" },
      { intensity: "Débil", distance: "< 0,2 m" },
    ],
    items: [
      { parameter: "Manchas, rayas, abolladuras o decoloraciones", tolerance: "Puntuales, máx. 2 por componente, no visibles a 1,5 m", verification: "Observación perpendicular a 1,5 m" },
      { parameter: "Paralelismo entre hojas y entre marco y hojas", tolerance: "± 2 mm; sin luz visible con ventana cerrada", verification: "Instrumento graduado" },
      { parameter: "Defecto lineal en vidrio — intensidad Débil", tolerance: "Permitido (incoloro y tinteado/reflectivo)", verification: "Ver protocolo de detección arriba" },
      { parameter: "Defecto lineal — Leve ≤ 75 mm", tolerance: "Permitido en ambos tipos de vidrio", verification: "Ídem" },
      { parameter: "Defecto lineal — Leve > 75 mm", tolerance: "Permitido en incoloro; no permitido en tinteado/reflectivo", verification: "Ídem" },
      { parameter: "Defecto lineal — Media ≤ 75 mm", tolerance: "Permitido con separación mínima 600 mm en incoloro; no permitido en tinteado", verification: "Ídem" },
      { parameter: "Defecto lineal — Media > 75 mm / Alta", tolerance: "No permitido en ningún tipo de vidrio", verification: "Ídem" },
    ],
  },
  {
    id: 14,
    name: "Revestimientos de Papel",
    description: "Terminación de papeles murales. La junta entre paños no es invisible por definición.",
    items: [
      { parameter: "Piquetes", tolerance: "No observables de pie a 1 m", verification: "Observación de pie a 1 m" },
      { parameter: "Diferencias de tonalidad, mismo código de producto", tolerance: "Aceptable si están en lotes/parámetros distintos", verification: "Respaldo de guías de despacho o facturas" },
      { parameter: "Encuentro papel–cornisa / papel–guardapolvo", tolerance: "1 mm de separación al borde", verification: "Regla pequeña graduada" },
      { parameter: "Encuentro con marcos de ventana u otros", tolerance: "+2 mm (montado) / -1 mm (corto)", verification: "Regla graduada pequeña" },
    ],
  },
  {
    id: 15,
    name: "Enchapes de Madera",
    description: "Enchapes de madera como producto natural: diferencias de tono, veta o rugosidad no constituyen defecto.",
    distanceLight:
      "Observador a 1 m del elemento, con luz día o la iluminación permanente del recinto; si las dimensiones del recinto no lo permiten, la mayor distancia posible en forma perpendicular.",
    items: [
      { parameter: "Rayas y saltaduras", tolerance: "Puntuales, máx. 2 por cara o canto, no visibles a más de 1 m", verification: "Observación perpendicular" },
      { parameter: "Sopladuras", tolerance: "No se aceptan", verification: "Observación directa" },
    ],
  },
  {
    id: 16,
    name: "Guardapolvos y Junquillos",
    description: "Terminación de guardapolvos y junquillos de madera, aglomerados, PVC o cerámicos.",
    items: [
      { parameter: "Distancia guardapolvo–muro", tolerance: "1 mm", verification: "Regla pequeña graduada, visto desde el centro del recinto" },
      { parameter: "Distancia guardapolvo/junquillo–piso terminado", tolerance: "< 3 mm", verification: "Ídem" },
      { parameter: "Alineación en junta entre guardapolvos/junquillos", tolerance: "1 mm", verification: "Ídem" },
      { parameter: "Desajuste en junta entre guardapolvos/junquillos", tolerance: "1 mm", verification: "Ídem" },
      { parameter: "Cerámicos — paralelismo palmeta a muro", tolerance: "± 2 mm", verification: "Regla apoyada en cara exterior del guardapolvo" },
      { parameter: "Cerámicos — diferencia con piso terminado", tolerance: "± 1 mm", verification: "Regla pequeña graduada" },
    ],
  },
  {
    id: 17,
    name: "Alfombras y Cubrepisos",
    description: "Revestimientos de pavimento con alfombras y cubrepisos; las juntas no son invisibles por definición.",
    items: [
      { parameter: "Juntas y encuentros de cubrepisos", tolerance: "1 mm", verification: "Instrumento graduado" },
      { parameter: "Encuentro de alfombra con marcos y pilastras", tolerance: "2 mm", verification: "Instrumento graduado" },
    ],
  },
  {
    id: 18,
    name: "Cornisas",
    description: "Terminación de cornisas; la junta entre cornisas no es invisible por definición.",
    items: [
      { parameter: "Alineación de junta", tolerance: "1 mm", verification: "Instrumento graduado" },
      { parameter: "Desajuste en junta", tolerance: "1 mm", verification: "Instrumento graduado" },
    ],
  },
  {
    id: 19,
    name: "Cubrejuntas",
    description: "Cubrejuntas entre pavimentos de terminación (plásticas, de goma, madera u otro material).",
    items: [
      { parameter: "Linealidad (plásticas y de goma)", tolerance: "± 3 mm; con puerta cerrada no debe ser visible", verification: "Regla de 50 cm paralela al eje del marco" },
      { parameter: "Llegada a marco o vano", tolerance: "2 mm por cada lado", verification: "Instrumento graduado" },
      { parameter: "Uniones de cubrejuntas en distintas direcciones", tolerance: "1 mm", verification: "Instrumento graduado" },
    ],
  },
  {
    id: 20,
    name: "Pilastras",
    description: "Instalación de pilastras junto a marcos de puertas.",
    items: [
      { parameter: "Espacios puntuales en uniones a 45°", tolerance: "1 mm", verification: "Instrumento graduado" },
      { parameter: "Desajuste en junta de pilastras", tolerance: "1 mm", verification: "Instrumento graduado" },
      { parameter: "Espacio entre pilastra y muro liso", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Paralelismo entre pilastras y borde de marco", tolerance: "± 2 mm", verification: "Instrumento graduado" },
      { parameter: "Separación con guardapolvo", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Separación con taco", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Separación con el piso", tolerance: "2 mm", verification: "Instrumento graduado" },
    ],
  },
  {
    id: 21,
    name: "Closets",
    description: "Closets con puertas de corredera, abatibles y/o plegables. No válidas si el closet no cumple su funcionalidad.",
    items: [
      { parameter: "Verticalidad hojas cerradas vs. marco (corredera)", tolerance: "1 mm por metro de altura", verification: "Instrumento graduado con nivel" },
      { parameter: "Verticalidad entre hojas (abatir/plegables)", tolerance: "± 2 mm por metro de altura", verification: "Ídem" },
      { parameter: "Alineación en el plano entre puertas de abatir", tolerance: "± 1 mm por metro de altura", verification: "Ídem" },
      { parameter: "Alineación horizontal extremos inferior/superior", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Diferencia de altura entre manillas del mismo closet", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Ubicación de tirador/manilla vs. borde de puerta", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Separación de repisas con el paramento vertical", tolerance: "3 mm", verification: "Instrumento graduado" },
      { parameter: "Linealidad horizontal entre repisas (borde a borde)", tolerance: "3 mm", verification: "Instrumento graduado" },
    ],
  },
  {
    id: 22,
    name: "Muebles Incorporados",
    description: "Muebles de cocina, baño y otros, confeccionados o terminados in situ y fijados a la estructura. No incluye closets ni muebles sin relevancia estética.",
    items: [
      { parameter: "Paralelismo del mueble vs. paramentos/muebles próximos", tolerance: "3 mm", verification: "Instrumento graduado" },
      { parameter: "Paralelismo entre puertas y/o cajones del mueble", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Alineación horizontal superior e inferior entre puertas", tolerance: "1 mm", verification: "Instrumento graduado" },
      { parameter: "Alineación en el plano entre hojas adyacentes", tolerance: "1 mm", verification: "Instrumento graduado" },
      { parameter: "Alineación entre componentes decorativos", tolerance: "± 1 mm", verification: "Instrumento graduado" },
      { parameter: "Desalineación entre manillas/tiradores en muebles continuos", tolerance: "± 1 mm", verification: "Nivel + instrumento graduado" },
      { parameter: "Horizontalidad de superficies de mesones", tolerance: "1 mm por metro lineal", verification: "Nivel y escuadra en cualquier dirección" },
    ],
  },
  {
    id: 23,
    name: "Pinturas",
    description: "Terminación de pinturas interiores y exteriores.",
    distanceLight:
      "Interiores: observador a 1 m, con luz día o la iluminación definitiva que tendrá el recinto (o la mayor distancia posible si el recinto no permite 1 m). Exteriores: observador a 5 m, con luz día, perpendicular al elemento.",
    items: [
      { parameter: "Pinturas interiores (lisas)", tolerance: "Sombras con luz angulada, máx. 1 mm de espesor y 5 mm de largo, observadas a distancia mínima de 1 m", verification: "Observación con luz angulada" },
      { parameter: "Pinturas exteriores", tolerance: "Se aceptan imperfecciones no detectables a distancia mínima de 5 m", verification: "Observación con luz de día" },
    ],
  },
  {
    id: 24,
    name: "Pavimentos Vinílicos",
    description: "Terminación de pavimentos vinílicos (pavimentos especiales como hospitales/laboratorios requieren especificación particular).",
    items: [
      { parameter: "Encuentro entre palmetas o paños", tolerance: "< 1 mm", verification: "Instrumento graduado" },
      { parameter: "Encuentro con sectores singulares sin guardapolvo ni junquillo", tolerance: "2 mm", verification: "Instrumento graduado" },
      { parameter: "Profundidad de rayas", tolerance: "Se aceptan superficiales (sin profundidad ni relieve)", verification: "Observación directa" },
    ],
  },
  {
    id: 25,
    name: "Pisos Flotantes",
    description: "Pisos flotantes; deben instalarse sobre superficie con planeidad mínima G5.",
    items: [
      { parameter: "Planeidad", tolerance: "3 mm en 3 m", verification: "Instrumento graduado" },
      { parameter: "Profundidad de rayas", tolerance: "Se aceptan superficiales (sin profundidad, relieve ni marcas de otra tonalidad)", verification: "Observación directa" },
    ],
  },
  {
    id: 26,
    name: "Artefactos Eléctricos",
    description: "Alineación y paralelismo de interruptores, enchufes y tapas de cajas, para artefactos a menos de 50 cm entre sí.",
    items: [
      { parameter: "Alineación entre artefactos", tolerance: "± 2 mm", verification: "Regla apoyada en uno de ellos + regla pequeña graduada, laina o galga" },
      { parameter: "Horizontalidad del artefacto", tolerance: "± 1 mm", verification: "Nivel de mano + regla pequeña graduada, laina o galga" },
    ],
  },
];

export const TOLERANCE_MANUAL_SOURCE = "Manual de Tolerancias CDT";
