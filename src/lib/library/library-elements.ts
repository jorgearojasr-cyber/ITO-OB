// Índice de la Biblioteca Técnica organizado por ELEMENTO CONSTRUCTIVO,
// según docs/ObraBien-Biblioteca-Tecnica-Indice-Definitivo.md (documento
// aprobado, no debe volver a analizarse).
//
// Esta es una reorganización puramente de navegación: no crea, edita ni
// elimina contenido. Cada material apunta al slug de un LibraryCategory
// ya existente en la base de datos (o a null cuando ese material no
// tiene un LibraryArticle propio y su contenido vive en
// inspection-points-data.ts, resuelto por elemento+material). Las rutas
// /biblioteca/[categoria] y /biblioteca/[categoria]/[articulo] no cambian.

export type LibraryElementMaterial = {
  slug: string;
  label: string;
  categorySlug: string | null;
};

export type LibraryElement = {
  slug: string;
  name: string;
  icon: string;
  // "direct": el elemento no se divide por material, apunta a una sola
  // categoría existente (puede ser null si aún no hay contenido).
  // "materials": el elemento se navega por un segundo nivel de materiales.
  kind: "direct" | "materials";
  categorySlug?: string | null;
  materials?: LibraryElementMaterial[];
};

export const LIBRARY_ELEMENTS: LibraryElement[] = [
  {
    slug: "fachadas",
    name: "Fachadas",
    icon: "facade",
    kind: "materials",
    materials: [
      { slug: "pintura", label: "Pintura", categorySlug: "pinturas" },
      { slug: "marmolina", label: "Marmolina", categorySlug: null },
      { slug: "graniplast", label: "Graniplast", categorySlug: null },
      { slug: "texturado", label: "Revestimiento texturado", categorySlug: null },
      { slug: "siding", label: "Fibrocemento (Siding)", categorySlug: null },
      { slug: "smartpanel", label: "SmartPanel", categorySlug: null },
      { slug: "eifs", label: "EIFS", categorySlug: null },
      { slug: "piedra", label: "Piedra", categorySlug: null },
      { slug: "enchapes", label: "Enchapes", categorySlug: null },
      { slug: "madera", label: "Madera", categorySlug: null },
      { slug: "hormigon-visto", label: "Hormigón visto", categorySlug: null },
      { slug: "estuco-visto", label: "Estuco visto", categorySlug: null },
      { slug: "ladrillo-a-la-vista", label: "Ladrillo a la vista", categorySlug: null },
    ],
  },
  {
    slug: "rejas-y-portones",
    name: "Rejas y Portones",
    icon: "gate",
    kind: "direct",
    categorySlug: null,
  },
  {
    slug: "pavimentos-exteriores",
    name: "Pavimentos Exteriores",
    icon: "pavement",
    kind: "direct",
    categorySlug: "impermeabilizaciones",
  },
  {
    slug: "barandas",
    name: "Barandas",
    icon: "railing",
    kind: "direct",
    categorySlug: null,
  },
  {
    slug: "techumbre-y-cubiertas",
    name: "Techumbre y Cubiertas",
    icon: "roof",
    kind: "materials",
    materials: [
      { slug: "cubierta", label: "Cubierta", categorySlug: "cubiertas" },
      { slug: "techumbre-y-ventilacion", label: "Techumbre y ventilación", categorySlug: "techumbres" },
    ],
  },
  {
    slug: "canaletas",
    name: "Canaletas",
    icon: "gutter",
    kind: "direct",
    categorySlug: "canaletas",
  },
  {
    slug: "areas-verdes",
    name: "Áreas Verdes",
    icon: "garden",
    kind: "direct",
    categorySlug: null,
  },
  {
    slug: "piscinas",
    name: "Piscinas",
    icon: "pool",
    kind: "direct",
    categorySlug: null,
  },
  {
    slug: "quinchos",
    name: "Quinchos",
    icon: "bbq",
    kind: "direct",
    categorySlug: null,
  },
  {
    slug: "muros-y-cielos",
    name: "Muros y Cielos",
    icon: "wall",
    kind: "materials",
    materials: [
      { slug: "pintura", label: "Pintura", categorySlug: "pinturas" },
      { slug: "papel-mural", label: "Papel mural", categorySlug: "papel-mural" },
      { slug: "ceramico", label: "Cerámico", categorySlug: "ceramicas" },
      { slug: "porcelanato", label: "Porcelanato", categorySlug: "porcelanatos" },
      { slug: "enlucido-de-yeso", label: "Enlucido de yeso", categorySlug: null },
    ],
  },
  {
    slug: "pisos",
    name: "Pisos",
    icon: "floor",
    kind: "materials",
    materials: [
      { slug: "ceramica", label: "Cerámica", categorySlug: "ceramicas" },
      { slug: "porcelanato", label: "Porcelanato", categorySlug: "porcelanatos" },
      { slug: "piso-flotante", label: "Piso flotante", categorySlug: "pisos" },
      { slug: "vinilico", label: "Vinílico", categorySlug: "pavimentos-vinilicos" },
      { slug: "alfombra", label: "Alfombra / cubrepiso", categorySlug: "alfombras-y-cubrepisos" },
      { slug: "hormigon", label: "Hormigón", categorySlug: null },
      { slug: "madera", label: "Madera", categorySlug: null },
    ],
  },
  {
    slug: "molduras-y-remates",
    name: "Molduras y Remates",
    icon: "trim",
    kind: "materials",
    materials: [
      { slug: "guardapolvo", label: "Guardapolvo", categorySlug: "guardapolvos" },
      { slug: "cornisa", label: "Cornisa", categorySlug: "cornisas" },
    ],
  },
  {
    slug: "puertas",
    name: "Puertas",
    icon: "door",
    kind: "direct",
    categorySlug: "puertas",
  },
  {
    slug: "ventanas",
    name: "Ventanas",
    icon: "window",
    kind: "direct",
    categorySlug: "ventanas",
  },
  {
    slug: "closets",
    name: "Closets",
    icon: "closet",
    kind: "direct",
    categorySlug: null,
  },
  {
    slug: "muebles",
    name: "Muebles",
    icon: "furniture",
    kind: "direct",
    categorySlug: "muebles",
  },
  {
    slug: "instalacion-electrica",
    name: "Instalación Eléctrica",
    icon: "panel",
    kind: "materials",
    materials: [
      { slug: "enchufes", label: "Enchufes", categorySlug: "enchufes" },
      { slug: "interruptores", label: "Interruptores", categorySlug: "interruptores" },
      { slug: "tablero-electrico", label: "Tablero eléctrico", categorySlug: "tableros-electricos" },
    ],
  },
  {
    slug: "iluminacion",
    name: "Iluminación",
    icon: "light",
    kind: "direct",
    categorySlug: "iluminacion",
  },
  {
    slug: "instalacion-sanitaria-y-gas",
    name: "Instalación Sanitaria y de Gas",
    icon: "pipe",
    kind: "materials",
    materials: [
      { slug: "impermeabilizacion-y-agua", label: "Impermeabilización y agua", categorySlug: "banos" },
      { slug: "sellos-de-silicona", label: "Sellos de silicona", categorySlug: "siliconas" },
      { slug: "red-de-gas", label: "Red de gas", categorySlug: null },
    ],
  },
  {
    slug: "griferia",
    name: "Grifería",
    icon: "faucet",
    kind: "direct",
    categorySlug: "griferias",
  },
  {
    slug: "artefactos-sanitarios",
    name: "Artefactos Sanitarios",
    icon: "bath",
    kind: "direct",
    categorySlug: "sanitarios",
  },
  {
    slug: "equipos-y-artefactos-del-hogar",
    name: "Equipos y Artefactos del Hogar",
    icon: "heater",
    kind: "direct",
    categorySlug: "calefont-y-termo-electrico",
  },
  {
    slug: "escaleras",
    name: "Escaleras",
    icon: "stairs",
    kind: "direct",
    categorySlug: null,
  },
];

export function getLibraryElement(slug: string): LibraryElement | undefined {
  return LIBRARY_ELEMENTS.find((element) => element.slug === slug);
}
