import {
  PrismaClient,
  RoomFeatureRequirement,
  type Priority,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Contraseña de desarrollo del usuario demo — solo para la base local/dev.
const DEMO_USER_PASSWORD = "demo1234";

// Categorías de la biblioteca técnica (sección 10 / prototipo de Inicio)
const libraryCategories = [
  {
    slug: "ventanas",
    name: "Ventanas",
    order: 0,
    icon: "window",
    articles: [
      {
        slug: "sellos-de-silicona",
        title: "Sellos de silicona continuos",
        summary:
          "Cómo verificar que el sello de silicona de una ventana no tenga espacios que permitan filtraciones.",
        body: "La silicona perimetral de una ventana debe formar una línea continua, sin cortes ni burbujas. Un sello discontinuo es la causa más común de filtraciones de agua en episodios de lluvia con viento. Revisa también con la ventana cerrada: no debiera verse luz del día pasando entre el marco y la hoja, ni entre las dos hojas si la ventana es corredera — si se ve luz, el cierre no está hermético y puede filtrar agua o aire.",
      },
    ],
  },
  {
    slug: "puertas",
    name: "Puertas",
    order: 1,
    icon: "door",
    articles: [
      {
        slug: "alineacion-y-cierre",
        title: "Alineación y cierre correcto",
        summary:
          "Qué revisar para confirmar que una puerta cierra, sella y no roza el marco.",
        body: "Una puerta bien instalada cierra con un solo movimiento suave, sin rozar el marco ni el piso, y el pestillo entra en el cerradero sin forzar.",
      },
    ],
  },
  {
    slug: "pisos",
    name: "Pisos",
    order: 2,
    icon: "floor",
    articles: [
      {
        slug: "crujidos-en-piso-flotante",
        title: "Crujidos en piso flotante",
        summary:
          "Por qué un crujido al caminar puede indicar una mala instalación del piso.",
        body: "En pisos flotantes, camina sobre toda la superficie: si escuchas crujidos, puede indicar una mala instalación de la base o de las uniones entre tablas.",
      },
    ],
  },
  {
    slug: "banos",
    name: "Baños",
    order: 3,
    icon: "bath",
    articles: [
      {
        slug: "impermeabilizacion-de-duchas",
        title: "Impermeabilización de duchas",
        summary:
          "Qué señales revisar en la impermeabilización de la zona de ducha.",
        body: "La zona de ducha debe tener sellos continuos entre muro y piso, sin manchas de humedad en el cielo del recinto inferior si aplica.",
      },
    ],
  },
  {
    slug: "porcelanatos",
    name: "Porcelanatos",
    order: 4,
    icon: "floor",
    articles: [
      {
        slug: "nivel-y-sellado-de-juntas",
        title: "Nivel y sellado de las juntas",
        summary:
          "Cómo revisar que las piezas de porcelanato estén niveladas y sus juntas bien selladas.",
        body: "El porcelanato es un revestimiento de piso o muro hecho con piezas grandes, parecidas a la cerámica pero más resistente y con juntas más finas. Pasa la mano por las uniones entre piezas: no debiera notarse un escalón entre una pieza y la de al lado. Golpea suavemente la superficie con una moneda o un objeto metálico similar en varios puntos de cada pieza: un sonido sólido y parejo indica que quedó bien pegada, mientras que un sonido hueco o con eco indica que el adhesivo de abajo no pegó bien en ese punto (una pieza \"soplada\"). Revisa también que las juntas (líneas entre piezas) tengan un ancho parejo y estén selladas con fragüe sin grietas. Pequeñas diferencias de tono entre piezas son normales y esperables en este tipo de material, no es necesariamente un defecto. Lo que sí debes registrar como observación son piezas sueltas, con sonido hueco, desniveladas o con juntas agrietadas: son defectos que empeoran con el tiempo si no se corrigen a tiempo.",
      },
    ],
  },
  {
    slug: "ceramicas",
    name: "Cerámicas",
    order: 5,
    icon: "floor",
    articles: [
      {
        slug: "piezas-parejas-sin-fisuras",
        title: "Piezas parejas y sin fisuras",
        summary: "Qué revisar en pisos y muros revestidos con cerámica.",
        body: "La cerámica es un revestimiento similar al porcelanato pero de menor tamaño y grosor, usado frecuentemente en cocinas y baños. Revisa que todas las piezas estén parejas entre sí, sin bordes que sobresalgan al tacto, y que no existan piezas trisadas, picadas o con manchas de humedad debajo. Igual que con el porcelanato, golpea suavemente cada pieza con una moneda o un objeto metálico: un sonido hueco o con eco (a diferencia del sonido sólido del resto) indica que esa pieza no quedó bien adherida al piso o muro. Revisa también las esquinas y remates (como el borde de una tina o un mesón), donde es común encontrar piezas mal cortadas o juntas sin terminar. Al igual que con el porcelanato, pequeñas diferencias de tono entre piezas son normales; el problema real está en piezas sueltas, trisadas o con sonido hueco.",
      },
    ],
  },
  {
    slug: "pinturas",
    name: "Pinturas",
    order: 6,
    icon: "paint",
    articles: [
      {
        slug: "uniformidad-de-la-pintura",
        title: "Uniformidad y terminación de la pintura",
        summary: "Cómo detectar defectos comunes en la pintura de muros y cielos.",
        body: "La pintura debe verse pareja en color y textura en toda la superficie, sin manchas, escurrimientos ni marcas de rodillo muy visibles. Para revisarla bien, obsérvala con luz rasante (de lado, no de frente): en muros interiores basta con pararte a un paso de distancia, y en fachadas o muros exteriores revisa desde unos metros más atrás, ya que ahí solo importan los defectos más visibles. Pon atención a las esquinas, contornos de puertas y ventanas, y guardapolvos: son los lugares donde más se notan los descuidos de terminación. Grietas finas en la pintura, sobre todo cerca de encuentros entre muro y cielo, pueden ser solo estéticas o pueden indicar un problema mayor detrás; si tienes dudas, coméntalo igual como observación para que quede documentado.",
      },
    ],
  },
  {
    slug: "muebles",
    name: "Muebles",
    order: 7,
    icon: "furniture",
    articles: [
      {
        slug: "puertas-cajones-y-herrajes",
        title: "Funcionamiento de puertas, cajones y herrajes",
        summary: "Qué revisar en muebles de cocina, closets y baño.",
        body: "Los muebles instalados en la vivienda (cocina, closets, baño) deben abrir y cerrar con un movimiento suave, sin rozar ni forzar. Prueba cada puerta y cajón al menos una vez: revisa que las bisagras y correderas no hagan ruido ni queden torcidas, y que los tiradores estén firmes y bien atornillados. Revisa también que las manillas o tiradores de puertas y cajones vecinos queden a la misma altura entre sí — una manilla claramente más arriba o más abajo que las demás es un defecto de instalación fácil de detectar a simple vista. Revisa el interior: que los estantes estén nivelados y que no haya bordes sin terminar o astillados. Un mueble mal instalado tiende a desalinearse con el uso normal, así que cualquier roce o dificultad para cerrar que notes ahora probablemente empeore con el tiempo.",
      },
    ],
  },
  {
    slug: "cubiertas",
    name: "Cubiertas",
    order: 8,
    icon: "roof",
    articles: [
      {
        slug: "estado-de-la-cubierta",
        title: "Estado general de la cubierta del techo",
        summary: "Qué señales revisar en la cubierta (tejas, planchas u otro material) del techo.",
        body: "La cubierta es el material que recubre y protege el techo de la vivienda (tejas, planchas u otro). Desde un punto seguro (nunca subas al techo sin la protección adecuada), revisa que no haya piezas visiblemente quebradas, corridas de su posición o con óxido. Dentro de la vivienda, revisa el cielo raso en busca de manchas de humedad, que son la señal más clara de un problema en la cubierta. Si la vivienda tiene una zona de techumbre accesible, revisa también ahí si se ve luz del día filtrándose entre las piezas de cubierta, señal de que no están bien selladas.",
      },
    ],
  },
  {
    slug: "sanitarios",
    name: "Sanitarios",
    order: 9,
    icon: "bath",
    articles: [
      {
        slug: "firmeza-de-artefactos-sanitarios",
        title: "Firmeza y funcionamiento de artefactos sanitarios",
        summary: "Cómo revisar que el inodoro, lavamanos y ducha estén bien instalados.",
        body: "Los artefactos sanitarios (inodoro, lavamanos, tina o ducha) deben estar firmes al presionarlos con la mano, sin moverse ni hacer ruido. Revisa que no tengan fisuras visibles en la loza ni manchas de óxido alrededor de los pernos de fijación. Prueba la descarga del inodoro y confirma que el agua no rebalsa ni sigue corriendo después de un rato. En el lavamanos, revisa que el desagüe no gotee por debajo abriendo la puerta del mueble si tiene uno. Cualquier artefacto suelto, trizado o que drene lento debe quedar registrado como observación.",
      },
    ],
  },
  {
    slug: "griferias",
    name: "Griferías",
    order: 10,
    icon: "faucet",
    articles: [
      {
        slug: "filtraciones-y-presion-de-agua",
        title: "Filtraciones y presión de agua",
        summary: "Qué revisar en las llaves de agua de cocina y baños.",
        body: "La grifería son las llaves de agua de lavamanos, cocina, ducha y tina. Ábrelas y ciérralas para confirmar que giran suave, sin trabarse, y que no gotean ni por el pico ni por la base al abrirlas. Revisa también debajo del mueble o lavamanos si hay humedad o manchas, señal de una filtración que no se ve a simple vista desde arriba. Prueba el agua caliente y fría por separado: ambas deben salir con una presión pareja, sin variar de golpe. Una llave que gotea apenas la cierras, aunque parezca un detalle menor, suele empeorar con el uso y vale la pena dejarlo registrado.",
      },
    ],
  },
  {
    slug: "siliconas",
    name: "Siliconas",
    order: 11,
    icon: "seal",
    articles: [
      {
        slug: "sellos-en-cocina-y-bano",
        title: "Sellos de silicona en cocina y baño",
        summary: "Dónde revisar sellos de silicona más allá de las ventanas, y por qué importan.",
        body: "Además de las ventanas, la silicona se usa para sellar las uniones entre superficies en la cocina (mesón con muro, lavaplatos con mesón) y el baño (tina o ducha con muro, lavamanos con mesón). Revisa que el sello sea una línea continua, sin cortes, burbujas ni zonas despegadas del material. Un sello dañado o incompleto permite que el agua se filtre hacia adentro del mueble o del muro, generando humedad y manchas que no se notan de inmediato. Si ves silicona amarillenta, con hongos (manchas oscuras) o que se despega al tocarla con el dedo, regístralo: no es solo estético, es una puerta de entrada para filtraciones.",
      },
    ],
  },
  {
    slug: "interruptores",
    name: "Interruptores",
    order: 12,
    icon: "switch",
    articles: [
      {
        slug: "funcionamiento-de-interruptores",
        title: "Funcionamiento correcto de cada interruptor",
        summary: "Cómo confirmar que cada interruptor enciende la luz correcta.",
        body: "Cada interruptor debe encender y apagar sin dificultad, y corresponder exactamente al punto de luz que dice controlar. Prueba uno por uno: si un interruptor no enciende ninguna luz, o enciende una que no es la esperada, puede ser un cableado mal conectado. Revisa también que la placa esté firme en el muro, sin holgura ni bordes sueltos, y que no haga ruido ni chispee al accionarlo — si notas esto último, es una situación que debe revisar un electricista, no algo para intentar arreglar tú mismo. Cuando haya varios interruptores juntos en la misma placa o muy cerca uno del otro, revisa que queden alineados y a la misma altura entre sí, sin verse torcidos o descuadrados. En recintos con varios interruptores para una misma luz (como pasillos o dormitorios con dos entradas), confirma que ambos funcionen correctamente desde cualquier punto.",
      },
    ],
  },
  {
    slug: "enchufes",
    name: "Enchufes",
    order: 13,
    icon: "outlet",
    articles: [
      {
        slug: "prueba-de-enchufes",
        title: "Prueba de enchufes con un artefacto real",
        summary: "Por qué probar cada enchufe con un aparato real, no solo mirarlo.",
        body: "Un enchufe puede verse perfecto y aun así no funcionar, por eso la única forma confiable de revisarlo es probándolo con un artefacto real (un cargador de celular sirve). Prueba cada enchufe de la vivienda, uno por uno, y anota los que no entreguen corriente. Revisa también que la placa esté firme, sin holgura, y que las entradas no estén flojas al insertar el enchufe del aparato. Cuando dos enchufes o interruptores queden cerca uno del otro (por ejemplo uno al lado del otro en la cocina), revisa que estén alineados y a la misma altura entre sí — si uno queda claramente más arriba, más abajo o torcido respecto al otro, es un defecto de instalación que vale la pena registrar. En cocina y baño es normal encontrar enchufes con un botón de prueba (tipo diferencial): si existe, revisa que ese botón funcione — corta la corriente al presionarlo y se puede reactivar después.",
      },
    ],
  },
  {
    slug: "iluminacion",
    name: "Iluminación",
    order: 14,
    icon: "light",
    articles: [
      {
        slug: "puntos-de-luz-encendidos",
        title: "Todos los puntos de luz encendidos",
        summary: "Cómo confirmar que cada punto de luz de la vivienda funciona.",
        body: "Recorre la vivienda encendiendo cada punto de luz (ampolletas, focos empotrados, luces exteriores) uno por uno, incluyendo los que a veces se pasan por alto como el interior de closets o la luz exterior de la entrada. Un punto de luz que no enciende puede ser solo una ampolleta que falta —algo simple de resolver— o un problema de cableado, así que igual conviene dejarlo anotado para que la inmobiliaria confirme cuál es el caso. Revisa también que la luz no parpadee ni haga ruido, y que los focos empotrados estén bien fijos al cielo, sin quedar colgando o torcidos.",
      },
    ],
  },
  {
    slug: "tableros-electricos",
    name: "Tableros eléctricos",
    order: 15,
    icon: "panel",
    articles: [
      {
        slug: "rotulacion-y-diferenciales",
        title: "Rotulación y diferenciales del tablero",
        summary: "Qué revisar en el tablero eléctrico sin manipularlo directamente.",
        body: "El tablero eléctrico concentra los interruptores (automáticos y diferenciales) que protegen y distribuyen la electricidad de la vivienda. No manipules el tablero sin conocimiento: para revisarlo basta con observarlo y probar los diferenciales desde su propio botón de prueba, sin abrir cables ni tocar conexiones internas. Revisa que cada circuito esté rotulado (por ejemplo, \"cocina\", \"dormitorios\", \"iluminación\"), de forma que en el futuro sea fácil saber qué corta cada interruptor. Prueba el botón de test de cada diferencial: al presionarlo debe cortar la corriente de inmediato, y debes poder reactivarlo subiendo la palanca. Si algún diferencial no corta al probarlo, o el tablero no tiene ningún tipo de rotulación, es una observación importante de prioridad alta — es un tema de seguridad, no solo de terminación estética. Ante cualquier duda técnica sobre el tablero, la recomendación general y segura es siempre cortar la energía antes de manipular cualquier cosa dentro de él, y ante cualquier anomalía consultar con un electricista certificado.",
      },
    ],
  },
  {
    slug: "techumbres",
    name: "Techumbres",
    order: 16,
    icon: "attic",
    articles: [
      {
        slug: "humedad-y-ventilacion-en-techumbre",
        title: "Señales de humedad y ventilación en la techumbre",
        summary: "Qué revisar cuando la vivienda tiene acceso a la techumbre (espacio bajo el techo).",
        body: "La techumbre es el espacio estructural entre el cielo raso y la cubierta del techo; algunas viviendas tienen una escotilla de acceso para revisarlo. Si puedes acceder de forma segura, revisa con una linterna que no haya manchas de humedad en la madera o estructura, ni luz del día filtrándose desde afuera. Verifica que exista algún tipo de ventilación (rejillas o similar): un espacio de techumbre sin ventilación acumula humedad con el tiempo, aunque hoy no se vea ningún daño. Si no tienes acceso seguro a este espacio o no te sientes cómodo revisándolo, no es necesario forzarlo — es un punto que puede quedar pendiente para que lo evalúe un especialista más adelante.",
      },
    ],
  },
  {
    slug: "canaletas",
    name: "Canaletas",
    order: 17,
    icon: "gutter",
    articles: [
      {
        slug: "fijacion-y-limpieza-de-canaletas",
        title: "Fijación y limpieza de las canaletas",
        summary: "Cómo revisar que las canaletas evacúen el agua de lluvia correctamente.",
        body: "Las canaletas son los canales que recogen el agua de lluvia desde el techo y la conducen hacia abajo, evitando que escurra directamente sobre los muros. Revisa visualmente que estén bien fijadas a la estructura, sin tramos caídos, torcidos o separados del techo. Revisa también que no tengan hojas, tierra u otros restos que puedan obstruir el paso del agua — una canaleta tapada rebalsa y moja el muro exterior igual que si no existiera. Si la vivienda tiene bajadas de agua (tubos verticales conectados a las canaletas), confirma que estén conectadas correctamente y no terminen sueltas a mitad de camino.",
      },
    ],
  },
  {
    slug: "impermeabilizaciones",
    name: "Impermeabilizaciones",
    order: 18,
    icon: "waterproof",
    articles: [
      {
        slug: "impermeabilizacion-de-terrazas",
        title: "Impermeabilización en terrazas y zonas exteriores",
        summary: "Qué revisar en la impermeabilización de terrazas, patios y otras zonas expuestas al agua.",
        body: "Además del baño, hay otras zonas de la vivienda expuestas directamente a la lluvia o humedad que dependen de una buena impermeabilización: terrazas, patios techados y balcones. Revisa que el piso de estas zonas tenga una pendiente perceptible hacia un desagüe o el borde exterior — el agua nunca debería acumularse en charcos hacia el interior de la vivienda. Revisa también las uniones entre el piso exterior y los muros o puertas: no debiera haber grietas ni sellos despegados en esos encuentros, porque es por ahí donde más filtra el agua hacia el interior. La impermeabilización es una de las partidas más difíciles de evaluar a simple vista porque el daño muchas veces aparece meses después; ante cualquier señal de humedad, por mínima que sea, es preferible dejarla registrada como observación.",
      },
    ],
  },
];

// Checklists reutilizados sin cambios entre varios recintos (evita repetir
// el mismo array literal en cada RoomTemplate).
const PISO_FLOTANTE_CHECKLIST = [
  "¿No se escuchan crujidos al caminar sobre toda la superficie?",
  "¿El piso está nivelado, sin piezas levantadas ni escalones entre tablas?",
  "¿Las líneas entre tablas se ven rectas y paralelas entre sí, sin ondulaciones?",
  "¿Queda un espacio parejo entre el piso y el muro en todo el borde, en vez de estar completamente pegado (para que el piso pueda dilatar)?",
  "¿En el encuentro con el guardapolvo o con las puertas, el piso no forma un escalón brusco al pasar de una superficie a otra?",
];

const GUARDAPOLVOS_CHECKLIST = [
  "¿El guardapolvo está bien pegado al muro y al piso, sin espacios visibles?",
  "¿Las uniones entre tramos de guardapolvo quedan alineadas, sin desniveles entre una pieza y la siguiente?",
  "¿No hay tramos sueltos, despegados o que se muevan al tocarlos?",
];

const MUROS_Y_CIELOS_CHECKLIST = [
  "¿La pintura de muros y cielos se ve uniforme en color y textura, sin manchas ni marcas de rodillo?",
  "¿No hay grietas finas cerca de las esquinas o del encuentro entre muro y cielo?",
  "¿El cielo se ve parejo, sin ondulaciones visibles al mirarlo de lado?",
  "¿Los guardapolvos y contornos de puertas/ventanas tienen buena terminación de pintura?",
];

const VENTANA_CHECKLIST = [
  "¿La silicona perimetral está continua y sin espacios?",
  "¿La ventana abre, cierra y traba correctamente?",
  "¿La manilla funciona suave, sin forzar?",
  "¿El vidrio no tiene rayas, manchas ni burbujas visibles?",
  "¿El marco y las hojas no tienen rayas, abolladuras ni decoloraciones?",
  "¿Con la ventana cerrada, no se ve luz del día entre el marco y la hoja?",
];

const ILUMINACION_CHECKLIST = [
  "¿Todos los puntos de luz encienden correctamente?",
  "¿La luz no parpadea ni hace ruido?",
  "¿Si es un foco empotrado, está bien fijo al cielo, sin quedar colgando o torcido?",
];

// Estructura de recintos del recorrido sugerido (sección 7)
const roomTemplates = [
  {
    slug: "exterior",
    name: "Exterior",
    order: 0,
    icon: "exterior",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "fachada",
        name: "Fachada",
        libraryArticleSlug: "uniformidad-de-la-pintura",
        checklist: [
          "¿La pintura o revestimiento está uniforme, sin manchas ni grietas visibles?",
          "¿No hay filtraciones visibles en la unión entre muros y aleros?",
          "¿Las esquinas y contornos de puertas y ventanas tienen buena terminación, sin bordes irregulares?",
        ],
      },
      {
        slug: "puerta-de-acceso",
        name: "Puerta de acceso",
        libraryArticleSlug: "alineacion-y-cierre",
        checklist: [
          "¿La puerta cierra y sella correctamente sin rozar el marco?",
          "¿La cerradura y el pestillo funcionan sin forzar?",
          "¿El marco se ve derecho y en escuadra, sin inclinarse hacia un lado ni verse como un rombo?",
          "¿La separación entre la puerta y el marco es pareja en todo el contorno?",
          "¿La hoja de la puerta se ve plana, sin pandeos ni curvaturas?",
          "¿La manilla está firme, sin holgura al moverla?",
          "Si la puerta es de dos hojas, ¿la separación entre ambas es pareja en toda su altura?",
        ],
      },
    ],
  },
  {
    slug: "living",
    name: "Living",
    order: 1,
    icon: "living",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "piso",
        name: "Piso",
        libraryArticleSlug: "crujidos-en-piso-flotante",
        checklist: PISO_FLOTANTE_CHECKLIST,
      },
      {
        slug: "guardapolvos",
        name: "Guardapolvos",
        libraryArticleSlug: null,
        checklist: GUARDAPOLVOS_CHECKLIST,
      },
      {
        slug: "muros-y-cielos",
        name: "Muros y cielos",
        libraryArticleSlug: "uniformidad-de-la-pintura",
        checklist: MUROS_Y_CIELOS_CHECKLIST,
      },
      {
        slug: "ventanas",
        name: "Ventanas",
        libraryArticleSlug: "sellos-de-silicona",
        checklist: VENTANA_CHECKLIST,
      },
      {
        slug: "iluminacion",
        name: "Iluminación",
        libraryArticleSlug: "puntos-de-luz-encendidos",
        checklist: ILUMINACION_CHECKLIST,
      },
      {
        slug: "enchufes-e-interruptores",
        name: "Enchufes e interruptores",
        libraryArticleSlug: "prueba-de-enchufes",
        checklist: [
          "¿Cada enchufe funciona probado con un artefacto real?",
          "¿Los interruptores encienden y apagan la luz correspondiente?",
          "¿Cuando hay dos enchufes o interruptores cerca uno del otro, están alineados y a la misma altura entre sí?",
          "¿Las placas están firmes en el muro, sin holgura?",
        ],
      },
    ],
  },
  {
    slug: "comedor",
    name: "Comedor",
    order: 2,
    icon: "dining",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "piso",
        name: "Piso",
        libraryArticleSlug: "crujidos-en-piso-flotante",
        checklist: PISO_FLOTANTE_CHECKLIST,
      },
      {
        slug: "guardapolvos",
        name: "Guardapolvos",
        libraryArticleSlug: null,
        checklist: GUARDAPOLVOS_CHECKLIST,
      },
      {
        slug: "muros-y-cielos",
        name: "Muros y cielos",
        libraryArticleSlug: "uniformidad-de-la-pintura",
        checklist: MUROS_Y_CIELOS_CHECKLIST,
      },
      {
        slug: "iluminacion",
        name: "Iluminación",
        libraryArticleSlug: "puntos-de-luz-encendidos",
        checklist: ILUMINACION_CHECKLIST,
      },
    ],
  },
  {
    slug: "cocina",
    name: "Cocina",
    order: 3,
    icon: "kitchen",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "piso",
        name: "Piso",
        libraryArticleSlug: "nivel-y-sellado-de-juntas",
        checklist: [
          "¿Las piezas están niveladas entre sí, sin sentir un escalón al pasar la mano por las uniones?",
          "¿Las líneas de junta se ven rectas y parejas en todo el piso, sin desviarse?",
          "¿Al golpear suavemente la superficie con una moneda, el sonido es sólido y no hueco?",
          "¿No hay piezas trisadas, picadas o astilladas en los bordes?",
        ],
      },
      {
        slug: "guardapolvos",
        name: "Guardapolvos",
        libraryArticleSlug: null,
        checklist: GUARDAPOLVOS_CHECKLIST,
      },
      {
        slug: "muebles-de-cocina",
        name: "Muebles de cocina",
        libraryArticleSlug: "puertas-cajones-y-herrajes",
        checklist: [
          "¿Puertas y cajones abren, cierran y no rozan?",
          "¿Las bisagras y tiradores están firmes?",
          "¿Las puertas y cajones vecinos quedan alineados entre sí, sin verse uno más adelantado o más alto que el otro?",
          "¿Los tiradores o manillas de puertas y cajones vecinos están a la misma altura entre sí?",
          "¿Al poner un objeto redondo (como una bolita o un lápiz redondo) sobre el mesón, se queda quieto en vez de rodar hacia un lado?",
        ],
      },
      {
        slug: "llave-de-agua-y-lavaplatos",
        name: "Llave de agua y lavaplatos",
        libraryArticleSlug: "filtraciones-y-presion-de-agua",
        checklist: [
          "¿No hay goteras en la llave ni bajo el lavaplatos?",
          "¿El desagüe drena sin filtraciones?",
          "¿La llave gira suave, sin trabarse, al abrir y cerrar?",
          "¿La presión de agua caliente y fría es pareja, sin cambios bruscos?",
          "¿Revisando bajo el mueble o lavaplatos, no hay manchas de humedad?",
        ],
      },
      {
        slug: "iluminacion",
        name: "Iluminación",
        libraryArticleSlug: "puntos-de-luz-encendidos",
        checklist: ILUMINACION_CHECKLIST,
      },
      {
        slug: "enchufes-e-interruptores",
        name: "Enchufes e interruptores",
        libraryArticleSlug: "prueba-de-enchufes",
        checklist: [
          "¿Cada enchufe funciona probado con un artefacto real?",
          "¿Cuando hay dos enchufes o interruptores cerca uno del otro, están alineados y a la misma altura entre sí?",
          "¿Las placas están firmes en el muro, sin holgura?",
        ],
      },
      {
        slug: "campana-extractora",
        name: "Campana extractora",
        libraryArticleSlug: null,
        checklist: ["¿Enciende y extrae correctamente?"],
      },
    ],
  },
  {
    slug: "logia",
    name: "Logia",
    order: 4,
    icon: "laundry",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "conexion-de-lavadora",
        name: "Conexión de lavadora",
        libraryArticleSlug: null,
        checklist: [
          "¿La llave de agua y el desagüe no presentan filtraciones?",
        ],
      },
      {
        slug: "ventilacion",
        name: "Ventilación",
        libraryArticleSlug: null,
        checklist: ["¿El recinto cuenta con ventilación adecuada?"],
      },
    ],
  },
  {
    slug: "banos",
    name: "Baños",
    order: 5,
    icon: "bath",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "piso",
        name: "Piso",
        libraryArticleSlug: "piezas-parejas-sin-fisuras",
        checklist: [
          "¿Las piezas están niveladas entre sí, sin sentir un escalón al pasar la mano por las uniones?",
          "¿Las líneas de junta se ven rectas y parejas en todo el piso, sin desviarse?",
          "¿No hay manchas o decoloración cerca de las juntas que puedan indicar humedad bajo el piso?",
          "¿Al golpear suavemente la superficie con una moneda, el sonido es sólido y no hueco?",
          "¿Las esquinas y remates (borde de tina, mesón) están bien terminados, sin piezas mal cortadas?",
        ],
      },
      {
        slug: "guardapolvos",
        name: "Guardapolvos",
        libraryArticleSlug: null,
        checklist: GUARDAPOLVOS_CHECKLIST,
      },
      {
        slug: "mueble-de-bano",
        name: "Mueble de baño",
        libraryArticleSlug: "puertas-cajones-y-herrajes",
        checklist: [
          "¿La puerta del mueble abre, cierra y no roza?",
          "¿Los tiradores o manillas están firmes y bien atornillados?",
          "¿Al poner un objeto redondo sobre el mesón del lavamanos, se queda quieto en vez de rodar hacia un lado?",
          "¿El mesón no tiene grietas ni bordes astillados?",
        ],
      },
      {
        slug: "artefactos-sanitarios",
        name: "Artefactos sanitarios",
        libraryArticleSlug: "firmeza-de-artefactos-sanitarios",
        checklist: [
          "¿El inodoro, lavamanos y ducha están firmes y sin fisuras?",
          "¿La descarga funciona correctamente?",
          "¿No hay manchas de óxido alrededor de los pernos de fijación de los artefactos?",
          "¿Después de descargar el inodoro, el agua deja de correr (no queda goteando o llenando sin parar)?",
        ],
      },
      {
        slug: "griferia",
        name: "Grifería",
        libraryArticleSlug: "filtraciones-y-presion-de-agua",
        checklist: [
          "¿No hay goteras ni filtraciones en las llaves?",
          "¿Gira suave, sin trabarse, al abrir y cerrar?",
          "¿La presión de agua caliente y fría es pareja, sin cambios bruscos?",
          "¿Revisando bajo el mueble o lavamanos, no hay manchas de humedad?",
        ],
      },
      {
        slug: "iluminacion",
        name: "Iluminación",
        libraryArticleSlug: "puntos-de-luz-encendidos",
        checklist: ILUMINACION_CHECKLIST,
      },
      {
        slug: "impermeabilizacion-y-sellos",
        name: "Impermeabilización y sellos",
        libraryArticleSlug: "impermeabilizacion-de-duchas",
        checklist: [
          "¿Los sellos entre muro y piso de la ducha están continuos?",
          "¿No hay manchas de humedad visibles?",
        ],
      },
    ],
  },
  {
    slug: "dormitorios",
    name: "Dormitorios",
    order: 6,
    icon: "bedroom",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "piso",
        name: "Piso",
        libraryArticleSlug: "crujidos-en-piso-flotante",
        checklist: PISO_FLOTANTE_CHECKLIST,
      },
      {
        slug: "guardapolvos",
        name: "Guardapolvos",
        libraryArticleSlug: null,
        checklist: GUARDAPOLVOS_CHECKLIST,
      },
      {
        slug: "muros-y-cielos",
        name: "Muros y cielos",
        libraryArticleSlug: "uniformidad-de-la-pintura",
        checklist: MUROS_Y_CIELOS_CHECKLIST,
      },
      {
        slug: "ventanas",
        name: "Ventanas",
        libraryArticleSlug: "sellos-de-silicona",
        checklist: VENTANA_CHECKLIST,
      },
      {
        slug: "iluminacion",
        name: "Iluminación",
        libraryArticleSlug: "puntos-de-luz-encendidos",
        checklist: ILUMINACION_CHECKLIST,
      },
    ],
  },
  {
    slug: "closets",
    name: "Closets",
    order: 7,
    icon: "closet",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "puertas-correderas",
        name: "Puertas correderas",
        libraryArticleSlug: null,
        checklist: ["¿Deslizan suavemente sin descarrilarse?"],
      },
      {
        slug: "repisas",
        name: "Repisas",
        libraryArticleSlug: null,
        checklist: ["¿Están firmes y niveladas?"],
      },
    ],
  },
  {
    slug: "terraza-patio",
    name: "Terraza / Patio",
    order: 8,
    icon: "terrace",
    requiredFeature: RoomFeatureRequirement.TERRAZA,
    elements: [
      {
        slug: "piso-exterior",
        name: "Piso exterior",
        libraryArticleSlug: "impermeabilizacion-de-terrazas",
        checklist: [
          "¿Tiene pendiente correcta para escurrir el agua de lluvia?",
        ],
      },
      {
        slug: "baranda",
        name: "Baranda",
        libraryArticleSlug: null,
        checklist: ["¿Está firme y sin holgura al presionar?"],
      },
    ],
  },
  {
    slug: "techumbre",
    name: "Techumbre",
    order: 9,
    icon: "roof",
    requiredFeature: RoomFeatureRequirement.TECHUMBRE,
    elements: [
      {
        slug: "cubierta",
        name: "Cubierta",
        libraryArticleSlug: "estado-de-la-cubierta",
        checklist: ["¿No se observan manchas de humedad ni goteras?"],
      },
      {
        slug: "canaletas",
        name: "Canaletas",
        libraryArticleSlug: "fijacion-y-limpieza-de-canaletas",
        checklist: ["¿Están bien fijadas y sin obstrucciones visibles?"],
      },
    ],
  },
  {
    slug: "instalaciones",
    name: "Instalaciones",
    order: 10,
    icon: "installations",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "tablero-electrico",
        name: "Tablero eléctrico",
        libraryArticleSlug: "rotulacion-y-diferenciales",
        checklist: [
          "¿Los circuitos están rotulados?",
          "¿Los diferenciales (automáticos) funcionan al probarlos?",
          "¿El tablero es fácil de ubicar y acceder, sin muebles ni objetos bloqueando el paso?",
        ],
      },
      {
        slug: "llave-de-paso-de-agua",
        name: "Llave de paso de agua",
        libraryArticleSlug: null,
        checklist: ["¿Corta el suministro correctamente?"],
      },
    ],
  },
  {
    slug: "equipamiento",
    name: "Equipamiento",
    order: 11,
    icon: "equipment",
    requiredFeature: RoomFeatureRequirement.NINGUNA,
    elements: [
      {
        slug: "calefont-o-termo",
        name: "Calefont o termo eléctrico",
        libraryArticleSlug: null,
        checklist: [
          "¿Entrega agua caliente de forma estable?",
          "¿No presenta fugas de agua ni de gas?",
        ],
      },
    ],
  },
  {
    slug: "escalera",
    name: "Escalera",
    order: 12,
    icon: "stairs",
    requiredFeature: RoomFeatureRequirement.ESCALERA,
    elements: [
      {
        slug: "peldanos-y-pasamanos",
        name: "Peldaños y pasamanos",
        libraryArticleSlug: null,
        checklist: [
          "¿Todos los escalones tienen la misma altura, sin que ninguno se sienta más alto o más bajo al subir o bajar?",
          "¿La profundidad de cada escalón (huella) es la misma en toda la escalera?",
          "¿El revestimiento de los escalones está bien adherido, sin piezas sueltas que se muevan al pisar?",
          "¿El pasamanos está firme en toda su extensión, sin tramos sueltos?",
        ],
      },
    ],
  },
];

type SeededElement = {
  id: string;
  slug: string;
  name: string;
  order: number;
  checklistItemIds: string[];
};

type SeededRoom = {
  id: string;
  slug: string;
  name: string;
  order: number;
  elements: SeededElement[];
};

async function seedCatalog(): Promise<SeededRoom[]> {
  const articleBySlug = new Map<string, string>();

  for (const category of libraryCategories) {
    const createdCategory = await prisma.libraryCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, order: category.order, icon: category.icon },
      create: {
        slug: category.slug,
        name: category.name,
        order: category.order,
        icon: category.icon,
      },
    });

    for (const article of category.articles) {
      const createdArticle = await prisma.libraryArticle.upsert({
        where: {
          categoryId_slug: { categoryId: createdCategory.id, slug: article.slug },
        },
        update: {
          title: article.title,
          summary: article.summary,
          body: article.body,
        },
        create: {
          categoryId: createdCategory.id,
          slug: article.slug,
          title: article.title,
          summary: article.summary,
          body: article.body,
        },
      });
      articleBySlug.set(article.slug, createdArticle.id);
    }
  }

  const seededRooms: SeededRoom[] = [];

  for (const room of roomTemplates) {
    const createdRoom = await prisma.roomTemplate.upsert({
      where: { slug: room.slug },
      update: {
        name: room.name,
        order: room.order,
        icon: room.icon,
        requiredFeature: room.requiredFeature,
      },
      create: {
        slug: room.slug,
        name: room.name,
        order: room.order,
        icon: room.icon,
        requiredFeature: room.requiredFeature,
      },
    });

    const seededElements: SeededElement[] = [];

    for (const [elementIndex, element] of room.elements.entries()) {
      const referenceLibraryArticleId = element.libraryArticleSlug
        ? articleBySlug.get(element.libraryArticleSlug)
        : undefined;

      const createdElement = await prisma.elementTemplate.upsert({
        where: {
          roomTemplateId_slug: {
            roomTemplateId: createdRoom.id,
            slug: element.slug,
          },
        },
        update: {
          name: element.name,
          order: elementIndex,
          referenceLibraryArticleId,
        },
        create: {
          roomTemplateId: createdRoom.id,
          slug: element.slug,
          name: element.name,
          order: elementIndex,
          referenceLibraryArticleId,
        },
      });

      const checklistItemIds: string[] = [];

      for (const [questionIndex, question] of element.checklist.entries()) {
        const existing = await prisma.checklistItemTemplate.findFirst({
          where: { elementTemplateId: createdElement.id, question },
        });
        if (existing) {
          await prisma.checklistItemTemplate.update({
            where: { id: existing.id },
            data: { order: questionIndex },
          });
          checklistItemIds.push(existing.id);
        } else {
          const created = await prisma.checklistItemTemplate.create({
            data: {
              elementTemplateId: createdElement.id,
              question,
              order: questionIndex,
            },
          });
          checklistItemIds.push(created.id);
        }
      }

      // Poda preguntas huérfanas: si una pregunta cambió de texto o se
      // quitó del checklist de este elemento, el bucle de arriba nunca la
      // encuentra por texto exacto y queda viva en la base sin que nada la
      // borre. Sin este paso, re-sembrar con wording nuevo solo suma filas
      // en vez de reemplazarlas.
      await prisma.checklistItemTemplate.deleteMany({
        where: {
          elementTemplateId: createdElement.id,
          id: { notIn: checklistItemIds },
        },
      });

      seededElements.push({
        id: createdElement.id,
        slug: element.slug,
        name: element.name,
        order: elementIndex,
        checklistItemIds,
      });
    }

    seededRooms.push({
      id: createdRoom.id,
      slug: room.slug,
      name: room.name,
      order: room.order,
      elements: seededElements,
    });
  }

  return seededRooms;
}

// Recintos que se dejan completamente revisados en la inspección demo.
// El resto queda pendiente, para que el primero de ellos ("cocina") sea
// el "siguiente paso" natural en la pantalla de Inicio.
const DEMO_PROJECT_NAME = "Condominio Los Robles";
const DEMO_UNIT_LABEL = "Casa 15";
const DEMO_COMPLETED_ROOM_SLUGS = new Set(["exterior", "living", "comedor"]);

// Dentro de cada recinto completo, un elemento queda marcado con una
// observación (no todo perfecto), con su prioridad y si lleva foto.
const DEMO_FLAGGED_ELEMENTS: Record<
  string,
  { elementSlug: string; comment: string; priority: Priority; photoCount: number }
> = {
  exterior: {
    elementSlug: "puerta-de-acceso",
    comment: "La bisagra inferior está floja y la puerta roza levemente el marco.",
    priority: "MEDIA",
    photoCount: 1,
  },
  living: {
    elementSlug: "ventanas",
    comment: "La silicona de la ventana orientada al patio tiene un tramo sin sellar.",
    priority: "ALTA",
    photoCount: 2,
  },
  comedor: {
    elementSlug: "piso",
    comment: "Se escucha un leve crujido al pisar cerca de la unión con el living.",
    priority: "BAJA",
    photoCount: 0,
  },
};

async function seedDemoInspection(seededRooms: SeededRoom[]) {
  let organization = await prisma.organization.findFirst({
    where: { name: "Familia Rojas (demo)" },
  });
  if (!organization) {
    organization = await prisma.organization.create({
      data: { name: "Familia Rojas (demo)", type: "PARTICULAR", plan: "GRATUITO" },
    });
  }

  // Upsert (no solo create): así, si el usuario demo ya existía de una
  // corrida anterior sin passwordHash, correr el seed de nuevo se lo
  // asigna igual, sin necesidad de recrear la inspección.
  const passwordHash = await bcrypt.hash(DEMO_USER_PASSWORD, 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@obrabien.cl" },
    update: { passwordHash },
    create: {
      organizationId: organization.id,
      email: "demo@obrabien.cl",
      name: "Usuario Demo",
      role: "PROPIETARIO",
      passwordHash,
    },
  });

  const existingInspection = await prisma.inspection.findFirst({
    where: { projectName: DEMO_PROJECT_NAME, unitLabel: DEMO_UNIT_LABEL },
  });
  if (existingInspection) {
    // Ya sembrada en una corrida anterior del seed: no duplicar.
    return;
  }

  const inspection = await prisma.inspection.create({
    data: {
      organizationId: organization.id,
      createdByUserId: user.id,
      projectName: DEMO_PROJECT_NAME,
      unitLabel: DEMO_UNIT_LABEL,
      address: "Av. Los Robles 1234, Santiago",
      developerName: "Inmobiliaria GranVista",
      propertyType: "CASA",
      hasTerrace: true,
      hasRoofSpace: true,
      hasStairs: true,
      status: "IN_PROGRESS",
      receptionDate: new Date(),
    },
  });

  for (const room of seededRooms) {
    const roomInstance = await prisma.roomInstance.create({
      data: {
        inspectionId: inspection.id,
        roomTemplateId: room.id,
        name: room.name,
        order: room.order,
      },
    });

    const isCompletedRoom = DEMO_COMPLETED_ROOM_SLUGS.has(room.slug);
    const flagged = DEMO_FLAGGED_ELEMENTS[room.slug];

    for (const element of room.elements) {
      if (!isCompletedRoom) {
        await prisma.elementInstance.create({
          data: {
            roomInstanceId: roomInstance.id,
            elementTemplateId: element.id,
            name: element.name,
            order: element.order,
            status: "PENDING",
          },
        });
        continue;
      }

      const isFlaggedElement = flagged?.elementSlug === element.slug;

      const elementInstance = await prisma.elementInstance.create({
        data: {
          roomInstanceId: roomInstance.id,
          elementTemplateId: element.id,
          name: element.name,
          order: element.order,
          status: isFlaggedElement ? "OBSERVED" : "CORRECT",
        },
      });

      for (const [i, checklistItemId] of element.checklistItemIds.entries()) {
        const isFlaggedQuestion = isFlaggedElement && i === 0;

        const observation = await prisma.observation.create({
          data: {
            elementInstanceId: elementInstance.id,
            checklistItemTemplateId: checklistItemId,
            status: isFlaggedQuestion ? "OBSERVATION" : "CORRECT",
            comment: isFlaggedQuestion ? flagged.comment : null,
            priority: isFlaggedQuestion ? flagged.priority : null,
          },
        });

        if (isFlaggedQuestion && flagged.photoCount > 0) {
          for (let photoIndex = 0; photoIndex < flagged.photoCount; photoIndex++) {
            await prisma.photo.create({
              data: {
                observationId: observation.id,
                url: `https://placehold.co/600x400?text=${encodeURIComponent(`${room.name} — ${element.name}`)}`,
              },
            });
          }
        }
      }
    }
  }
}

async function main() {
  const seededRooms = await seedCatalog();
  await seedDemoInspection(seededRooms);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
