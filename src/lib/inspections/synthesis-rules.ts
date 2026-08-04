import "server-only";

export type SynthesisTone = "good" | "attention";

export type SynthesisResult = {
  tone: SynthesisTone;
  headline: string;
};

type SynthesisInput = {
  totalObservations: number;
  byPriority: { ALTA: number; MEDIA: number; BAJA: number };
};

// Motor de reglas determinista para "¿Cómo quedó esta vivienda?"
// (Sprint 4). Lista ordenada de condición -> resultado, evaluada hasta
// la primera que aplica -- nunca texto libre, siempre un número real
// detrás de cada titular. Las 3 reglas de acá son las de la V1, no un
// límite estructural: sumar una regla futura es agregar una entrada
// más a este arreglo, no rediseñar el motor ni las pantallas que lo
// consumen (ver docs/PRODUCT_DECISIONS.md).
const RULES: {
  when: (input: SynthesisInput) => boolean;
  result: (input: SynthesisInput) => SynthesisResult;
}[] = [
  {
    when: (input) => input.totalObservations === 0,
    result: () => ({
      tone: "good",
      headline: "La vivienda quedó en excelentes condiciones — no se registraron observaciones.",
    }),
  },
  {
    when: (input) => input.byPriority.ALTA > 0,
    result: (input) => ({
      tone: "attention",
      headline: `Quedaron ${input.byPriority.ALTA} observaci${input.byPriority.ALTA === 1 ? "ón" : "ones"} de prioridad alta que conviene resolver antes de firmar.`,
    }),
  },
  {
    when: () => true,
    result: (input) => ({
      tone: "good",
      headline: `La vivienda quedó en buenas condiciones, con ${input.totalObservations} observaci${input.totalObservations === 1 ? "ón" : "ones"} menor${input.totalObservations === 1 ? "" : "es"} registrada${input.totalObservations === 1 ? "" : "s"}.`,
    }),
  },
];

export function computeInspectionSynthesis(input: SynthesisInput): SynthesisResult {
  const rule = RULES.find((candidate) => candidate.when(input));
  // La última regla de RULES siempre matchea (when: () => true) --
  // rule nunca es undefined en la práctica.
  return rule!.result(input);
}

// Texto de apoyo del progreso -- deliberadamente en lenguaje natural,
// nunca compite con el titular de la síntesis (Sprint 4, Etapa 4).
export function formatSynthesisProgressText(progress: { totalElements: number; doneElements: number }): string {
  const { totalElements, doneElements } = progress;
  if (totalElements === 0) {
    return "Sin elementos registrados en esta inspección.";
  }
  if (doneElements >= totalElements) {
    return `Se revisaron los ${totalElements} elemento${totalElements === 1 ? "" : "s"} de la inspección.`;
  }
  return `Se revisaron ${doneElements} de ${totalElements} elementos.`;
}
