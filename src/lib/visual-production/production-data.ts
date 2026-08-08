import type { ProductionImage, ProductionScenario, ProductionTake } from "./types";
import { ESC_001_FACHADAS_PINTURA } from "./scenarios/esc-001-fachadas-pintura";

// Registro central del Sistema Maestro de Producción Visual. Cada nuevo
// escenario se agrega acá -- un archivo propio en ./scenarios/, importado
// y sumado a este arreglo. El resto del sistema (dashboard, conteos,
// nomenclatura) funciona automáticamente para cualquier escenario nuevo,
// sin tocar código adicional.
export const PRODUCTION_SCENARIOS: ProductionScenario[] = [ESC_001_FACHADAS_PINTURA];

export function getScenario(code: string): ProductionScenario | undefined {
  return PRODUCTION_SCENARIOS.find((scenario) => scenario.code === code);
}

export function getAllTakes(scenario: ProductionScenario): ProductionTake[] {
  return scenario.takes;
}

export function getAllImages(scenario: ProductionScenario): ProductionImage[] {
  return scenario.takes.flatMap((take) => take.images);
}

export type ScenarioProgress = {
  scenario: ProductionScenario;
  takeCount: number;
  imageCount: number;
  pendingCount: number;
  approvedCount: number;
  integratedCount: number;
  progressPercent: number;
};

// "Avance" cuenta una imagen como completa cuando ya está aprobada o
// integrada -- generada/revisada son pasos intermedios del pipeline, no
// el destino final.
function isComplete(image: ProductionImage) {
  return image.status === "aprobada" || image.status === "integrada";
}

export function getScenarioProgress(scenario: ProductionScenario): ScenarioProgress {
  const images = getAllImages(scenario);
  const pendingCount = images.filter((image) => image.status === "pendiente").length;
  const approvedCount = images.filter((image) => image.status === "aprobada").length;
  const integratedCount = images.filter((image) => image.status === "integrada").length;
  const completeCount = images.filter(isComplete).length;

  return {
    scenario,
    takeCount: scenario.takes.length,
    imageCount: images.length,
    pendingCount,
    approvedCount,
    integratedCount,
    progressPercent: images.length === 0 ? 0 : Math.round((completeCount / images.length) * 100),
  };
}

export function getAllScenarioProgress(): ScenarioProgress[] {
  return PRODUCTION_SCENARIOS.map(getScenarioProgress);
}
