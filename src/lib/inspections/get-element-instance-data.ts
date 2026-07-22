import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { FLOOR_MATERIAL_LABELS, WALL_MATERIAL_LABELS } from "@/lib/inspections/material-selection";

export type ElementInstanceData = {
  id: string;
  name: string;
  roomInstanceId: string;
  roomName: string;
  materialQuestion: {
    slot: "FLOOR" | "WALL";
    options: { value: string; label: string }[];
  } | null;
  showerTubQuestion: boolean;
  libraryArticle: {
    title: string;
    body: string;
    quickCheckItems: string[];
  } | null;
  checklist: {
    checklistItemTemplateId: string;
    question: string;
    helpText: string | null;
    observation: {
      id: string;
      status: "CORRECT" | "OBSERVATION";
      comment: string | null;
      priority: "ALTA" | "MEDIA" | "BAJA" | null;
      photos: { id: string; url: string }[];
    } | null;
  }[];
};

export async function getElementInstanceData(
  inspectionId: string,
  elementInstanceId: string,
): Promise<ElementInstanceData | null> {
  const session = await requireSession();

  const element = await prisma.elementInstance.findFirst({
    where: {
      id: elementInstanceId,
      roomInstance: {
        inspectionId,
        inspection: { organizationId: session.user.organizationId },
      },
    },
    include: {
      roomInstance: true,
      elementTemplate: {
        include: {
          referenceLibraryArticle: true,
          checklistItemTemplates: { orderBy: { order: "asc" } },
        },
      },
      observations: { include: { photos: { orderBy: { createdAt: "asc" } } } },
    },
  });

  if (!element) {
    return null;
  }

  const observationByChecklistItemId = new Map(
    element.observations.map((observation) => [observation.checklistItemTemplateId, observation]),
  );

  const hasConditionalItems = element.elementTemplate.checklistItemTemplates.some(
    (item) => item.requiresShower || item.requiresBathtub,
  );
  const showerTubAnswered =
    element.roomInstance.hasShower !== null && element.roomInstance.hasBathtub !== null;
  const showerTubQuestion = hasConditionalItems && !showerTubAnswered;

  const visibleChecklistItemTemplates = element.elementTemplate.checklistItemTemplates.filter((item) => {
    if (!item.requiresShower && !item.requiresBathtub) return true;
    if (item.requiresShower && element.roomInstance.hasShower) return true;
    if (item.requiresBathtub && element.roomInstance.hasBathtub) return true;
    return false;
  });

  const checklist = visibleChecklistItemTemplates.map((item) => {
    const observation = observationByChecklistItemId.get(item.id);
    return {
      checklistItemTemplateId: item.id,
      question: item.question,
      helpText: item.helpText,
      observation: observation
        ? {
            id: observation.id,
            status: observation.status,
            comment: observation.comment,
            priority: observation.priority,
            photos: observation.photos.map((photo) => ({ id: photo.id, url: photo.url })),
          }
        : null,
    };
  });

  const slot = element.elementTemplate.materialSlot;
  const answered =
    slot === "FLOOR"
      ? element.roomInstance.floorMaterial !== null
      : slot === "WALL"
        ? element.roomInstance.wallCoveringMaterial !== null
        : true;
  const materialQuestion =
    slot && !answered
      ? {
          slot,
          options:
            slot === "FLOOR"
              ? Object.entries(FLOOR_MATERIAL_LABELS).map(([value, label]) => ({ value, label }))
              : Object.entries(WALL_MATERIAL_LABELS).map(([value, label]) => ({ value, label })),
        }
      : null;

  return {
    id: element.id,
    name: element.name,
    roomInstanceId: element.roomInstanceId,
    roomName: element.roomInstance.name,
    materialQuestion,
    showerTubQuestion,
    libraryArticle: element.elementTemplate.referenceLibraryArticle
      ? {
          title: element.elementTemplate.referenceLibraryArticle.title,
          body: element.elementTemplate.referenceLibraryArticle.body,
          quickCheckItems: element.elementTemplate.referenceLibraryArticle.quickCheckItems,
        }
      : null,
    checklist,
  };
}
