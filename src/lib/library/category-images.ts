// TODO: reemplazar por fotos propias de terreno cuando estén disponibles.
// Por ahora usan fotos de stock (Unsplash, CDN directo, libres de uso) solo
// como referencia visual temporal para cada categoría de la biblioteca técnica.
export const categoryImageBySlug: Record<string, string> = {
  ventanas: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=400&q=60&auto=format&fit=crop",
  puertas: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=60&auto=format&fit=crop",
  pisos: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&q=60&auto=format&fit=crop",
  banos: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=60&auto=format&fit=crop",
  porcelanatos: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&q=60&auto=format&fit=crop",
  ceramicas: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=60&auto=format&fit=crop",
  pinturas: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=60&auto=format&fit=crop",
  muebles: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=60&auto=format&fit=crop",
  cubiertas: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&q=60&auto=format&fit=crop",
  sanitarios: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=60&auto=format&fit=crop",
  griferias: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=60&auto=format&fit=crop",
  siliconas: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=400&q=60&auto=format&fit=crop",
  interruptores: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=60&auto=format&fit=crop",
  enchufes: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=400&q=60&auto=format&fit=crop",
  iluminacion: "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=400&q=60&auto=format&fit=crop",
  "tableros-electricos": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=60&auto=format&fit=crop",
  techumbres: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&q=60&auto=format&fit=crop",
  canaletas: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&q=60&auto=format&fit=crop",
  impermeabilizaciones: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=60&auto=format&fit=crop",
};

export const fallbackCategoryImage =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=60&auto=format&fit=crop";
