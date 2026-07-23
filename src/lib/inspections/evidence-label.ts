export type EvidenceCounts = {
  elementsDone: number;
  elementsTotal: number;
  photoCount: number;
  observationCount: number;
};

export function evidenceLabel(evidence: EvidenceCounts): string {
  const elementsWord = evidence.elementsTotal === 1 ? "elemento revisado" : "elementos revisados";
  const parts = [`${evidence.elementsDone} de ${evidence.elementsTotal} ${elementsWord}`];
  parts.push(`${evidence.photoCount} foto${evidence.photoCount === 1 ? "" : "s"}`);
  parts.push(`${evidence.observationCount} ${evidence.observationCount === 1 ? "observación" : "observaciones"}`);
  return parts.join(", ");
}
