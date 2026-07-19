import { PrismaClient, RoomFeatureRequirement } from "@prisma/client";

const prisma = new PrismaClient();

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
        body: "La silicona perimetral de una ventana debe formar una línea continua, sin cortes ni burbujas. Un sello discontinuo es la causa más común de filtraciones de agua en episodios de lluvia con viento.",
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
        libraryArticleSlug: null,
        checklist: [
          "¿La pintura o revestimiento está uniforme, sin manchas ni grietas visibles?",
          "¿No hay filtraciones visibles en la unión entre muros y aleros?",
        ],
      },
      {
        slug: "puerta-de-acceso",
        name: "Puerta de acceso",
        libraryArticleSlug: "alineacion-y-cierre",
        checklist: [
          "¿La puerta cierra y sella correctamente sin rozar el marco?",
          "¿La cerradura y el pestillo funcionan sin forzar?",
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
        checklist: [
          "¿No se escuchan crujidos al caminar sobre toda la superficie?",
          "¿El piso está nivelado, sin rayones ni piezas levantadas?",
        ],
      },
      {
        slug: "ventanas",
        name: "Ventanas",
        libraryArticleSlug: "sellos-de-silicona",
        checklist: [
          "¿La silicona perimetral está continua y sin espacios?",
          "¿La ventana abre, cierra y traba correctamente?",
        ],
      },
      {
        slug: "enchufes-e-interruptores",
        name: "Enchufes e interruptores",
        libraryArticleSlug: null,
        checklist: [
          "¿Cada enchufe funciona probado con un artefacto real?",
          "¿Los interruptores encienden y apagan la luz correspondiente?",
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
        checklist: [
          "¿No se escuchan crujidos al caminar sobre toda la superficie?",
          "¿El piso está nivelado, sin rayones ni piezas levantadas?",
        ],
      },
      {
        slug: "iluminacion",
        name: "Iluminación",
        libraryArticleSlug: null,
        checklist: ["¿Todos los puntos de luz encienden correctamente?"],
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
        slug: "muebles-de-cocina",
        name: "Muebles de cocina",
        libraryArticleSlug: null,
        checklist: [
          "¿Puertas y cajones abren, cierran y no rozan?",
          "¿Las bisagras y tiradores están firmes?",
        ],
      },
      {
        slug: "llave-de-agua-y-lavaplatos",
        name: "Llave de agua y lavaplatos",
        libraryArticleSlug: null,
        checklist: [
          "¿No hay goteras en la llave ni bajo el lavaplatos?",
          "¿El desagüe drena sin filtraciones?",
        ],
      },
      {
        slug: "enchufes-e-interruptores",
        name: "Enchufes e interruptores",
        libraryArticleSlug: null,
        checklist: ["¿Cada enchufe funciona probado con un artefacto real?"],
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
        slug: "artefactos-sanitarios",
        name: "Artefactos sanitarios",
        libraryArticleSlug: null,
        checklist: [
          "¿El inodoro, lavamanos y ducha están firmes y sin fisuras?",
          "¿La descarga funciona correctamente?",
        ],
      },
      {
        slug: "griferia",
        name: "Grifería",
        libraryArticleSlug: null,
        checklist: ["¿No hay goteras ni filtraciones en las llaves?"],
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
        checklist: [
          "¿No se escuchan crujidos al caminar sobre toda la superficie?",
        ],
      },
      {
        slug: "ventanas",
        name: "Ventanas",
        libraryArticleSlug: "sellos-de-silicona",
        checklist: [
          "¿La silicona perimetral está continua y sin espacios?",
          "¿La ventana abre, cierra y traba correctamente?",
        ],
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
        libraryArticleSlug: null,
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
        libraryArticleSlug: null,
        checklist: ["¿No se observan manchas de humedad ni goteras?"],
      },
      {
        slug: "canaletas",
        name: "Canaletas",
        libraryArticleSlug: null,
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
        libraryArticleSlug: null,
        checklist: [
          "¿Los circuitos están rotulados?",
          "¿Los diferenciales (automáticos) funcionan al probarlos?",
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
];

async function main() {
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

      for (const [questionIndex, question] of element.checklist.entries()) {
        const existing = await prisma.checklistItemTemplate.findFirst({
          where: { elementTemplateId: createdElement.id, question },
        });
        if (existing) {
          await prisma.checklistItemTemplate.update({
            where: { id: existing.id },
            data: { order: questionIndex },
          });
        } else {
          await prisma.checklistItemTemplate.create({
            data: {
              elementTemplateId: createdElement.id,
              question,
              order: questionIndex,
            },
          });
        }
      }
    }
  }
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
