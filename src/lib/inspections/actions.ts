"use server";

import { revalidatePath } from "next/cache";
import type { ObservationStatus, Priority } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

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

type AddDemoPhotoInput = {
  inspectionId: string;
  elementInstanceId: string;
  observationId: string;
};

export async function addDemoPhoto(input: AddDemoPhotoInput): Promise<void> {
  const { inspectionId, elementInstanceId, observationId } = input;

  await prisma.photo.create({
    data: {
      observationId,
      storageKey: `demo/${observationId}-${Date.now()}.jpg`,
    },
  });

  const element = await prisma.elementInstance.findUniqueOrThrow({
    where: { id: elementInstanceId },
    select: { roomInstanceId: true },
  });

  revalidateInspectionPaths(inspectionId, element.roomInstanceId, elementInstanceId);
}
