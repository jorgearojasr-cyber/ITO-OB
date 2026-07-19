import "server-only";

import { prisma } from "@/lib/db/prisma";

export type ElementInstanceData = {
  id: string;
  name: string;
  roomInstanceId: string;
  roomName: string;
  libraryArticle: {
    title: string;
    summary: string;
    body: string;
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
      photoCount: number;
    } | null;
  }[];
};

export async function getElementInstanceData(
  inspectionId: string,
  elementInstanceId: string,
): Promise<ElementInstanceData | null> {
  const element = await prisma.elementInstance.findUnique({
    where: { id: elementInstanceId },
    include: {
      roomInstance: true,
      elementTemplate: {
        include: {
          referenceLibraryArticle: true,
          checklistItemTemplates: { orderBy: { order: "asc" } },
        },
      },
      observations: { include: { _count: { select: { photos: true } } } },
    },
  });

  if (!element || element.roomInstance.inspectionId !== inspectionId) {
    return null;
  }

  const observationByChecklistItemId = new Map(
    element.observations.map((observation) => [observation.checklistItemTemplateId, observation]),
  );

  const checklist = element.elementTemplate.checklistItemTemplates.map((item) => {
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
            photoCount: observation._count.photos,
          }
        : null,
    };
  });

  return {
    id: element.id,
    name: element.name,
    roomInstanceId: element.roomInstanceId,
    roomName: element.roomInstance.name,
    libraryArticle: element.elementTemplate.referenceLibraryArticle
      ? {
          title: element.elementTemplate.referenceLibraryArticle.title,
          summary: element.elementTemplate.referenceLibraryArticle.summary,
          body: element.elementTemplate.referenceLibraryArticle.body,
        }
      : null,
    checklist,
  };
}
