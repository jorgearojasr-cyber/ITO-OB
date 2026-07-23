"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type {
  Prisma,
  ObservationStatus,
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
    select: { id: true },
  });
  if (!ownedElement) {
    throw new Error("Elemento no encontrado en esta organización.");
  }

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
    },
    create: {
      elementInstanceId,
      checklistItemTemplateId,
      status,
      comment: status === "OBSERVATION" ? (comment ?? null) : null,
      priority: status === "OBSERVATION" ? (priority ?? null) : null,
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
          inspection: { organizationId: session.user.organizationId },
        },
      },
    },
    select: { id: true },
  });
  if (!ownedObservation) {
    throw new Error("Observación no encontrada en esta organización.");
  }

  const photo = await prisma.photo.create({
    data: {
      observationId,
      url,
      contentType: contentType ?? null,
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

  const featureFlags: HouseFeatureFlags = {
    hasTerrace: isCasa ? hasFrontYard || hasBackYard : hasTerrace,
    hasRoofSpace,
    hasStairs,
    hasPedestrianGate,
    hasVehicleGate,
    hasStorageRoom,
    hasParkingSpace,
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
    redirect(`/inspecciones/${inspectionId}/recintos/${firstRoomId}`);
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
      inspection: { organizationId: session.user.organizationId },
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
      inspection: { organizationId: session.user.organizationId },
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

  const featureFlags: HouseFeatureFlags = {
    hasTerrace: inspection.hasTerrace,
    hasRoofSpace: inspection.hasRoofSpace,
    hasStairs: inspection.hasStairs,
    hasPedestrianGate: inspection.hasPedestrianGate,
    hasVehicleGate: inspection.hasVehicleGate,
    hasStorageRoom: inspection.hasStorageRoom,
    hasParkingSpace: inspection.hasParkingSpace,
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
