// Contenido real y completo de la Biblioteca Técnica, organizado por
// punto de inspección (no por artículo). Es la implementación en código
// de docs/ObraBien-Biblioteca-Tecnica-Revisada.md (39 elementos, ~230
// puntos, ya validados con criterio de ITO) trasladada al índice
// definitivo de 23 elementos con materiales anidados. Los puntos que no
// existían en ese documento (Fachadas: familias fuera de "Húmeda sobre
// estuco"; Pisos: Hormigón/Madera; Muros: Enlucido de yeso; Áreas
// Verdes) se completaron acá con el mismo criterio ITO, del mismo modo
// en que se completaron los ~30 puntos 🆕 originales.
//
// No es una tabla de Prisma: no hay hoy una fuente de datos por punto
// más allá del nombre del checklist (LibraryArticle.quickCheckItems).
// Este archivo es la capa de contenido -- mismo patrón que
// good-bad-examples.ts / tolerances-by-category.ts / category-images.ts.
//
// Cada punto queda "sin-contenido" porque ninguna imagen/video real
// existe todavía: el campo status refleja el estado real de producción,
// no un valor de relleno.

import type { InspectionPoint } from "./inspection-point";

type PointSeed = {
  name: string;
  description: string;
  observations?: string[];
  needsImages?: boolean;
  requiresVideo?: boolean;
};

function build(idPrefix: string, seeds: PointSeed[]): InspectionPoint[] {
  return seeds.map((seed, index) => ({
    id: `${idPrefix}-${index}`,
    name: seed.name,
    description: seed.description,
    observations: seed.observations,
    needsImages: seed.needsImages ?? true,
    requiresVideo: seed.requiresVideo ?? false,
    status: "sin-contenido",
  }));
}

// ---------------------------------------------------------------------
// FACHADAS
// ---------------------------------------------------------------------

// Familia "Húmeda sobre estuco" -- checklist compartido real de UX-03
// (Pintura, Marmolina, Graniplast, Revestimiento texturado).
const FACHADA_HUMEDA_SOBRE_ESTUCO: PointSeed[] = [
  { name: "Plomo y regla", description: "La superficie no debe tener ondulaciones al pasar una regla de 2 m ni desviarse del plomo." },
  { name: "Fisuras de retracción", description: "Revisa el estuco base por fisuras finas de retracción, típicas en las primeras semanas de secado." },
  { name: "Fisuras estructurales", description: "Distingue una fisura capilar (superficial, sin riesgo) de una estructural (con espesor, cruza esquinas o vanos).", observations: ["Ante una fisura de más de 0,3 mm o que atraviese una esquina, regístrala como observación de riesgo mayor."] },
  { name: "Color y textura uniformes", description: "El acabado debe verse parejo en toda la fachada, sin manchas, parches ni diferencias de tono." },
  { name: "Filtraciones muro-alero", description: "Revisa la unión entre el muro y el alero: no debe haber manchas de humedad ni filtraciones visibles." },
  { name: "Esquinas y contornos de vanos", description: "Las esquinas y los contornos de puertas y ventanas deben tener buena terminación, sin bordes irregulares." },
  { name: "Humedad ascendente", description: "Revisa la base del muro cercana al terreno: no debe haber manchas de humedad por capilaridad o salpicadura." },
  { name: "Sellos en marcos", description: "El sello entre el muro y los marcos de puertas/ventanas debe estar continuo, sin cortes." },
  { name: "Uniformidad de grano", description: "Solo para Marmolina, Graniplast y Revestimiento texturado: el grano o relieve debe ser parejo, sin zonas más lisas o más rugosas." },
];

// Placa atornillada (Fibrocemento/Siding, SmartPanel).
const FACHADA_PLACA_ATORNILLADA: PointSeed[] = [
  { name: "Traslapos parejos", description: "Las placas deben traslaparse con la misma medida en toda la fachada, sin desniveles entre paños." },
  { name: "Fijaciones sin oxidar", description: "Los tornillos de fijación deben quedar a ras, sin oxidarse ni sobresalir de la placa." },
  { name: "Juntas de dilatación", description: "Debe existir una junta de dilatación en los encuentros indicados por el fabricante, sellada correctamente." },
  { name: "Color y textura uniformes", description: "El acabado debe verse parejo en toda la fachada, sin manchas, parches ni diferencias de tono." },
  { name: "Esquinas y contornos de vanos", description: "Las esquinas y los contornos de puertas y ventanas deben tener buena terminación, sin bordes irregulares." },
  { name: "Filtraciones muro-alero", description: "Revisa la unión entre el muro y el alero: no debe haber manchas de humedad ni filtraciones visibles." },
];

// EIFS (sistema de aislación exterior con terminación de estuco delgado).
const FACHADA_EIFS: PointSeed[] = [
  { name: "Superficie sin ondulaciones", description: "La superficie no debe tener ondulaciones al pasar una regla de 2 m." },
  { name: "Fisuras en la malla base", description: "Revisa fisuras que sigan el patrón de la malla de fibra de vidrio bajo el estuco delgado." },
  { name: "Color y textura uniformes", description: "El acabado debe verse parejo en toda la fachada, sin manchas, parches ni diferencias de tono." },
  { name: "Remates y perfiles", description: "Los perfiles de remate en esquinas, vanos y base del sistema deben estar firmes y bien terminados." },
  { name: "Filtraciones muro-alero", description: "Revisa la unión entre el muro y el alero: no debe haber manchas de humedad ni filtraciones visibles." },
];

// Piedra / Enchapes (mampostería aplicada).
const FACHADA_PIEDRA_ENCHAPES: PointSeed[] = [
  { name: "Piezas bien adheridas", description: "Ninguna pieza debe sonar hueca ni moverse al presionarla con la mano.", requiresVideo: true, needsImages: false },
  { name: "Juntas parejas", description: "Las juntas entre piezas deben tener el mismo ancho y estar rellenas de forma pareja en toda la fachada." },
  { name: "Sin eflorescencias", description: "No debe verse una capa blanquecina de sales en la superficie de la piedra o el enchape." },
  { name: "Remates en esquinas y vanos", description: "Las esquinas y los contornos de puertas y ventanas deben tener piezas bien cortadas y ajustadas." },
  { name: "Sello perimetral", description: "El sello entre el revestimiento y los marcos de puertas/ventanas debe estar continuo, sin cortes." },
];

// Madera (revestimiento de tablas o enchape de madera sólida).
const FACHADA_MADERA: PointSeed[] = [
  { name: "Protección/barniz uniforme", description: "El barniz o pintura protectora debe cubrir parejo, sin descascarado ni zonas sin proteger." },
  { name: "Separación entre tablas", description: "Las tablas deben mantener una separación pareja en toda la fachada, sin abrirse por dilatación." },
  { name: "Sin humedad en las uniones", description: "Revisa las uniones y encuentros de tablas: no debe haber manchas de humedad ni pudrición incipiente." },
  { name: "Fijaciones sin oxidar", description: "Los clavos o tornillos de fijación deben quedar a ras, sin oxidarse ni marcar la madera." },
  { name: "Esquinas y contornos de vanos", description: "Las esquinas y los contornos de puertas y ventanas deben tener buena terminación, sin bordes irregulares." },
];

// Hormigón visto / Estuco visto (superficie de hormigón como terminación final).
const FACHADA_HORMIGON_VISTO: PointSeed[] = [
  { name: "Superficie sin cangrejeras", description: "No deben verse oquedades ni nidos de piedra (cangrejeras) en la superficie del hormigón." },
  { name: "Fisuras de retracción", description: "Revisa fisuras finas de retracción propias del fraguado del hormigón." },
  { name: "Uniformidad de textura y color", description: "La superficie debe verse pareja en toda la fachada, sin manchas de desmolde ni diferencias de tono entre paños." },
  { name: "Juntas de hormigonado alineadas", description: "Las líneas de junta entre etapas de hormigonado deben quedar rectas y alineadas, no en desnivel." },
  { name: "Filtraciones muro-alero", description: "Revisa la unión entre el muro y el alero: no debe haber manchas de humedad ni filtraciones visibles." },
];

// Ladrillo a la vista.
const FACHADA_LADRILLO_A_LA_VISTA: PointSeed[] = [
  { name: "Juntas de mortero parejas", description: "El mortero entre ladrillos debe tener el mismo espesor y terminación en toda la fachada." },
  { name: "Sin eflorescencias", description: "No debe verse una capa blanquecina de sales en la superficie del ladrillo o el mortero." },
  { name: "Piezas sin trizaduras", description: "Los ladrillos no deben tener trizaduras, descascarados ni piezas rotas visibles." },
  { name: "Hiladas alineadas", description: "Las hiladas de ladrillo deben verse rectas y a nivel en toda la extensión del muro." },
  { name: "Filtraciones muro-alero", description: "Revisa la unión entre el muro y el alero: no debe haber manchas de humedad ni filtraciones visibles." },
];

// ---------------------------------------------------------------------
// REJAS Y PORTONES (fusión: reja peatonal + portón vehicular + cierre perimetral)
// ---------------------------------------------------------------------

const REJAS_Y_PORTONES: PointSeed[] = [
  { name: "Apertura sin roce", description: "Abre y cierra la reja o el portón: no debe trabarse, rozar el suelo ni forzarse.", requiresVideo: true, needsImages: false },
  { name: "Cerradura o candado", description: "El sistema de cierre debe funcionar sin forzar, y la llave o control debe entregarse completo." },
  { name: "Pintura anticorrosiva", description: "La pintura o el recubrimiento anticorrosivo debe cubrir parejo, sin manchas de óxido visibles." },
  { name: "Fijación firme", description: "Bisagras, rieles o soportes deben estar firmes, sin holgura ni movimiento al presionar.", requiresVideo: true, needsImages: false },
  { name: "Soldaduras sin fisuras", description: "Los puntos de unión soldados no deben tener fisuras ni óxido saliendo desde la soldadura." },
  { name: "Cobertura del cierre perimetral", description: "El cierre debe rodear completamente el terreno, sin tramos faltantes ni secciones sueltas." },
  { name: "Motor del portón automático", description: "Solo si el portón es automático: el motor debe abrir y cerrar sin esfuerzo ni ruido excesivo.", requiresVideo: true, needsImages: false },
  { name: "Control remoto", description: "Solo si el portón es automático: el control debe funcionar a la distancia normal de uso.", needsImages: false },
  { name: "Sensor de seguridad", description: "Punto de seguridad. Solo si el portón es automático: el sensor o la reversa debe detener el movimiento ante un obstáculo.", requiresVideo: true, needsImages: false },
];

// ---------------------------------------------------------------------
// PAVIMENTOS EXTERIORES
// ---------------------------------------------------------------------

const PAVIMENTOS_EXTERIORES: PointSeed[] = [
  { name: "Pendiente de escurrimiento", description: "Punto de alta prioridad. El piso exterior debe tener pendiente suficiente para escurrir el agua de lluvia, sin acumularla.", requiresVideo: true },
  { name: "Sin charcos hacia la vivienda", description: "Punto de alta prioridad. El agua no debe escurrir ni acumularse hacia el interior de la vivienda." },
  { name: "Uniones piso-muro selladas", description: "Las uniones entre el piso exterior, los muros y las puertas no deben tener grietas ni sellos despegados." },
  { name: "Superficie sin grietas", description: "El pavimento no debe tener grietas, hoyos ni desniveles importantes." },
  { name: "Impermeabilización de la terraza", description: "En terrazas sobre losa, la membrana o sello impermeabilizante no debe tener cortes ni despegues visibles." },
];

// ---------------------------------------------------------------------
// BARANDAS
// ---------------------------------------------------------------------

const BARANDAS: PointSeed[] = [
  { name: "Firmeza al presionar", description: "Punto de seguridad. La baranda no debe tener holgura ni moverse al apoyar el peso del cuerpo.", requiresVideo: true, needsImages: false },
  { name: "Altura de apoyo seguro", description: "La altura debe permitir apoyarse con seguridad en toda su extensión." },
  { name: "Espacio entre barrotes", description: "Punto de seguridad infantil. El espacio entre barrotes no debe permitir el paso de una lata de bebida." },
  { name: "Fijaciones sin óxido", description: "Las fijaciones metálicas no deben tener manchas de óxido visibles." },
  { name: "Material según diseño", description: "Vidrio templado: sin rayas ni fisuras. Madera: barniz uniforme sin descascarado. Metal: pintura sin óxido." },
];

// ---------------------------------------------------------------------
// TECHUMBRE Y CUBIERTAS
// ---------------------------------------------------------------------

const TECHUMBRE_CUBIERTA: PointSeed[] = [
  { name: "Sin manchas de humedad", description: "Punto de alta prioridad. No debe haber manchas de humedad ni evidencia de goteras en la cubierta o su estructura." },
  { name: "Piezas sin quebrar", description: "Las piezas de cubierta no deben estar quebradas, corridas de su lugar ni oxidadas." },
  { name: "Sin luz filtrándose", description: "Donde haya acceso a la techumbre, no debe filtrarse luz entre las piezas de cubierta." },
  { name: "Fijación al viento", description: "Donde sea accesible, ninguna pieza debe moverse al tacto — indica fijación insuficiente al viento." },
];

const TECHUMBRE_VENTILACION: PointSeed[] = [
  { name: "Ventilación de la cámara de aire", description: "La cámara de aire bajo la cubierta debe tener ventilación adecuada, sin quedar sellada por completo." },
  { name: "Sin humedad en la estructura", description: "La estructura de techumbre visible no debe mostrar manchas de humedad ni condensación." },
  { name: "Aislación térmica presente", description: "Donde haya acceso, la aislación térmica debe estar instalada de forma pareja, sin tramos faltantes ni comprimida." },
];

// ---------------------------------------------------------------------
// CANALETAS
// ---------------------------------------------------------------------

const CANALETAS: PointSeed[] = [
  { name: "Fijación sin obstrucciones", description: "Las canaletas deben estar bien fijadas y libres de hojas u obstrucciones visibles." },
  { name: "Sin tramos caídos", description: "No debe haber tramos caídos, torcidos o separados del techo." },
  { name: "Bajadas bien conectadas", description: "Las bajadas de agua deben estar conectadas correctamente, sin quedar sueltas." },
];

// ---------------------------------------------------------------------
// ÁREAS VERDES
// ---------------------------------------------------------------------

const AREAS_VERDES: PointSeed[] = [
  { name: "Riego automático funcional", description: "Si el proyecto incluye riego automático, debe funcionar en todos los sectores del jardín, sin aspersores secos ni fugas.", requiresVideo: true, needsImages: false },
  { name: "Cobertura vegetal completa", description: "El pasto y las plantas entregadas deben cubrir el terreno según el proyecto, sin zonas muertas ni sin plantar." },
  { name: "Drenaje sin encharcamiento", description: "El terreno no debe acumular agua después de regar o llover — indica drenaje o pendiente insuficiente." },
];

// ---------------------------------------------------------------------
// PISCINAS
// ---------------------------------------------------------------------

const PISCINAS: PointSeed[] = [
  { name: "Cierre perimetral de seguridad", description: "Punto de seguridad infantil. El cierre debe impedir el acceso de niños sin supervisión." },
  { name: "Portón de acceso traba bien", description: "Punto de seguridad infantil. El portón o reja de acceso debe cerrar y trabar correctamente.", requiresVideo: true },
  { name: "Sin grietas ni filtraciones", description: "La estructura no debe tener grietas, filtraciones ni desprendimientos visibles." },
  { name: "Filtración funciona sin ruido", description: "El sistema de filtración y la bomba deben encender sin ruidos ni olores anormales.", requiresVideo: true, needsImages: false },
];

// ---------------------------------------------------------------------
// QUINCHOS
// ---------------------------------------------------------------------

const QUINCHOS: PointSeed[] = [
  { name: "Techumbre sin filtraciones", description: "La techumbre debe estar bien fijada, sin filtraciones ni piezas sueltas." },
  { name: "Estructura firme", description: "Pilares y vigas deben estar firmes, sin grietas visibles." },
  { name: "Enchufes e iluminación", description: "Los enchufes y puntos de luz del quincho deben funcionar correctamente.", needsImages: false },
  { name: "Superficies parejas", description: "El piso y los muros deben verse parejos, sin fisuras visibles." },
];

// ---------------------------------------------------------------------
// MUROS Y CIELOS
// ---------------------------------------------------------------------

const MUROS_PINTURA: PointSeed[] = [
  { name: "Color y textura uniformes", description: "El color debe verse parejo en todo el muro, sin manchas ni marcas de rodillo.", observations: ["Revisa con luz angulada (de lado), a 1 m de distancia: así se notan más las diferencias."] },
  { name: "Sin grietas en esquinas", description: "No debe haber grietas finas en las esquinas ni en el encuentro entre el muro y el cielo." },
  { name: "Cielo parejo", description: "El cielo no debe tener ondulaciones visibles al mirarlo de lado." },
  { name: "Terminación en guardapolvos", description: "La pintura debe llegar bien terminada hasta los guardapolvos y contornos, sin bordes descuidados." },
];

const MUROS_PAPEL_MURAL: PointSeed[] = [
  { name: "Sin piquetes ni burbujas", description: "A 1 m de distancia no deben verse piquetes ni burbujas de aire bajo el papel." },
  { name: "Tono parejo", description: "El tono debe verse uniforme en todo el muro, sin diferencias entre paños." },
  { name: "Encuentro con cornisa", description: "El papel debe quedar bien ajustado en el encuentro con la cornisa o el guardapolvo, sin quedar corto." },
  { name: "Encuentro con marcos", description: "El papel debe quedar bien ajustado en el encuentro con marcos de puertas y ventanas, sin quedar corto ni montado." },
];

// Cerámico/Porcelanato de muro reutiliza el mismo criterio que Pisos,
// sin el punto de "esquinas y remates de artefacto" cuando no aplica.
const MUROS_CERAMICO_PORCELANATO: PointSeed[] = [
  { name: "Piezas niveladas", description: "Las piezas deben quedar niveladas al tacto, sin escalón en la unión entre ellas." },
  { name: "Juntas parejas", description: "Las juntas deben ser rectas y parejas, sin desviarse." },
  { name: "Sonido sólido", description: "Al golpear suavemente con una moneda, debe sonar sólido en toda la superficie (indica buena adhesión).", requiresVideo: true, needsImages: false },
  { name: "Sin piezas dañadas", description: "Las piezas no deben tener trizaduras, picaduras ni bordes astillados." },
];

const MUROS_ENLUCIDO_YESO: PointSeed[] = [
  { name: "Superficie lisa", description: "El enlucido debe quedar liso al tacto, sin grietas ni desprendimientos." },
  { name: "Uniformidad de textura", description: "La textura debe verse pareja en todo el muro, sin zonas más ásperas o porosas." },
  { name: "Sin ondulaciones", description: "Al mirar el muro de lado con luz rasante, no debe verse ondulado." },
  { name: "Terminación en esquinas", description: "Las esquinas deben quedar rectas y bien definidas, sin cantos irregulares." },
];

// ---------------------------------------------------------------------
// PISOS
// ---------------------------------------------------------------------

const PISOS_CERAMICA: PointSeed[] = [
  { name: "Piezas niveladas", description: "Las piezas deben quedar niveladas al tacto, sin escalón en la unión entre ellas." },
  { name: "Juntas parejas", description: "Las juntas deben ser rectas y parejas, sin desviarse." },
  { name: "Sin manchas en juntas", description: "El fragüe de las juntas no debe tener manchas ni decoloración por humedad." },
  { name: "Sonido sólido", description: "Al golpear suavemente con una moneda, debe sonar sólido en toda la superficie (indica buena adhesión).", requiresVideo: true, needsImages: false },
  { name: "Esquinas y remates", description: "Los remates junto a tina, mesón u otros artefactos deben quedar bien terminados." },
];

const PISOS_PORCELANATO: PointSeed[] = [
  { name: "Piezas niveladas", description: "Las piezas deben quedar niveladas al tacto, sin escalón en la unión entre ellas." },
  { name: "Juntas parejas", description: "Las juntas deben ser rectas y parejas, sin desviarse." },
  { name: "Sonido sólido", description: "Al golpear suavemente con una moneda, debe sonar sólido en toda la superficie (indica buena adhesión).", requiresVideo: true, needsImages: false },
  { name: "Sin piezas dañadas", description: "Las piezas no deben tener trizaduras, picaduras ni bordes astillados." },
];

const PISOS_FLOTANTE: PointSeed[] = [
  { name: "Sin crujidos al caminar", description: "No debe haber crujidos al caminar sobre toda la superficie.", requiresVideo: true, needsImages: false },
  { name: "Nivelado sin piezas levantadas", description: "El piso debe estar nivelado, sin tablas levantadas ni escalones." },
  { name: "Líneas rectas entre tablas", description: "Las líneas entre tablas deben ser rectas y paralelas, sin ondulación." },
  { name: "Espacio de dilatación", description: "Debe existir un espacio parejo entre el piso y el muro para permitir la dilatación." },
  { name: "Encuentro con guardapolvo", description: "El encuentro con el guardapolvo o las puertas no debe tener escalón brusco." },
  { name: "Rayas superficiales", description: "Las rayas visibles deben ser solo superficiales, sin marca de otro tono ni relieve." },
];

const PISOS_VINILICO: PointSeed[] = [
  { name: "Uniones parejas", description: "Las uniones entre paños deben quedar parejas, sin escalón." },
  { name: "Encuentro con puertas", description: "El encuentro con las puertas debe quedar bien terminado, sin bordes levantados." },
  { name: "Rayas superficiales", description: "Las rayas visibles deben ser solo superficiales, sin relieve ni marca de otro tono." },
];

const PISOS_ALFOMBRA: PointSeed[] = [
  { name: "Uniones sin espacios", description: "Las uniones entre paños deben quedar parejas, sin espacios visibles." },
  { name: "Encuentro con marcos", description: "El encuentro con marcos y pilastras debe quedar bien ajustado." },
  { name: "Sin arrugas ni bolsas de aire", description: "La superficie no debe tener arrugas ni bolsas de aire debajo de la alfombra." },
];

const PISOS_HORMIGON: PointSeed[] = [
  { name: "Sin fisuraciones importantes", description: "El radier a la vista no debe tener fisuras de más de 0,3 mm ni fisuras que crucen de un extremo a otro." },
  { name: "Superficie nivelada", description: "La superficie debe estar nivelada, sin desniveles ni zonas hundidas." },
  { name: "Sin desprendimiento superficial", description: "No debe haber polvo suelto ni desprendimiento de la capa superficial al pasar la mano (indica mal curado)." },
];

const PISOS_MADERA: PointSeed[] = [
  { name: "Tablas niveladas", description: "Las tablas deben quedar niveladas entre sí, sin escalones al tacto." },
  { name: "Sin crujidos al caminar", description: "No debe haber crujidos al caminar sobre toda la superficie.", requiresVideo: true, needsImages: false },
  { name: "Barniz o protección uniforme", description: "El barniz o la protección debe cubrir parejo, sin rayas ni zonas sin proteger." },
  { name: "Espacio de dilatación", description: "Debe existir un espacio parejo entre el piso y el muro para permitir la dilatación de la madera." },
];

// ---------------------------------------------------------------------
// MOLDURAS Y REMATES
// ---------------------------------------------------------------------

const MOLDURAS_GUARDAPOLVO: PointSeed[] = [
  { name: "Bien pegado a muro y piso", description: "No deben verse espacios entre el guardapolvo y el muro o el piso." },
  { name: "Uniones alineadas", description: "Las uniones entre tramos deben quedar alineadas, sin desnivel." },
  { name: "Sin tramos sueltos", description: "Ningún tramo debe moverse ni despegarse al tocarlo.", requiresVideo: true, needsImages: false },
  { name: "Sin golpes ni astillado", description: "La moldura no debe tener golpes ni astillado visible." },
];

const MOLDURAS_CORNISA: PointSeed[] = [
  { name: "Bien fijada a muro y cielo", description: "No deben verse espacios entre la cornisa y el muro o el cielo." },
  { name: "Uniones alineadas", description: "Las uniones entre tramos deben quedar alineadas, sin desnivel." },
  { name: "Sin tramos sueltos", description: "Ningún tramo debe moverse ni despegarse al tocarlo.", requiresVideo: true, needsImages: false },
];

// ---------------------------------------------------------------------
// PUERTAS (elemento directo, sin split de material en la navegación —
// las notas de material quedan como observación dentro del punto)
// ---------------------------------------------------------------------

const PUERTAS: PointSeed[] = [
  { name: "Cuadratura del marco", description: "El marco debe estar a escuadra, sin quedar romboidal." },
  { name: "Cierre sin roce", description: "La puerta debe cerrar y sellar sin rozar el marco.", requiresVideo: true, needsImages: false },
  { name: "Cerradura y pestillo", description: "La cerradura y el pestillo deben funcionar sin forzar.", requiresVideo: true, needsImages: false },
  { name: "Holguras parejas", description: "La separación entre la hoja y el marco debe ser pareja en todo el contorno." },
  { name: "Hoja plana", description: "La hoja debe estar plana, sin pandeos ni curvaturas." },
  { name: "Manillas firmes", description: "Las manillas deben estar firmes, sin holgura.", needsImages: false },
  { name: "Bisagras firmes", description: "Las bisagras deben estar firmes, sin ruido ni holgura excesiva.", requiresVideo: true, needsImages: false },
  { name: "Topes instalados", description: "Los topes de puerta deben estar instalados y funcionales, protegiendo el muro y la manilla." },
  { name: "Terminación de pintura", description: "La pintura o el barniz de terminación no debe tener rayas ni golpes de transporte." },
  { name: "Material del marco/hoja", description: "Madera: barniz sin descascarado. Metálica: sin óxido. PVC/Aluminio: sin fisuras en las soldaduras de esquina." },
  { name: "Limpieza general", description: "La puerta debe entregarse limpia, sin restos de pintura, silicona ni etiquetas." },
];

// ---------------------------------------------------------------------
// VENTANAS
// ---------------------------------------------------------------------

const VENTANAS: PointSeed[] = [
  { name: "Silicona perimetral", description: "El sello de silicona entre el marco y el muro debe ser continuo, sin cortes." },
  { name: "Apertura y cierre", description: "La ventana debe abrir, cerrar y trabar correctamente.", requiresVideo: true, needsImages: false },
  { name: "Manillas suaves", description: "Las manillas deben funcionar suave, sin forzar.", needsImages: false },
  { name: "Vidrio sin defectos", description: "El vidrio no debe tener rayas, manchas ni burbujas." },
  { name: "Marco y hojas sin daños", description: "El marco y las hojas no deben tener rayas, abolladuras ni decoloraciones." },
  { name: "Hermeticidad al cierre", description: "Con la ventana cerrada, no debe verse luz entre el marco y la hoja al mirar a contraluz." },
  { name: "Prueba de estanqueidad", description: "Ante lluvia intensa o con agua controlada, no debe filtrar agua hacia el interior.", requiresVideo: true, needsImages: false },
  { name: "Condensación en termopanel", description: "En ventanas de doble vidriado, no debe haber condensación ni empañamiento entre los dos vidrios — indica sello de cámara fallado." },
  { name: "Escuadra y rayas", description: "El marco debe estar a escuadra y sin rayas superficiales visibles con luz rasante." },
];

// ---------------------------------------------------------------------
// CLOSETS (fusión: puertas correderas + repisas)
// ---------------------------------------------------------------------

const CLOSETS: PointSeed[] = [
  { name: "Deslizamiento sin descarrilar", description: "Las puertas correderas deben deslizar suavemente sin descarrilarse.", requiresVideo: true, needsImages: false },
  { name: "Sin roce al abrir/cerrar", description: "Las puertas no deben rozar el marco ni el piso al abrir o cerrar.", requiresVideo: true, needsImages: false },
  { name: "Rieles bien fijados", description: "Los rieles superior e inferior deben estar bien fijados, sin tornillos sueltos." },
  { name: "Verticalidad de la hoja", description: "La hoja cerrada debe quedar vertical respecto del marco, sin inclinarse." },
  { name: "Repisas firmes y niveladas", description: "Las repisas deben estar firmes y niveladas, sin ceder al apoyar peso.", requiresVideo: true, needsImages: false },
  { name: "Soportes bien fijados", description: "Los soportes de las repisas deben estar bien fijados al muro, sin holgura.", requiresVideo: true, needsImages: false },
  { name: "Linealidad entre repisas", description: "Las repisas de un mismo closet deben quedar alineadas entre sí." },
];

// ---------------------------------------------------------------------
// MUEBLES (fusión: muebles de cocina + mueble de baño)
// ---------------------------------------------------------------------

const MUEBLES: PointSeed[] = [
  { name: "Apertura sin roce", description: "Puertas y cajones deben abrir, cerrar y no rozar entre sí ni con el mueble.", requiresVideo: true, needsImages: false },
  { name: "Bisagras y tiradores firmes", description: "Bisagras y tiradores deben estar firmes, sin holgura.", needsImages: false },
  { name: "Alineación entre puertas", description: "Puertas y cajones vecinos deben quedar alineados entre sí, a la misma altura." },
  { name: "Horizontalidad del mesón", description: "Un objeto redondo no debe rodar solo sobre el mesón — indica que está a nivel.", requiresVideo: true, needsImages: false },
  { name: "Cantos sin astillado", description: "Los cantos de melamina o MDF no deben tener astillado ni golpes." },
  { name: "Sellado contra el muro", description: "El mesón debe quedar sellado contra el muro, sin espacio que permita filtración de agua." },
  { name: "Mesón sin grietas", description: "El mesón no debe tener grietas ni bordes astillados." },
  { name: "Cierre amortiguado", description: "Si el herraje lo especifica, el cierre de puertas y cajones debe ser suave y amortiguado.", requiresVideo: true, needsImages: false },
];

// ---------------------------------------------------------------------
// INSTALACIÓN ELÉCTRICA
// ---------------------------------------------------------------------

const ELECTRICA_ENCHUFES: PointSeed[] = [
  { name: "Funcionamiento probado", description: "Cada enchufe debe probarse con un artefacto real, no solo a la vista.", needsImages: false },
  { name: "Alineación pareja", description: "Los enchufes cercanos entre sí deben quedar alineados a la misma altura." },
  { name: "Placas firmes", description: "Las placas deben quedar firmes en el muro, sin holgura.", needsImages: false },
  { name: "Tapa de seguridad en zonas húmedas", description: "Punto de seguridad. En baños y zonas húmedas, los enchufes deben tener tapa de seguridad." },
];

const ELECTRICA_INTERRUPTORES: PointSeed[] = [
  { name: "Enciende la luz correspondiente", description: "Cada interruptor debe encender y apagar exactamente el punto de luz que le corresponde.", needsImages: false },
  { name: "Alineación pareja", description: "Los interruptores cercanos entre sí deben quedar alineados a la misma altura." },
  { name: "Placas firmes", description: "Las placas deben quedar firmes en el muro, sin holgura.", needsImages: false },
];

const ELECTRICA_TABLERO: PointSeed[] = [
  { name: "Circuitos rotulados", description: "Cada circuito debe estar rotulado (cocina, dormitorios, iluminación, etc.)." },
  { name: "Diferenciales funcionan", description: "Punto de seguridad. El botón de test de cada diferencial debe cortar la corriente y permitir reactivarla.", requiresVideo: true, needsImages: false },
  { name: "Fácil acceso", description: "El tablero debe ser fácil de ubicar y acceder, sin obstáculos delante." },
  { name: "Sin cables sueltos", description: "No debe haber cables sueltos ni mal terminados visibles dentro del tablero." },
];

// ---------------------------------------------------------------------
// ILUMINACIÓN
// ---------------------------------------------------------------------

const ILUMINACION: PointSeed[] = [
  { name: "Todos los puntos encienden", description: "Todos los puntos de luz del recinto deben encender correctamente.", needsImages: false },
  { name: "Sin parpadeo ni ruido", description: "Ningún punto de luz debe parpadear ni hacer ruido al encender.", requiresVideo: true, needsImages: false },
  { name: "Fijación del foco empotrado", description: "El foco empotrado debe quedar bien fijo, sin colgar ni torcerse." },
  { name: "Temperatura de color pareja", description: "Los puntos de luz de un mismo recinto deben tener la misma temperatura de color (no mezclar luz cálida y fría)." },
];

// ---------------------------------------------------------------------
// INSTALACIÓN SANITARIA Y DE GAS
// ---------------------------------------------------------------------

const SANITARIA_IMPERMEABILIZACION_AGUA: PointSeed[] = [
  { name: "Sello muro-piso de ducha", description: "Punto de alta prioridad. Si hay ducha, el sello entre el muro y el piso debe ser continuo, sin cortes." },
  { name: "Sin manchas de humedad", description: "Punto de alta prioridad. No debe haber manchas de humedad visibles en ningún punto del recinto." },
  { name: "Silicona de tina/ducha", description: "La silicona no debe tener amarillamiento, hongos ni despegue." },
  { name: "Desagüe de piso", description: "Si hay ducha, el desagüe de piso debe drenar bien, sin filtrar hacia afuera.", needsImages: false },
  { name: "Rebalse funcional", description: "Si hay tina, el rebalse (desagüe de seguridad) debe funcionar.", requiresVideo: true, needsImages: false },
  { name: "Ventilación del recinto", description: "Si hay ducha o tina, el recinto debe contar con ventilación funcional.", needsImages: false },
  { name: "Olor a humedad", description: "Al abrir la puerta del recinto tras estar cerrado, no debe sentirse olor a humedad.", needsImages: false },
  { name: "Llave de paso general", description: "La llave de paso de agua debe cortar el suministro correctamente y ser fácil de ubicar en caso de emergencia." },
  { name: "Conexión de lavadora", description: "La llave de agua y el desagüe de la lavadora deben estar bien conectados, sin filtraciones ni quedar sueltos." },
];

const SANITARIA_SELLOS_SILICONA: PointSeed[] = [
  { name: "Sello continuo", description: "El sello de silicona en cocina y baño debe ser continuo, sin cortes." },
  { name: "Sin hongos ni amarillamiento", description: "La silicona no debe tener manchas de hongos ni amarillamiento." },
  { name: "Bien adherida", description: "La silicona debe estar bien adherida, sin desprendimientos ni bordes levantados." },
];

const SANITARIA_RED_DE_GAS: PointSeed[] = [
  { name: "Sin olor a gas", description: "Punto de seguridad. No debe sentirse olor a gas en ningún punto de la instalación.", needsImages: false },
  { name: "Llave de paso accesible", description: "La llave de paso general debe ser accesible e identificable con facilidad." },
  { name: "Conexiones sin daños", description: "Las conexiones y mangueras visibles no deben tener cortes, roturas ni corrosión." },
  { name: "Ventilación de artefactos a gas", description: "Punto de seguridad. El calefont y los artefactos a gas deben tener ventilación hacia el exterior." },
];

// ---------------------------------------------------------------------
// GRIFERÍA (fusión: cocina + baños)
// ---------------------------------------------------------------------

const GRIFERIA: PointSeed[] = [
  { name: "Sin goteras", description: "La llave no debe gotear ni filtrar agua bajo el mueble." },
  { name: "Gira suave", description: "La llave debe girar suave, sin trabarse.", needsImages: false },
  { name: "Presión pareja", description: "La presión de agua caliente y fría debe ser pareja.", needsImages: false },
  { name: "Desagüe sin filtraciones", description: "El desagüe debe drenar sin filtraciones visibles bajo el mueble." },
  { name: "Sin humedad bajo el mueble", description: "Punto de alta prioridad. No debe haber manchas de humedad bajo el lavaplatos o el mueble." },
];

// ---------------------------------------------------------------------
// ARTEFACTOS SANITARIOS
// ---------------------------------------------------------------------

const ARTEFACTOS_SANITARIOS: PointSeed[] = [
  { name: "Firmeza sin fisuras", description: "Inodoro, lavamanos y ducha/tina deben estar firmes, sin fisuras visibles." },
  { name: "Fijación sin balanceo", description: "Punto de alta prioridad. No debe haber balanceo al sentarse o apoyarse en el artefacto.", requiresVideo: true, needsImages: false },
  { name: "Descarga funciona", description: "La descarga del inodoro debe funcionar correctamente y el agua debe dejar de correr después.", requiresVideo: true, needsImages: false },
  { name: "Sin óxido en pernos", description: "Los pernos de fijación no deben tener manchas de óxido." },
];

// ---------------------------------------------------------------------
// EQUIPOS Y ARTEFACTOS DEL HOGAR (fusión: calefont/termo + campana + climatización)
// ---------------------------------------------------------------------

const EQUIPOS_Y_ARTEFACTOS: PointSeed[] = [
  { name: "Agua caliente estable", description: "El calefont o termo debe entregar agua caliente de forma estable.", requiresVideo: true, needsImages: false },
  { name: "Sin fugas", description: "Punto de alta prioridad. El calefont no debe tener fugas de agua ni de gas." },
  { name: "Instalación ventilada", description: "Punto de seguridad. El equipo debe estar instalado en un lugar ventilado, sin combustibles cerca." },
  { name: "Campana enciende y extrae", description: "La campana extractora debe encender y extraer correctamente.", requiresVideo: true, needsImages: false },
  { name: "Filtro de la campana limpio", description: "El filtro de la campana no debe tener exceso de grasa acumulada." },
  { name: "Climatización responde", description: "El equipo de climatización o calefacción debe encender y responder a los controles.", requiresVideo: true, needsImages: false },
  { name: "Sin ruidos anormales", description: "Ningún equipo debe hacer ruidos, vibraciones ni olores anormales al encenderlo.", requiresVideo: true, needsImages: false },
  { name: "Fijación sin filtraciones", description: "La instalación de cada equipo debe estar fijada firmemente, sin filtraciones visibles." },
];

// ---------------------------------------------------------------------
// ESCALERAS
// ---------------------------------------------------------------------

const ESCALERAS: PointSeed[] = [
  { name: "Altura pareja entre escalones", description: "Todos los escalones deben tener la misma altura, con una diferencia máxima de 5 mm entre consecutivos." },
  { name: "Profundidad pareja de huella", description: "La profundidad de cada escalón debe ser la misma en toda la escalera." },
  { name: "Revestimiento bien adherido", description: "El revestimiento de los escalones no debe sonar hueco ni tener piezas sueltas al golpearlo suavemente.", requiresVideo: true, needsImages: false },
  { name: "Pasamanos firme", description: "Punto de seguridad. El pasamanos debe estar firme en toda su extensión al apoyar peso.", requiresVideo: true, needsImages: false },
];

// ---------------------------------------------------------------------
// Mapa final: clave = elementSlug (direct) o elementSlug:materialSlug
// ---------------------------------------------------------------------

export const INSPECTION_POINTS_BY_KEY: Record<string, InspectionPoint[]> = {
  "fachadas:pintura": build("fachadas-pintura", FACHADA_HUMEDA_SOBRE_ESTUCO),
  "fachadas:marmolina": build("fachadas-marmolina", FACHADA_HUMEDA_SOBRE_ESTUCO),
  "fachadas:graniplast": build("fachadas-graniplast", FACHADA_HUMEDA_SOBRE_ESTUCO),
  "fachadas:texturado": build("fachadas-texturado", FACHADA_HUMEDA_SOBRE_ESTUCO),
  "fachadas:siding": build("fachadas-siding", FACHADA_PLACA_ATORNILLADA),
  "fachadas:smartpanel": build("fachadas-smartpanel", FACHADA_PLACA_ATORNILLADA),
  "fachadas:eifs": build("fachadas-eifs", FACHADA_EIFS),
  "fachadas:piedra": build("fachadas-piedra", FACHADA_PIEDRA_ENCHAPES),
  "fachadas:enchapes": build("fachadas-enchapes", FACHADA_PIEDRA_ENCHAPES),
  "fachadas:madera": build("fachadas-madera", FACHADA_MADERA),
  "fachadas:hormigon-visto": build("fachadas-hormigon-visto", FACHADA_HORMIGON_VISTO),
  "fachadas:estuco-visto": build("fachadas-estuco-visto", FACHADA_HORMIGON_VISTO),
  "fachadas:ladrillo-a-la-vista": build("fachadas-ladrillo", FACHADA_LADRILLO_A_LA_VISTA),

  "rejas-y-portones": build("rejas-y-portones", REJAS_Y_PORTONES),
  "pavimentos-exteriores": build("pavimentos-exteriores", PAVIMENTOS_EXTERIORES),
  "barandas": build("barandas", BARANDAS),

  "techumbre-y-cubiertas:cubierta": build("techumbre-cubierta", TECHUMBRE_CUBIERTA),
  "techumbre-y-cubiertas:techumbre-y-ventilacion": build("techumbre-ventilacion", TECHUMBRE_VENTILACION),

  "canaletas": build("canaletas", CANALETAS),
  "areas-verdes": build("areas-verdes", AREAS_VERDES),
  "piscinas": build("piscinas", PISCINAS),
  "quinchos": build("quinchos", QUINCHOS),

  "muros-y-cielos:pintura": build("muros-pintura", MUROS_PINTURA),
  "muros-y-cielos:papel-mural": build("muros-papel-mural", MUROS_PAPEL_MURAL),
  "muros-y-cielos:ceramico": build("muros-ceramico", MUROS_CERAMICO_PORCELANATO),
  "muros-y-cielos:porcelanato": build("muros-porcelanato", MUROS_CERAMICO_PORCELANATO),
  "muros-y-cielos:enlucido-de-yeso": build("muros-yeso", MUROS_ENLUCIDO_YESO),

  "pisos:ceramica": build("pisos-ceramica", PISOS_CERAMICA),
  "pisos:porcelanato": build("pisos-porcelanato", PISOS_PORCELANATO),
  "pisos:piso-flotante": build("pisos-flotante", PISOS_FLOTANTE),
  "pisos:vinilico": build("pisos-vinilico", PISOS_VINILICO),
  "pisos:alfombra": build("pisos-alfombra", PISOS_ALFOMBRA),
  "pisos:hormigon": build("pisos-hormigon", PISOS_HORMIGON),
  "pisos:madera": build("pisos-madera", PISOS_MADERA),

  "molduras-y-remates:guardapolvo": build("molduras-guardapolvo", MOLDURAS_GUARDAPOLVO),
  "molduras-y-remates:cornisa": build("molduras-cornisa", MOLDURAS_CORNISA),

  "puertas": build("puertas", PUERTAS),
  "ventanas": build("ventanas", VENTANAS),
  "closets": build("closets", CLOSETS),
  "muebles": build("muebles", MUEBLES),

  "instalacion-electrica:enchufes": build("electrica-enchufes", ELECTRICA_ENCHUFES),
  "instalacion-electrica:interruptores": build("electrica-interruptores", ELECTRICA_INTERRUPTORES),
  "instalacion-electrica:tablero-electrico": build("electrica-tablero", ELECTRICA_TABLERO),

  "iluminacion": build("iluminacion", ILUMINACION),

  "instalacion-sanitaria-y-gas:impermeabilizacion-y-agua": build("sanitaria-agua", SANITARIA_IMPERMEABILIZACION_AGUA),
  "instalacion-sanitaria-y-gas:sellos-de-silicona": build("sanitaria-silicona", SANITARIA_SELLOS_SILICONA),
  "instalacion-sanitaria-y-gas:red-de-gas": build("sanitaria-gas", SANITARIA_RED_DE_GAS),

  "griferia": build("griferia", GRIFERIA),
  "artefactos-sanitarios": build("artefactos-sanitarios", ARTEFACTOS_SANITARIOS),
  "equipos-y-artefactos-del-hogar": build("equipos-artefactos", EQUIPOS_Y_ARTEFACTOS),
  "escaleras": build("escaleras", ESCALERAS),
};

export function getInspectionPoints(elementSlug: string, materialSlug?: string): InspectionPoint[] {
  const key = materialSlug ? `${elementSlug}:${materialSlug}` : elementSlug;
  return INSPECTION_POINTS_BY_KEY[key] ?? [];
}
