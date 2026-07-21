import type { FloorMaterial, WallCoveringMaterial } from "@prisma/client";

// Sin "use server": solo datos, importado tanto por el Server Action
// (actions.ts) como por el componente de UI — mismo criterio que
// feature-flags.ts.

export const FLOOR_MATERIAL_SLUG: Record<FloorMaterial, string | null> = {
  CERAMICA: "piso-ceramica",
  PORCELANATO: "piso-porcelanato",
  PISO_FLOTANTE: "piso-flotante",
  PAVIMENTO_VINILICO: "piso-vinilico",
  ALFOMBRA_CUBREPISO: "piso-alfombra",
  OTRO: null,
};

export const FLOOR_MATERIAL_LABELS: Record<FloorMaterial, string> = {
  CERAMICA: "Cerámica",
  PORCELANATO: "Porcelanato",
  PISO_FLOTANTE: "Piso flotante",
  PAVIMENTO_VINILICO: "Pavimento vinílico (PVC)",
  ALFOMBRA_CUBREPISO: "Alfombra / cubrepiso",
  OTRO: "Otro",
};

export const WALL_MATERIAL_SLUG: Record<WallCoveringMaterial, string | null> = {
  PINTURA: "muros-y-cielos-pintura",
  PAPEL_MURAL: "muros-y-cielos-papel-mural",
  CERAMICO_PORCELANATO: "muros-y-cielos-ceramico",
  OTRO: null,
};

export const WALL_MATERIAL_LABELS: Record<WallCoveringMaterial, string> = {
  PINTURA: "Pintura",
  PAPEL_MURAL: "Papel mural",
  CERAMICO_PORCELANATO: "Cerámico / porcelanato",
  OTRO: "Otro",
};
