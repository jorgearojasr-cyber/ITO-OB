"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import type {
  Prisma,
  ObservationStatus,
  ObservationLifecycleStatus,
  Priority,
  PropertyType,
  StorageLockType,
  ParkingLocation,
  FloorMaterial,
  WallCoveringMaterial,
} from "@prisma/client";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { canManageInspection } from "@/lib/auth/permissions";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";
import { getInformeData } from "@/lib/inspections/get-informe-data";
import { generateReportPdf } from "@/lib/reports/generate-report-pdf";
import {
  MAX_REPORT_RETRIES,
  REPORT_RETRY_COOLDOWN_MS,
  REPORT_RETRY_COUNT_RESET_MS,
} from "@/lib/inspections/report-retry-config";
import {
  type HouseFeatureFlags,
  roomTemplateApplies,
  elementTemplateApplies,
  vehicleGateVariantApplies,
} from "@/lib/inspections/feature-flags";
import {
  FLOOR_MATERIAL_SLUG,
  WALL_MATERIAL_SLUG,
  FLOOR_MATERIAL_LABELS,
  WALL_MATERIAL_LABELS,
} from "@/lib/inspections/material-selection";

type ElementTemplateForInstance = {
  id: string;
  slug: string;
  name: string;
  order: number;
  isMaterialVariant: boolean;
  requiredFeature: Parameters<typeof elementTemplateApplies>[0]["requiredFeature"];
};

// Compartido entre createInspection y updateRoomCounts — mismo criterio de
// qué elementos se instancian (excluye variantes de material, respeta
// features de la vivienda y la variante de portón vehicular elegida).
function buildElementInstanceRows(
  elementTemplates: ElementTemplateForInstance[],
  featureFlags: HouseFeatureFlags,
  isVehicleGateAutomatic: boolean,
  roomInstanceId: string,
): Prisma.ElementInstanceCreateManyInput[] {
  const rows: Prisma.ElementInstanceCreateManyInput[] = [];
  for (const element of elementTemplates) {
    if (element.isMaterialVariant) continue;
    if (!elementTemplateApplies(element, featureFlags)) continue;
    if (!vehicleGateVariantApplies(element.slug, isVehicleGateAutomatic)) continue;
    rows.push({
      id: crypto.randomUUID(),
      roomInstanceId,
      elementTemplateId: element.id,
      name: element.name,
      order: element.order,
      status: "PENDING",
    });
  }
  return rows;
}

// Extrae los números ya usados en nombres "Singular N" (ej. "Dormitorio 3")
// — una instancia sola creada con count=1 se llama solo el nombre plural
// del recinto ("Dormitorios"), sin número, así que no aporta un número usado.
function extractUsedNumbers(names: string[], singularName: string): Set<number> {
  const used = new Set<number>();
  const pattern = new RegExp(`^${singularName} (\\d+)$`);
  for (const name of names) {
    const match = name.match(pattern);
    if (match) used.add(parseInt(match[1], 10));
  }
  return used;
}

// Números disponibles más bajos, rellenando huecos en vez de seguir
// creciendo (ej. si existen 1 y 3, el siguiente disponible es 2).
function nextAvailableNumbers(used: Set<number>, count: number): number[] {
  const result: number[] = [];
  let n = 1;
  while (result.length < count) {
    if (!used.has(n)) result.push(n);
    n++;
  }
  return result;
}

async function recomputeElementInstanceStatus(elementInstanceId: string) {
  const element = await prisma.elementInstance.findUniqueOrThrow({
    where: { id: elementInstanceId },
    include: {
      roomInstance: true,
      elementTemplate: { include: { checklistItemTemplates: true } },
      observations: true,
    },
  });

  // Mismo criterio de visibilidad que getElementInstanceData: una
  // pregunta con requiresShower/requiresBathtub solo cuenta para el total
  // si el recinto efectivamente tiene esa tina/ducha — si no, un baño sin
  // tina nunca podría llegar a 100% (contaría preguntas que el usuario
  // jamás ve).
  const visibleChecklistItems = element.elementTemplate.checklistItemTemplates.filter((item) => {
    if (!item.requiresShower && !item.requiresBathtub) return true;
    if (item.requiresShower && element.roomInstance.hasShower) return true;
    if (item.requiresBathtub && element.roomInstance.hasBathtub) return true;
    return false;
  });

  const hasObservation = element.observations.some((o) => o.status === "OBSERVATION");
  const totalChecklistItems = visibleChecklistItems.length;
  const answeredCorrect = element.observations.filter((o) => o.status === "CORRECT").length;
  const allAnsweredCorrect =
    totalChecklistItems > 0 && answeredCorrect === totalChecklistItems;

  const status = hasObservation ? "OBSERVED" : allAnsweredCorrect ? "CORRECT" : "PENDING";

  await prisma.elementInstance.update({
    where: { id: elementInstanceId },
    data: { status },
  });

  return { roomInstanceId: element.roomInstanceId };
}

function revalidateInspectionPaths(inspectionId: string, roomInstanceId: string, elementInstanceId: string) {
  revalidatePath(`/inspecciones/${inspectionId}/elementos/${elementInstanceId}`);
  revalidatePath(`/inspecciones/${inspectionId}/recintos/${roomInstanceId}`);
  revalidatePath("/");
}

// getInicioData elige el hero de Inicio por Inspection.updatedAt desc —
// pero guardar una respuesta de checklist o una foto solo toca
// Observation/Photo/ElementInstance, nunca la fila de Inspection en sí.
// Sin este touch, @updatedAt nunca se refresca después de la creación y
// el orden termina siendo, en la práctica, igual a createdAt desc.
function touchInspection(inspectionId: string) {
  // data: {} no genera un UPDATE real (Prisma lo omite y @updatedAt nunca
  // se refresca) — hay que setear el campo a mano para que el touch sirva.
  return prisma.inspection.update({ where: { id: inspectionId }, data: { updatedAt: new Date() } });
}

type SaveChecklistAnswerInput = {
  inspectionId: string;
  elementInstanceId: string;
  checklistItemTemplateId: string;
  status: ObservationStatus;
  comment?: string | null;
  priority?: Priority | null;
};

export async function saveChecklistAnswer(
  input: SaveChecklistAnswerInput,
): Promise<{ observationId: string }> {
  const { inspectionId, elementInstanceId, checklistItemTemplateId, status, comment, priority } = input;

  const session = await requireSession();

  const ownedElement = await prisma.elementInstance.findFirst({
    where: {
      id: elementInstanceId,
      roomInstance: {
        inspectionId,
        inspection: { organizationId: session.user.organizationId },
      },
    },
    select: { id: true, roomInstance: { select: { inspection: { select: { status: true } } } } },
  });
  if (!ownedElement) {
    throw new Error("Elemento no encontrado en esta organización.");
  }
  if (ownedElement.roomInstance.inspection.status === "CLOSED") {
    throw new Error("No se puede editar el checklist de una inspección cerrada.");
  }

  const existingObservation = await prisma.observation.findUnique({
    where: {
      elementInstanceId_checklistItemTemplateId: { elementInstanceId, checklistItemTemplateId },
    },
    select: { status: true, lifecycleStatus: true },
  });
  // Si ya estaba en OBSERVATION y sigue en OBSERVATION, no reiniciar el
  // ciclo de vida solo porque se editó el comentario o la prioridad — eso
  // borraría progreso de postventa (ej. ya estaba EN_REPARACION).
  const nextLifecycleStatus: ObservationLifecycleStatus | null =
    status !== "OBSERVATION"
      ? null
      : existingObservation?.status === "OBSERVATION"
        ? existingObservation.lifecycleStatus
        : "PENDIENTE";

  const observation = await prisma.observation.upsert({
    where: {
      elementInstanceId_checklistItemTemplateId: {
        elementInstanceId,
        checklistItemTemplateId,
      },
    },
    update: {
      status,
      comment: status === "OBSERVATION" ? (comment ?? null) : null,
      priority: status === "OBSERVATION" ? (priority ?? null) : null,
      lifecycleStatus: nextLifecycleStatus,
    },
    create: {
      elementInstanceId,
      checklistItemTemplateId,
      status,
      comment: status === "OBSERVATION" ? (comment ?? null) : null,
      priority: status === "OBSERVATION" ? (priority ?? null) : null,
      lifecycleStatus: nextLifecycleStatus,
    },
  });

  const { roomInstanceId } = await recomputeElementInstanceStatus(elementInstanceId);
  await touchInspection(inspectionId);
  revalidateInspectionPaths(inspectionId, roomInstanceId, elementInstanceId);

  return { observationId: observation.id };
}

type AttachPhotoInput = {
  inspectionId: string;
  elementInstanceId: string;
  observationId: string;
  url: string;
  contentType?: string | null;
};

export async function attachPhoto(
  input: AttachPhotoInput,
): Promise<{ photoId: string; url: string }> {
  const { inspectionId, elementInstanceId, observationId, url, contentType } = input;

  const session = await requireSession();

  const ownedObservation = await prisma.observation.findFirst({
    where: {
      id: observationId,
      elementInstanceId,
      elementInstance: {
        roomInstance: {
          inspectionId,
          inspection: inspectionAccessWhere(session.user.id, session.user.organizationId),
        },
      },
    },
    select: {
      id: true,
      elementInstance: { select: { roomInstance: { select: { inspection: { select: { status: true } } } } } },
    },
  });
  if (!ownedObservation) {
    throw new Error("Observación no encontrada en esta organización.");
  }
  if (ownedObservation.elementInstance.roomInstance.inspection.status === "CLOSED") {
    throw new Error("No se puede editar el checklist de una inspección cerrada.");
  }

  const photo = await prisma.photo.create({
    data: {
      observationId,
      url,
      contentType: contentType ?? null,
      kind: "EVIDENCIA",
    },
  });

  const element = await prisma.elementInstance.findUniqueOrThrow({
    where: { id: elementInstanceId },
    select: { roomInstanceId: true },
  });

  await touchInspection(inspectionId);
  revalidateInspectionPaths(inspectionId, element.roomInstanceId, elementInstanceId);

  return { photoId: photo.id, url: photo.url };
}

export type CreateInspectionState = { error?: string };

export async function createInspection(
  _prevState: CreateInspectionState,
  formData: FormData,
): Promise<CreateInspectionState> {
  const projectName = String(formData.get("projectName") ?? "").trim();
  const unitLabel = String(formData.get("unitLabel") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const propertyType = String(formData.get("propertyType") ?? "") as PropertyType;
  const developerName = String(formData.get("developerName") ?? "").trim() || null;
  const builderName = String(formData.get("builderName") ?? "").trim() || null;
  const receptionNumber = String(formData.get("receptionNumber") ?? "").trim() || null;
  const receptionDateRaw = String(formData.get("receptionDate") ?? "").trim();
  const receptionDate = receptionDateRaw ? new Date(receptionDateRaw) : null;

  // Acotado a 1-10: evita que un valor accidental o malicioso genere una
  // cantidad desproporcionada de RoomInstance/ElementInstance.
  const bedroomCount = Math.min(10, Math.max(1, parseInt(String(formData.get("bedroomCount") ?? "1"), 10) || 1));
  const bathroomCount = Math.min(10, Math.max(1, parseInt(String(formData.get("bathroomCount") ?? "1"), 10) || 1));

  if (!projectName || !unitLabel || !address) {
    return { error: "Completa proyecto inmobiliario, unidad y dirección." };
  }
  if (propertyType !== "CASA" && propertyType !== "DEPARTAMENTO") {
    return { error: "Selecciona el tipo de vivienda." };
  }

  // Cada checkbox/pregunta de seguimiento solo tiene sentido para un tipo de
  // vivienda (ver NuevaInspeccionForm.tsx) — se ignora cualquier valor que
  // llegue para el tipo que no corresponde, en vez de confiar 100% en que el
  // formulario nunca lo mande.
  const isCasa = propertyType === "CASA";

  const hasFrontYard = isCasa && formData.get("hasFrontYard") === "on";
  const hasBackYard = isCasa && formData.get("hasBackYard") === "on";
  const hasRoofSpace = isCasa && formData.get("hasRoofSpace") === "on";
  const hasStairs = isCasa && formData.get("hasStairs") === "on";
  const hasPedestrianGate = isCasa && formData.get("hasPedestrianGate") === "on";
  const hasVehicleGate = isCasa && formData.get("hasVehicleGate") === "on";
  const isVehicleGateAutomatic = hasVehicleGate && formData.get("isVehicleGateAutomatic") === "AUTOMATICO";

  const hasTerrace = !isCasa && formData.get("hasTerrace") === "on";
  const hasStorageRoom = !isCasa && formData.get("hasStorageRoom") === "on";
  const storageLockTypeRaw = String(formData.get("storageLockType") ?? "").trim();
  const storageLockType: StorageLockType | null =
    hasStorageRoom && (storageLockTypeRaw === "CANDADO" || storageLockTypeRaw === "LLAVE" || storageLockTypeRaw === "OTRO")
      ? storageLockTypeRaw
      : null;
  const hasParkingSpace = !isCasa && formData.get("hasParkingSpace") === "on";
  const parkingLocationRaw = String(formData.get("parkingLocation") ?? "").trim();
  const parkingLocation: ParkingLocation | null =
    hasParkingSpace && (parkingLocationRaw === "SUBTERRANEO" || parkingLocationRaw === "SUPERFICIE")
      ? parkingLocationRaw
      : null;
  const parkingIsMarked = hasParkingSpace ? formData.get("parkingIsMarked") === "on" : null;

  const hasGas = formData.get("hasGas") === "on";
  const hasClimatizacion = formData.get("hasClimatizacion") === "on";
  const hasPool = isCasa && formData.get("hasPool") === "on";
  const hasQuincho = isCasa && formData.get("hasQuincho") === "on";
  const hasPerimeterFence = isCasa && formData.get("hasPerimeterFence") === "on";

  const featureFlags: HouseFeatureFlags = {
    hasTerrace: isCasa ? hasFrontYard || hasBackYard : hasTerrace,
    hasRoofSpace,
    hasStairs,
    hasPedestrianGate,
    hasVehicleGate,
    hasStorageRoom,
    hasParkingSpace,
    hasGas,
    hasClimatizacion,
    hasPool,
    hasQuincho,
    hasPerimeterFence,
  };

  const session = await requireSession();

  const roomTemplates = await prisma.roomTemplate.findMany({
    orderBy: { order: "asc" },
    include: { elementTemplates: { orderBy: { order: "asc" } } },
  });
  const applicableRooms = roomTemplates.filter((room) => roomTemplateApplies(room, propertyType, featureFlags));

  // IDs generados en el cliente (no autogenerados por la base) para poder
  // armar RoomInstance/ElementInstance como dos createMany en vez de un
  // create por fila — ver nota más abajo sobre por qué importa.
  const inspectionId = crypto.randomUUID();
  const roomsData: Prisma.RoomInstanceCreateManyInput[] = [];
  const elementsData: Prisma.ElementInstanceCreateManyInput[] = [];

  for (const room of applicableRooms) {
    // "Dormitorios"/"Baños" generan N RoomInstance independientes (una por
    // dormitorio/baño declarado en el formulario), cada una con su propio
    // clon del checklist — el resto de los recintos siguen siendo 1:1 con
    // su RoomTemplate, como siempre.
    let instanceCount = 1;
    let singularName: string | null = null;
    if (room.slug === "dormitorios") {
      instanceCount = bedroomCount;
      singularName = "Dormitorio";
    } else if (room.slug === "banos") {
      instanceCount = bathroomCount;
      singularName = "Baño";
    }

    for (let i = 1; i <= instanceCount; i++) {
      const roomInstanceId = crypto.randomUUID();
      roomsData.push({
        id: roomInstanceId,
        inspectionId,
        roomTemplateId: room.id,
        name: instanceCount > 1 && singularName ? `${singularName} ${i}` : room.name,
        order: room.order * 10 + (i - 1),
      });

      elementsData.push(
        ...buildElementInstanceRows(room.elementTemplates, featureFlags, isVehicleGateAutomatic, roomInstanceId),
      );
    }
  }

  // Antes: prisma.$transaction(async (tx) => { ...un create por recinto y
  // por elemento... }) — una transacción interactiva con decenas de
  // round-trips secuenciales sobre la conexión pooled de Neon (pgbouncer en
  // modo transacción), que la cerraba a mitad de camino (Prisma P2028:
  // "Transaction not found"). Ahora son 3 operaciones (create + 2
  // createMany) enviadas como una sola transacción batch — compatible con
  // el pooler porque no mantiene la conexión abierta entre round-trips
  // separados del lado de la app.
  await prisma.$transaction([
    prisma.inspection.create({
      data: {
        id: inspectionId,
        organizationId: session.user.organizationId,
        createdByUserId: session.user.id,
        projectName,
        unitLabel,
        address,
        developerName,
        builderName,
        receptionNumber,
        receptionDate,
        propertyType,
        hasTerrace,
        hasRoofSpace,
        hasFrontYard,
        hasBackYard,
        hasStairs,
        hasPedestrianGate,
        hasVehicleGate,
        isVehicleGateAutomatic,
        hasStorageRoom,
        storageLockType,
        hasParkingSpace,
        parkingLocation,
        parkingIsMarked,
        hasGas,
        hasClimatizacion,
        hasPool,
        hasQuincho,
        hasPerimeterFence,
        bedroomCount,
        bathroomCount,
        status: "IN_PROGRESS",
      },
    }),
    prisma.roomInstance.createMany({ data: roomsData }),
    prisma.elementInstance.createMany({ data: elementsData }),
  ]);

  revalidatePath("/");

  const firstRoomId = roomsData[0]?.id as string | undefined;
  if (firstRoomId) {
    // Antes de entrar al primer recinto, un respiro con Don José Luis
    // (Sprint 2b) -- la pantalla de bienvenida recalcula este mismo
    // primer recinto por su cuenta (mismo criterio de orden), así que
    // pasarlo acá no es su única fuente de verdad.
    redirect(`/inspecciones/${inspectionId}/bienvenida`);
  }
  redirect("/");
}

type SetRoomMaterialInput = {
  inspectionId: string;
  roomInstanceId: string;
  elementInstanceId: string;
  slot: "FLOOR" | "WALL";
  material: string;
};

// Responde la pregunta de material de un recinto (Piso o Muros y
// cielos) una sola vez — no hay UI para cambiarla después. Si el
// material elegido tiene un variante propio (todo menos "Otro"),
// reasigna el ElementInstance genérico al ElementTemplate del
// variante — seguro porque esto se llama antes de que exista ninguna
// Observation para ese elemento (la pregunta bloquea el checklist).
export async function setRoomMaterial(input: SetRoomMaterialInput): Promise<void> {
  const session = await requireSession();

  const room = await prisma.roomInstance.findFirst({
    where: {
      id: input.roomInstanceId,
      inspectionId: input.inspectionId,
      inspection: inspectionAccessWhere(session.user.id, session.user.organizationId),
    },
    select: { id: true, roomTemplateId: true },
  });
  if (!room) {
    throw new Error("Recinto no encontrado en esta organización.");
  }

  const ownedElement = await prisma.elementInstance.findFirst({
    where: { id: input.elementInstanceId, roomInstanceId: input.roomInstanceId },
    select: { id: true },
  });
  if (!ownedElement) {
    throw new Error("Elemento no encontrado en este recinto.");
  }

  const isValidMaterial =
    input.slot === "FLOOR"
      ? Object.hasOwn(FLOOR_MATERIAL_LABELS, input.material)
      : Object.hasOwn(WALL_MATERIAL_LABELS, input.material);
  if (!isValidMaterial) {
    throw new Error("Material seleccionado no es válido.");
  }

  const targetSlug =
    input.slot === "FLOOR"
      ? FLOOR_MATERIAL_SLUG[input.material as FloorMaterial]
      : WALL_MATERIAL_SLUG[input.material as WallCoveringMaterial];

  await prisma.$transaction(async (tx) => {
    await tx.roomInstance.update({
      where: { id: input.roomInstanceId },
      data:
        input.slot === "FLOOR"
          ? { floorMaterial: input.material as FloorMaterial }
          : { wallCoveringMaterial: input.material as WallCoveringMaterial },
    });

    if (targetSlug) {
      const variant = await tx.elementTemplate.findFirst({
        where: { roomTemplateId: room.roomTemplateId, slug: targetSlug },
        select: { id: true },
      });
      if (variant) {
        await tx.elementInstance.update({
          where: { id: input.elementInstanceId },
          data: { elementTemplateId: variant.id },
        });
      }
    }
  });

  revalidatePath(`/inspecciones/${input.inspectionId}/elementos/${input.elementInstanceId}`);
  redirect(`/inspecciones/${input.inspectionId}/elementos/${input.elementInstanceId}`);
}

type SetBathroomFixturesInput = {
  inspectionId: string;
  roomInstanceId: string;
  elementInstanceId: string;
  hasShower: boolean;
  hasBathtub: boolean;
};

// Responde "¿Qué tiene este baño?" (ducha / tina, selección múltiple)
// una sola vez por recinto — no hay UI para cambiarla después. A
// diferencia de setRoomMaterial, esto no reasigna ElementTemplate: solo
// guarda los 2 booleanos, y getElementInstanceData filtra qué preguntas
// del checklist de "Impermeabilización y sellos" quedan visibles según
// esta respuesta.
export async function setBathroomFixtures(input: SetBathroomFixturesInput): Promise<void> {
  const session = await requireSession();

  const room = await prisma.roomInstance.findFirst({
    where: {
      id: input.roomInstanceId,
      inspectionId: input.inspectionId,
      inspection: inspectionAccessWhere(session.user.id, session.user.organizationId),
    },
    select: { id: true },
  });
  if (!room) {
    throw new Error("Recinto no encontrado en esta organización.");
  }

  const ownedElement = await prisma.elementInstance.findFirst({
    where: { id: input.elementInstanceId, roomInstanceId: input.roomInstanceId },
    select: { id: true },
  });
  if (!ownedElement) {
    throw new Error("Elemento no encontrado en este recinto.");
  }

  await prisma.roomInstance.update({
    where: { id: input.roomInstanceId },
    data: { hasShower: input.hasShower, hasBathtub: input.hasBathtub },
  });

  revalidatePath(`/inspecciones/${input.inspectionId}/elementos/${input.elementInstanceId}`);
  redirect(`/inspecciones/${input.inspectionId}/elementos/${input.elementInstanceId}`);
}

type RoomCountFieldConfig = {
  slug: "dormitorios" | "banos";
  singularName: string;
  field: "bedroomCount" | "bathroomCount";
};

const ROOM_COUNT_CONFIG: RoomCountFieldConfig[] = [
  { slug: "dormitorios", singularName: "Dormitorio", field: "bedroomCount" },
  { slug: "banos", singularName: "Baño", field: "bathroomCount" },
];

type UpdateRoomCountsInput = {
  inspectionId: string;
  bedroomCount: number;
  bathroomCount: number;
};

export type RoomCountReduction = {
  roomSlug: "dormitorios" | "banos";
  label: string;
  from: number;
  to: number;
};

export type UpdateRoomCountsResult = {
  needsReduction: RoomCountReduction[];
};

// Aumentar es directo (agrega instancias, mismo criterio que
// createInspection). Reducir NUNCA borra automáticamente acá — solo
// informa qué recintos necesitan que el usuario elija cuáles eliminar
// (ver deleteRoomInstance), con evidencia real antes de decidir.
export async function updateRoomCounts(input: UpdateRoomCountsInput): Promise<UpdateRoomCountsResult> {
  const session = await requireSession();

  const targetByField = {
    bedroomCount: Math.min(10, Math.max(1, input.bedroomCount)),
    bathroomCount: Math.min(10, Math.max(1, input.bathroomCount)),
  };

  const inspection = await prisma.inspection.findFirst({
    where: { id: input.inspectionId, organizationId: session.user.organizationId },
  });
  if (!inspection) {
    throw new Error("Inspección no encontrada en esta organización.");
  }
  if (!canManageInspection(session.user.role)) {
    throw new Error("Solo el propietario o un administrador puede realizar esta acción.");
  }

  const featureFlags: HouseFeatureFlags = {
    hasTerrace: inspection.hasTerrace,
    hasRoofSpace: inspection.hasRoofSpace,
    hasStairs: inspection.hasStairs,
    hasPedestrianGate: inspection.hasPedestrianGate,
    hasVehicleGate: inspection.hasVehicleGate,
    hasStorageRoom: inspection.hasStorageRoom,
    hasParkingSpace: inspection.hasParkingSpace,
    hasGas: inspection.hasGas,
    hasClimatizacion: inspection.hasClimatizacion,
    hasPool: inspection.hasPool,
    hasQuincho: inspection.hasQuincho,
    hasPerimeterFence: inspection.hasPerimeterFence,
  };

  const needsReduction: RoomCountReduction[] = [];

  for (const config of ROOM_COUNT_CONFIG) {
    const target = targetByField[config.field];

    const roomTemplate = await prisma.roomTemplate.findFirst({
      where: { slug: config.slug },
      include: { elementTemplates: { orderBy: { order: "asc" } } },
    });
    if (!roomTemplate) continue;

    const existingInstances = await prisma.roomInstance.findMany({
      where: { inspectionId: input.inspectionId, roomTemplateId: roomTemplate.id },
      select: { id: true, name: true },
    });
    const currentCount = existingInstances.length;

    if (target < currentCount) {
      needsReduction.push({ roomSlug: config.slug, label: config.singularName, from: currentCount, to: target });
      continue;
    }
    if (target === currentCount) continue;

    const toAdd = target - currentCount;

    // Una sola instancia sin numerar (nombre = plural del recinto, ej.
    // "Dormitorios") pasa a "Dormitorio 1" antes de agregar la segunda —
    // para no dejar una instancia sin número mezclada con numeradas.
    if (currentCount === 1 && existingInstances[0].name === roomTemplate.name) {
      await prisma.roomInstance.update({
        where: { id: existingInstances[0].id },
        data: { name: `${config.singularName} 1` },
      });
      existingInstances[0] = { ...existingInstances[0], name: `${config.singularName} 1` };
    }

    const usedNumbers = extractUsedNumbers(
      existingInstances.map((instance) => instance.name),
      config.singularName,
    );
    const newNumbers = nextAvailableNumbers(usedNumbers, toAdd);

    const roomsData: Prisma.RoomInstanceCreateManyInput[] = [];
    const elementsData: Prisma.ElementInstanceCreateManyInput[] = [];

    for (const number of newNumbers) {
      const roomInstanceId = crypto.randomUUID();
      roomsData.push({
        id: roomInstanceId,
        inspectionId: input.inspectionId,
        roomTemplateId: roomTemplate.id,
        name: `${config.singularName} ${number}`,
        order: roomTemplate.order * 10 + (number - 1),
      });
      elementsData.push(
        ...buildElementInstanceRows(
          roomTemplate.elementTemplates,
          featureFlags,
          inspection.isVehicleGateAutomatic,
          roomInstanceId,
        ),
      );
    }

    await prisma.$transaction([
      prisma.roomInstance.createMany({ data: roomsData }),
      prisma.elementInstance.createMany({ data: elementsData }),
      prisma.inspection.update({ where: { id: input.inspectionId }, data: { [config.field]: target } }),
    ]);
  }

  revalidatePath(`/inspecciones/${input.inspectionId}/recintos`);
  revalidatePath("/");

  return { needsReduction };
}

type DeleteRoomInstanceInput = {
  inspectionId: string;
  roomInstanceId: string;
};

export type DeleteRoomInstanceResult = {
  remainingCount: number;
};

// El DELETE real — se asume que el cliente ya mostró la evidencia y pidió
// confirmación explícita antes de llamar esto (ver EditDistributionForm).
// No renombra las instancias que quedan: si se borra "Dormitorio 2" de 3,
// quedan "Dormitorio 1" y "Dormitorio 3" con hueco en la numeración a
// propósito — no se reasigna la identidad de un recinto con evidencia real.
export async function deleteRoomInstance(input: DeleteRoomInstanceInput): Promise<DeleteRoomInstanceResult> {
  const session = await requireSession();

  const room = await prisma.roomInstance.findFirst({
    where: {
      id: input.roomInstanceId,
      inspectionId: input.inspectionId,
      inspection: { organizationId: session.user.organizationId },
    },
    include: { roomTemplate: true },
  });
  if (!room) {
    throw new Error("Recinto no encontrado en esta organización.");
  }
  if (!canManageInspection(session.user.role)) {
    throw new Error("Solo el propietario o un administrador puede realizar esta acción.");
  }

  const countConfig = ROOM_COUNT_CONFIG.find((config) => config.slug === room.roomTemplate.slug);

  const elements = await prisma.elementInstance.findMany({
    where: { roomInstanceId: input.roomInstanceId },
    select: { id: true },
  });
  const elementIds = elements.map((element) => element.id);

  const observations = await prisma.observation.findMany({
    where: { elementInstanceId: { in: elementIds } },
    select: { id: true },
  });
  const observationIds = observations.map((observation) => observation.id);

  const photos = await prisma.photo.findMany({
    where: { observationId: { in: observationIds } },
    select: { id: true, url: true },
  });

  // Best-effort: borra los archivos reales del blob storage. Si alguno
  // falla (token, red) no bloquea el borrado en la base — la evidencia
  // igual desaparece de la app, que es lo que promete el modal.
  await Promise.allSettled(photos.map((photo) => del(photo.url)));

  await prisma.$transaction(async (tx) => {
    await tx.photo.deleteMany({ where: { id: { in: photos.map((photo) => photo.id) } } });
    await tx.observation.deleteMany({ where: { id: { in: observationIds } } });
    await tx.elementInstance.deleteMany({ where: { id: { in: elementIds } } });
    await tx.roomInstance.delete({ where: { id: input.roomInstanceId } });

    if (countConfig) {
      const remaining = await tx.roomInstance.count({
        where: { inspectionId: input.inspectionId, roomTemplateId: room.roomTemplateId },
      });
      await tx.inspection.update({
        where: { id: input.inspectionId },
        data: { [countConfig.field]: Math.max(1, remaining) },
      });
    }
  });

  const remainingCount = await prisma.roomInstance.count({
    where: { inspectionId: input.inspectionId, roomTemplateId: room.roomTemplateId },
  });

  revalidatePath(`/inspecciones/${input.inspectionId}/recintos`);
  revalidatePath("/");

  return { remainingCount };
}

type DeleteElementInstanceInput = {
  inspectionId: string;
  elementInstanceId: string;
};

export type DeleteElementInstanceResult = { success: true };

// Igual que deleteRoomInstance pero para un elemento suelto (Reja
// peatonal, Portón vehicular) que vive dentro de un recinto que sigue
// existiendo (Exterior) — no toca el RoomInstance ni sus otros elementos.
export async function deleteElementInstance(input: DeleteElementInstanceInput): Promise<DeleteElementInstanceResult> {
  const session = await requireSession();

  const element = await prisma.elementInstance.findFirst({
    where: {
      id: input.elementInstanceId,
      roomInstance: {
        inspectionId: input.inspectionId,
        inspection: { organizationId: session.user.organizationId },
      },
    },
    select: { id: true, roomInstanceId: true },
  });
  if (!element) {
    throw new Error("Elemento no encontrado en esta organización.");
  }
  if (!canManageInspection(session.user.role)) {
    throw new Error("Solo el propietario o un administrador puede realizar esta acción.");
  }

  const observations = await prisma.observation.findMany({
    where: { elementInstanceId: element.id },
    select: { id: true },
  });
  const observationIds = observations.map((observation) => observation.id);

  const photos = await prisma.photo.findMany({
    where: { observationId: { in: observationIds } },
    select: { id: true, url: true },
  });

  await Promise.allSettled(photos.map((photo) => del(photo.url)));

  await prisma.$transaction([
    prisma.photo.deleteMany({ where: { id: { in: photos.map((photo) => photo.id) } } }),
    prisma.observation.deleteMany({ where: { id: { in: observationIds } } }),
    prisma.elementInstance.delete({ where: { id: element.id } }),
  ]);

  revalidatePath(`/inspecciones/${input.inspectionId}/recintos/${element.roomInstanceId}`);
  revalidatePath("/");

  return { success: true };
}

// ---------- Características de la propiedad (7 flags) + tipo de vivienda ----------

// Recintos completos que solo existen si su feature está activo.
const FEATURE_ROOM_SLUGS = [
  "terraza-patio",
  "techumbre",
  "escalera",
  "bodega",
  "estacionamiento",
  "piscina",
  "quincho",
] as const;
// Elementos sueltos dentro de un recinto que siempre existe, gatillados
// por feature — porton-vehicular-manual/automatico son variantes
// mutuamente excluyentes del mismo feature (ver vehicleGateVariantApplies).
const GATED_EXTERIOR_ELEMENT_SLUGS = [
  "reja-peatonal",
  "porton-vehicular-manual",
  "porton-vehicular-automatico",
  "cierre-perimetral",
] as const;
const GATED_INSTALACIONES_ELEMENT_SLUGS = ["instalacion-de-gas", "climatizacion-calefaccion"] as const;
// Recintos que siempre existen pero tienen elementos sueltos gatillados
// por feature adentro (a diferencia de FEATURE_ROOM_SLUGS, el recinto en
// sí no depende de ningún feature).
const GATED_ELEMENT_HOST_ROOMS = [
  { roomSlug: "exterior", elementSlugs: GATED_EXTERIOR_ELEMENT_SLUGS },
  { roomSlug: "instalaciones", elementSlugs: GATED_INSTALACIONES_ELEMENT_SLUGS },
] as const;

type RawFeatureInput = {
  hasFrontYard: boolean;
  hasBackYard: boolean;
  hasRoofSpace: boolean;
  hasStairs: boolean;
  hasPedestrianGate: boolean;
  hasVehicleGate: boolean;
  isVehicleGateAutomatic: boolean;
  hasTerrace: boolean;
  hasStorageRoom: boolean;
  hasParkingSpace: boolean;
  hasGas: boolean;
  hasClimatizacion: boolean;
  hasPool: boolean;
  hasQuincho: boolean;
  hasPerimeterFence: boolean;
};

function deriveFeatureFlags(propertyType: PropertyType, raw: RawFeatureInput): HouseFeatureFlags {
  const isCasa = propertyType === "CASA";
  return {
    hasTerrace: isCasa ? raw.hasFrontYard || raw.hasBackYard : raw.hasTerrace,
    hasRoofSpace: isCasa && raw.hasRoofSpace,
    hasStairs: isCasa && raw.hasStairs,
    hasPedestrianGate: isCasa && raw.hasPedestrianGate,
    hasVehicleGate: isCasa && raw.hasVehicleGate,
    hasStorageRoom: !isCasa && raw.hasStorageRoom,
    hasParkingSpace: !isCasa && raw.hasParkingSpace,
    hasGas: raw.hasGas,
    hasClimatizacion: raw.hasClimatizacion,
    hasPool: isCasa && raw.hasPool,
    hasQuincho: isCasa && raw.hasQuincho,
    hasPerimeterFence: isCasa && raw.hasPerimeterFence,
  };
}

export type PendingRemovalItem = {
  id: string;
  kind: "room" | "element";
  name: string;
  elementsDone: number;
  elementsTotal: number;
  photoCount: number;
  observationCount: number;
};

type RoomTemplateForFeature = {
  id: string;
  slug: string;
  name: string;
  order: number;
  appliesToCasa: boolean;
  appliesToDepto: boolean;
  requiredFeature: Parameters<typeof roomTemplateApplies>[0]["requiredFeature"];
  elementTemplates: ElementTemplateForInstance[];
};

// Compara qué recintos/elementos gatillados por feature DEBERÍAN existir
// bajo el propertyType/flags propuestos contra los que EXISTEN hoy en la
// inspección. No escribe nada — la usan tanto la preview de tipo de
// vivienda (solo lectura) como applyFeatureChanges (que sí escribe).
async function computeFeatureDiff(
  inspectionId: string,
  propertyType: PropertyType,
  raw: RawFeatureInput,
): Promise<{
  roomsToAdd: RoomTemplateForFeature[];
  elementsToAdd: { elementTemplate: ElementTemplateForInstance; roomInstanceId: string }[];
  itemsToRemove: PendingRemovalItem[];
}> {
  const featureFlags = deriveFeatureFlags(propertyType, raw);

  const hostRoomSlugs = GATED_ELEMENT_HOST_ROOMS.map((host) => host.roomSlug);
  const roomTemplates = await prisma.roomTemplate.findMany({
    where: { slug: { in: [...FEATURE_ROOM_SLUGS, ...hostRoomSlugs] } },
    include: { elementTemplates: { orderBy: { order: "asc" } } },
  });
  const roomTemplateBySlug = new Map(roomTemplates.map((template) => [template.slug, template]));

  const existingRooms = await prisma.roomInstance.findMany({
    where: { inspectionId, roomTemplateId: { in: roomTemplates.map((template) => template.id) } },
    include: {
      roomTemplate: { select: { slug: true } },
      elements: { include: { observations: { include: { photos: { select: { id: true } } } } } },
    },
  });

  function roomEvidence(room: (typeof existingRooms)[number]): PendingRemovalItem {
    const elementsTotal = room.elements.length;
    const elementsDone = room.elements.filter((element) => element.status !== "PENDING").length;
    const observations = room.elements.flatMap((element) => element.observations);
    const observationCount = observations.filter((observation) => observation.status === "OBSERVATION").length;
    const photoCount = observations.reduce((sum, observation) => sum + observation.photos.length, 0);
    return { id: room.id, kind: "room", name: room.name, elementsDone, elementsTotal, photoCount, observationCount };
  }

  const roomsToAdd: RoomTemplateForFeature[] = [];
  const itemsToRemove: PendingRemovalItem[] = [];

  for (const slug of FEATURE_ROOM_SLUGS) {
    const template = roomTemplateBySlug.get(slug);
    if (!template) continue;
    const shouldExist = roomTemplateApplies(template, propertyType, featureFlags);
    const existing = existingRooms.find((room) => room.roomTemplate.slug === slug);

    if (shouldExist && !existing) {
      roomsToAdd.push(template);
    } else if (!shouldExist && existing) {
      itemsToRemove.push(roomEvidence(existing));
    }
  }

  const elementsToAdd: { elementTemplate: ElementTemplateForInstance; roomInstanceId: string }[] = [];

  for (const host of GATED_ELEMENT_HOST_ROOMS) {
    const hostTemplate = roomTemplateBySlug.get(host.roomSlug);
    const hostInstance = await prisma.roomInstance.findFirst({
      where: { inspectionId, roomTemplate: { slug: host.roomSlug } },
      select: { id: true },
    });
    if (!hostTemplate || !hostInstance) continue;

    const gatedTemplates = hostTemplate.elementTemplates.filter((template) =>
      (host.elementSlugs as readonly string[]).includes(template.slug),
    );
    const existingElements = await prisma.elementInstance.findMany({
      where: {
        roomInstanceId: hostInstance.id,
        elementTemplate: { slug: { in: [...host.elementSlugs] } },
      },
      include: {
        elementTemplate: { select: { slug: true } },
        observations: { include: { photos: { select: { id: true } } } },
      },
    });

    for (const template of gatedTemplates) {
      const shouldExist =
        elementTemplateApplies(template, featureFlags) &&
        vehicleGateVariantApplies(template.slug, raw.isVehicleGateAutomatic);
      const existing = existingElements.find((element) => element.elementTemplate.slug === template.slug);

      if (shouldExist && !existing) {
        elementsToAdd.push({ elementTemplate: template, roomInstanceId: hostInstance.id });
      } else if (!shouldExist && existing) {
        const observationCount = existing.observations.filter((o) => o.status === "OBSERVATION").length;
        const photoCount = existing.observations.reduce((sum, o) => sum + o.photos.length, 0);
        itemsToRemove.push({
          id: existing.id,
          kind: "element",
          name: existing.name,
          elementsDone: existing.status !== "PENDING" ? 1 : 0,
          elementsTotal: 1,
          photoCount,
          observationCount,
        });
      }
    }
  }

  return { roomsToAdd, elementsToAdd, itemsToRemove };
}

type PreviewPropertyTypeInput = RawFeatureInput & {
  inspectionId: string;
  propertyType: PropertyType;
};

export type PropertyTypeDiffPreview = {
  roomsToAddNames: string[];
  elementsToAddNames: string[];
  itemsToRemove: PendingRemovalItem[];
};

// Solo lectura — no escribe nada. Muestra el impacto completo de cambiar
// propertyType ANTES de que el usuario confirme (ver EditPropertyTypeForm).
export async function previewPropertyTypeChange(input: PreviewPropertyTypeInput): Promise<PropertyTypeDiffPreview> {
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: input.inspectionId, organizationId: session.user.organizationId },
    select: { id: true },
  });
  if (!inspection) {
    throw new Error("Inspección no encontrada en esta organización.");
  }

  const diff = await computeFeatureDiff(input.inspectionId, input.propertyType, input);

  return {
    roomsToAddNames: diff.roomsToAdd.map((template) => template.name),
    elementsToAddNames: diff.elementsToAdd.map((item) => item.elementTemplate.name),
    itemsToRemove: diff.itemsToRemove,
  };
}

type ApplyFeatureChangesInput = RawFeatureInput & {
  inspectionId: string;
  propertyType: PropertyType;
  storageLockType: StorageLockType | null;
  parkingLocation: ParkingLocation | null;
  parkingIsMarked: boolean | null;
};

export type ApplyFeatureChangesResult = {
  itemsToRemove: PendingRemovalItem[];
};

// Usada tanto por "Características de la propiedad" (propertyType sin
// cambiar) como por el paso final de "Tipo de vivienda" (propertyType
// nuevo) — mismo criterio en ambas: lo seguro (agregar) se aplica al
// toque, lo destructivo (quitar) queda pendiente para que el usuario lo
// resuelva uno por uno con evidencia + doble confirmación
// (ver PendingRemovalsPanel + deleteRoomInstance/deleteElementInstance).
export async function applyFeatureChanges(input: ApplyFeatureChangesInput): Promise<ApplyFeatureChangesResult> {
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: input.inspectionId, organizationId: session.user.organizationId },
  });
  if (!inspection) {
    throw new Error("Inspección no encontrada en esta organización.");
  }
  if (!canManageInspection(session.user.role)) {
    throw new Error("Solo el propietario o un administrador puede realizar esta acción.");
  }

  const isCasa = input.propertyType === "CASA";
  const raw: RawFeatureInput = {
    hasFrontYard: isCasa && input.hasFrontYard,
    hasBackYard: isCasa && input.hasBackYard,
    hasRoofSpace: isCasa && input.hasRoofSpace,
    hasStairs: isCasa && input.hasStairs,
    hasPedestrianGate: isCasa && input.hasPedestrianGate,
    hasVehicleGate: isCasa && input.hasVehicleGate,
    isVehicleGateAutomatic: isCasa && input.hasVehicleGate && input.isVehicleGateAutomatic,
    hasTerrace: !isCasa && input.hasTerrace,
    hasStorageRoom: !isCasa && input.hasStorageRoom,
    hasParkingSpace: !isCasa && input.hasParkingSpace,
    hasGas: input.hasGas,
    hasClimatizacion: input.hasClimatizacion,
    hasPool: isCasa && input.hasPool,
    hasQuincho: isCasa && input.hasQuincho,
    hasPerimeterFence: isCasa && input.hasPerimeterFence,
  };
  const storageLockType = raw.hasStorageRoom ? input.storageLockType : null;
  const parkingLocation = raw.hasParkingSpace ? input.parkingLocation : null;
  const parkingIsMarked = raw.hasParkingSpace ? input.parkingIsMarked : null;

  const diff = await computeFeatureDiff(input.inspectionId, input.propertyType, raw);
  const featureFlags = deriveFeatureFlags(input.propertyType, raw);

  await prisma.$transaction(async (tx) => {
    await tx.inspection.update({
      where: { id: input.inspectionId },
      data: {
        propertyType: input.propertyType,
        hasFrontYard: raw.hasFrontYard,
        hasBackYard: raw.hasBackYard,
        hasRoofSpace: raw.hasRoofSpace,
        hasStairs: raw.hasStairs,
        hasPedestrianGate: raw.hasPedestrianGate,
        hasVehicleGate: raw.hasVehicleGate,
        isVehicleGateAutomatic: raw.isVehicleGateAutomatic,
        hasTerrace: raw.hasTerrace,
        hasStorageRoom: raw.hasStorageRoom,
        storageLockType,
        hasParkingSpace: raw.hasParkingSpace,
        parkingLocation,
        parkingIsMarked,
        hasGas: raw.hasGas,
        hasClimatizacion: raw.hasClimatizacion,
        hasPool: raw.hasPool,
        hasQuincho: raw.hasQuincho,
        hasPerimeterFence: raw.hasPerimeterFence,
      },
    });

    for (const template of diff.roomsToAdd) {
      const roomInstanceId = crypto.randomUUID();
      await tx.roomInstance.create({
        data: {
          id: roomInstanceId,
          inspectionId: input.inspectionId,
          roomTemplateId: template.id,
          name: template.name,
          order: template.order * 10,
        },
      });
      const elementRows = buildElementInstanceRows(
        template.elementTemplates,
        featureFlags,
        raw.isVehicleGateAutomatic,
        roomInstanceId,
      );
      if (elementRows.length > 0) {
        await tx.elementInstance.createMany({ data: elementRows });
      }
    }

    if (diff.elementsToAdd.length > 0) {
      await tx.elementInstance.createMany({
        data: diff.elementsToAdd.map(({ elementTemplate, roomInstanceId }) => ({
          id: crypto.randomUUID(),
          roomInstanceId,
          elementTemplateId: elementTemplate.id,
          name: elementTemplate.name,
          order: elementTemplate.order,
          status: "PENDING" as const,
        })),
      });
    }
  });

  revalidatePath(`/inspecciones/${input.inspectionId}/recintos`);
  revalidatePath("/");

  return { itemsToRemove: diff.itemsToRemove };
}

type CloseInspectionInput = {
  inspectionId: string;
  signatureOwnerUrl: string;
  signatureBuilderUrl: string;
};

export type CloseInspectionResult = { success: true };

// Cerrar la inspección y generar el informe final son la misma acción:
// se congela un snapshot de los datos actuales en Report.snapshot (para
// que cambios futuros al catálogo maestro no alteren un informe ya
// firmado) y se dispara en background, después de responder, la
// generación real del PDF vía Puppeteer (generateReportPdf).
export async function closeInspection(input: CloseInspectionInput): Promise<CloseInspectionResult> {
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: input.inspectionId, organizationId: session.user.organizationId },
    select: { id: true, status: true },
  });
  if (!inspection) {
    throw new Error("Inspección no encontrada en esta organización.");
  }
  if (inspection.status === "CLOSED") {
    throw new Error("Esta inspección ya fue cerrada.");
  }
  if (!canManageInspection(session.user.role)) {
    throw new Error("Solo el propietario o un administrador puede realizar esta acción.");
  }

  const informeData = await getInformeData(input.inspectionId);
  if (!informeData) {
    throw new Error("No se pudo construir el snapshot del informe.");
  }
  // Redondeo por JSON: las fechas quedan como strings ISO, único formato
  // válido para el campo Json — get-informe-data.hydrateInformeSnapshot
  // las vuelve a convertir a Date al leer.
  const snapshot = JSON.parse(JSON.stringify(informeData));

  const report = await prisma.$transaction(async (tx) => {
    await tx.inspection.update({
      where: { id: input.inspectionId },
      data: { status: "CLOSED" },
    });
    return tx.report.create({
      data: {
        inspectionId: input.inspectionId,
        status: "PENDING",
        signatureOwnerUrl: input.signatureOwnerUrl,
        signatureBuilderUrl: input.signatureBuilderUrl,
        signedAt: new Date(),
        generatedByUserId: session.user.id,
        snapshot,
        lastAttemptAt: new Date(),
      },
    });
  });

  revalidatePath(`/inspecciones/${input.inspectionId}/resumen`);
  revalidatePath(`/inspecciones/${input.inspectionId}/informe`);
  revalidatePath("/");

  after(() => generateReportPdf(report.id));

  return { success: true };
}

export type RetryReportGenerationResult = { success: true };

// Cubre el caso esperable de que Chromium headless falle una vez
// (timeout, cold start) — vuelve a intentar la misma generación sin
// tocar el snapshot ni las firmas ya guardadas. El límite de intentos y
// el cooldown son server-side a propósito — el disabled del botón en
// InformeToolbar es solo UX, no una barrera real.
export async function retryReportGeneration(inspectionId: string): Promise<RetryReportGenerationResult> {
  const session = await requireSession();

  const report = await prisma.report.findFirst({
    where: { inspectionId, inspection: { organizationId: session.user.organizationId } },
    select: { id: true, status: true, retryCount: true, lastAttemptAt: true },
  });
  if (!report) {
    throw new Error("Informe no encontrado en esta organización.");
  }
  if (report.status === "READY") {
    return { success: true };
  }

  const msSinceLastAttempt = Date.now() - report.lastAttemptAt.getTime();
  const retriesExhausted = report.retryCount >= MAX_REPORT_RETRIES;
  // Si se agotaron los reintentos hace más de una hora, se trata como una
  // ventana nueva — cubre el caso de un problema transitorio de la
  // plataforma en vez de dejar el informe sin salida para siempre.
  const canResetAfterExhaustion = retriesExhausted && msSinceLastAttempt > REPORT_RETRY_COUNT_RESET_MS;

  if (retriesExhausted && !canResetAfterExhaustion) {
    throw new Error("Se alcanzó el máximo de reintentos para este informe.");
  }
  if (!retriesExhausted && msSinceLastAttempt < REPORT_RETRY_COOLDOWN_MS) {
    throw new Error("Espera unos segundos antes de volver a intentar.");
  }

  await prisma.report.update({
    where: { id: report.id },
    data: {
      status: "PENDING",
      errorMessage: null,
      retryCount: canResetAfterExhaustion ? 1 : { increment: 1 },
      lastAttemptAt: new Date(),
    },
  });
  revalidatePath(`/inspecciones/${inspectionId}/informe`);

  after(() => generateReportPdf(report.id));

  return { success: true };
}

const LIFECYCLE_LABELS: Record<ObservationLifecycleStatus, string> = {
  PENDIENTE: "Pendiente",
  EN_REPARACION: "En reparación",
  RESUELTO: "Resuelto",
  VERIFICADO: "Verificado",
};

type AdvanceObservationLifecycleInput = {
  observationId: string;
  lifecycleStatus: ObservationLifecycleStatus;
  repairPhotoUrls?: string[];
};

export type AdvanceObservationLifecycleResult = { success: true };

// A diferencia de saveChecklistAnswer/attachPhoto, esta acción funciona
// sin importar si la inspección está CLOSED — es justamente el flujo de
// postventa que sigue vivo después del cierre y de que el informe ya se
// firmó. No toca Report/snapshot en absoluto.
export async function advanceObservationLifecycle(
  input: AdvanceObservationLifecycleInput,
): Promise<AdvanceObservationLifecycleResult> {
  const session = await requireSession();

  const observation = await prisma.observation.findFirst({
    where: {
      id: input.observationId,
      elementInstance: {
        roomInstance: { inspection: inspectionAccessWhere(session.user.id, session.user.organizationId) },
      },
    },
    select: {
      id: true,
      status: true,
      elementInstance: {
        select: {
          name: true,
          roomInstance: { select: { name: true, inspectionId: true } },
        },
      },
    },
  });
  if (!observation) {
    throw new Error("Observación no encontrada en esta organización.");
  }
  if (observation.status !== "OBSERVATION") {
    throw new Error("Solo se puede avanzar el ciclo de vida de una observación.");
  }

  const inspectionId = observation.elementInstance.roomInstance.inspectionId;

  await prisma.$transaction(async (tx) => {
    await tx.observation.update({
      where: { id: input.observationId },
      data: {
        lifecycleStatus: input.lifecycleStatus,
        lifecycleUpdatedAt: new Date(),
        lifecycleUpdatedByUserId: session.user.id,
      },
    });

    if (input.repairPhotoUrls && input.repairPhotoUrls.length > 0) {
      await tx.photo.createMany({
        data: input.repairPhotoUrls.map((url) => ({
          observationId: input.observationId,
          url,
          kind: "REPARACION" as const,
        })),
      });
    }

    await tx.notification.create({
      data: {
        organizationId: session.user.organizationId,
        userId: null,
        createdByUserId: session.user.id,
        type: "OBSERVATION_LIFECYCLE_CHANGED",
        title: `${observation.elementInstance.roomInstance.name} · ${observation.elementInstance.name}`,
        body: `Cambió a "${LIFECYCLE_LABELS[input.lifecycleStatus]}"`,
        linkUrl: `/inspecciones/${inspectionId}/resumen`,
      },
    });
  });

  revalidatePath(`/inspecciones/${inspectionId}/resumen`);

  return { success: true };
}
