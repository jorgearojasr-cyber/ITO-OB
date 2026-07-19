import type { PropertyType, RoomFeatureRequirement } from "@prisma/client";

// Sin "use server": lo importan tanto Server Actions (actions.ts) como el
// script de seed (prisma/seed.ts, que corre fuera de Next.js) — debe quedar
// libre de cualquier dependencia de runtime de Next.js/Auth.js.

export type HouseFeatureFlags = {
  hasTerrace: boolean;
  hasRoofSpace: boolean;
  hasStairs: boolean;
  hasPedestrianGate: boolean;
  hasVehicleGate: boolean;
};

// Compartida entre recintos (RoomTemplate) y elementos individuales
// (ElementTemplate) — un elemento condicional como "Reja peatonal" vive
// dentro de un recinto que siempre aplica (Exterior), así que la misma
// condición de feature se evalúa a ambos niveles.
export function hasRequiredFeature(requiredFeature: RoomFeatureRequirement, flags: HouseFeatureFlags): boolean {
  switch (requiredFeature) {
    case "NINGUNA":
      return true;
    case "TERRAZA":
      return flags.hasTerrace;
    case "TECHUMBRE":
      return flags.hasRoofSpace;
    case "ESCALERA":
      return flags.hasStairs;
    case "REJA_PEATONAL":
      return flags.hasPedestrianGate;
    case "PORTON_VEHICULAR":
      return flags.hasVehicleGate;
  }
}

export function roomTemplateApplies(
  room: { appliesToCasa: boolean; appliesToDepto: boolean; requiredFeature: RoomFeatureRequirement },
  propertyType: PropertyType,
  flags: HouseFeatureFlags,
): boolean {
  const appliesToPropertyType = propertyType === "CASA" ? room.appliesToCasa : room.appliesToDepto;
  if (!appliesToPropertyType) return false;
  return hasRequiredFeature(room.requiredFeature, flags);
}

export function elementTemplateApplies(
  element: { requiredFeature: RoomFeatureRequirement },
  flags: HouseFeatureFlags,
): boolean {
  return hasRequiredFeature(element.requiredFeature, flags);
}

// "Portón vehicular manual" y "Portón vehicular automático" comparten el
// mismo requiredFeature (PORTON_VEHICULAR) porque son variantes del mismo
// feature, no features distintos — elementTemplateApplies no puede por sí
// sola decidir cuál de los dos instanciar. Esta es la única excepción
// puntual por slug en todo el mecanismo de features.
export function vehicleGateVariantApplies(elementSlug: string, isVehicleGateAutomatic: boolean): boolean {
  if (elementSlug === "porton-vehicular-manual") return !isVehicleGateAutomatic;
  if (elementSlug === "porton-vehicular-automatico") return isVehicleGateAutomatic;
  return true;
}
