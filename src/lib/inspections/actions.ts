"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ObservationStatus, Priority, PropertyType, RoomFeatureRequirement } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

function roomTemplateApplies(
  room: { appliesToCasa: boolean; appliesToDepto: boolean; requiredFeature: RoomFeatureRequirement },
  propertyType: PropertyType,
  hasTerrace: boolean,
  hasRoofSpace: boolean,
): boolean {
  const appliesToPropertyType = propertyType === "CASA" ? room.appliesToCasa : room.appliesToDepto;
  if (!appliesToPropertyType) return false;

  switch (room.requiredFeature) {
    case "NINGUNA":
      return true;
    case "TERRAZA":
      return hasTerrace;
    case "TECHUMBRE":
      return hasRoofSpace;
  }
}

async function recomputeElementInstanceStatus(elementInstanceId: string) {
  const element = await prisma.elementInstance.findUniqueOrThrow({
    where: { id: elementInstanceId },
    include: {
      elementTemplate: { include: { checklistItemTemplates: true } },
      observations: true,
    },
  });

  const hasObservation = element.observations.some((o) => o.status === "OBSERVATION");
  const totalChecklistItems = element.elementTemplate.checklistItemTemplates.length;
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
  const hasTerrace = formData.get("hasTerrace") === "on";
  const hasRoofSpace = formData.get("hasRoofSpace") === "on";

  if (!projectName || !unitLabel || !address) {
    return { error: "Completa proyecto inmobiliario, unidad y dirección." };
  }
  if (propertyType !== "CASA" && propertyType !== "DEPARTAMENTO") {
    return { error: "Selecciona el tipo de vivienda." };
  }

  const session = await requireSession();

  const roomTemplates = await prisma.roomTemplate.findMany({
    orderBy: { order: "asc" },
    include: { elementTemplates: { orderBy: { order: "asc" } } },
  });
  const applicableRooms = roomTemplates.filter((room) =>
    roomTemplateApplies(room, propertyType, hasTerrace, hasRoofSpace),
  );

  const inspection = await prisma.$transaction(async (tx) => {
    const created = await tx.inspection.create({
      data: {
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
        status: "IN_PROGRESS",
      },
    });

    for (const room of applicableRooms) {
      const roomInstance = await tx.roomInstance.create({
        data: {
          inspectionId: created.id,
          roomTemplateId: room.id,
          name: room.name,
          order: room.order,
        },
      });

      for (const element of room.elementTemplates) {
        await tx.elementInstance.create({
          data: {
            roomInstanceId: roomInstance.id,
            elementTemplateId: element.id,
            name: element.name,
            order: element.order,
            status: "PENDING",
          },
        });
      }
    }

    return created;
  });

  const firstRoom = await prisma.roomInstance.findFirst({
    where: { inspectionId: inspection.id },
    orderBy: { order: "asc" },
  });

  revalidatePath("/");

  if (firstRoom) {
    redirect(`/inspecciones/${inspection.id}/recintos/${firstRoom.id}`);
  }
  redirect("/");
}
