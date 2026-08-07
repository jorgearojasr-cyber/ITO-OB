import "server-only";

import type { MaterialSlot } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";
import { inspectionAccessWhere } from "@/lib/auth/inspection-access";
import { FLOOR_MATERIAL_LABELS, WALL_MATERIAL_LABELS } from "@/lib/inspections/material-selection";

export type ElementInstanceData = {
  id: string;
  name: string;
  roomInstanceId: string;
  roomName: string;
  materialQuestion: {
    slot: MaterialSlot;
    options: { value: string; label: string }[];
  } | null;
  showerTubQuestion: boolean;
  libraryArticle: {
    title: string;
    body: string;
    quickCheckItems: string[];
  } | null;
  // Slug de LibraryCategory, para resolver ejemplos Bien/Mal cuando la
  // categoría completa comparte un solo ámbito (la mayoría de los
  // casos) -- no forma parte del modelo de datos de la inspección, es
  // puramente de lectura.
  categorySlug: string | null;
  // Slug del propio LibraryArticle -- distingue casos donde una misma
  // categoría (ej. "pinturas") agrupa ámbitos distintos (interior vs.
  // exterior) que no deben mezclarse en los ejemplos Bien/Mal. Ver
  // goodBadExamplesByArticleSlug.
  articleSlug: string | null;
  lacksNormativeBacking: boolean;
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
        inspection: inspectionAccessWhere(session.user.id, session.user.organizationId),
      },
    },
    include: {
      roomInstance: true,
      elementTemplate: {
        include: {
          referenceLibraryArticle: { include: { category: { select: { slug: true } } } },
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
        : slot === "FACADE"
          ? element.roomInstance.facadeFinishOptionId !== null
          : true;

  let materialQuestion: ElementInstanceData["materialQuestion"] = null;
  if (slot && !answered) {
    if (slot === "FLOOR") {
      materialQuestion = { slot, options: Object.entries(FLOOR_MATERIAL_LABELS).map(([value, label]) => ({ value, label })) };
    } else if (slot === "WALL") {
      materialQuestion = { slot, options: Object.entries(WALL_MATERIAL_LABELS).map(([value, label]) => ({ value, label })) };
    } else {
      // FACADE -- a diferencia de FLOOR/WALL (enum + mapa fijo), las
      // opciones salen del catálogo en tabla (Sprint UX-03, "Opción B"):
      // agregar un material nuevo es una fila, no requiere tocar este
      // archivo.
      const facadeFinishOptions = await prisma.facadeFinishOption.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
        select: { slug: true, label: true },
      });
      materialQuestion = {
        slot,
        options: facadeFinishOptions.map((option) => ({ value: option.slug, label: option.label })),
      };
    }
  }

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
    categorySlug: element.elementTemplate.referenceLibraryArticle?.category?.slug ?? null,
    articleSlug: element.elementTemplate.referenceLibraryArticle?.slug ?? null,
    lacksNormativeBacking: element.elementTemplate.lacksNormativeBacking,
    checklist,
  };
}
