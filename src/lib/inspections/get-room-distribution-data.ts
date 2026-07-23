import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type RoomDistributionInstance = {
  id: string;
  name: string;
  elementsTotal: number;
  elementsDone: number;
  photoCount: number;
  observationCount: number;
};

export type RoomDistributionData = {
  bedroomCount: number;
  bathroomCount: number;
  dormitorios: RoomDistributionInstance[];
  banos: RoomDistributionInstance[];
} | null;

export async function getRoomDistributionData(inspectionId: string): Promise<RoomDistributionData> {
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: { bedroomCount: true, bathroomCount: true },
  });
  if (!inspection) {
    return null;
  }

  const rooms = await prisma.roomInstance.findMany({
    where: {
      inspectionId,
      roomTemplate: { slug: { in: ["dormitorios", "banos"] } },
    },
    orderBy: { order: "asc" },
    include: {
      roomTemplate: { select: { slug: true } },
      elements: {
        include: {
          observations: {
            include: { photos: { select: { id: true } } },
          },
        },
      },
    },
  });

  const dormitorios: RoomDistributionInstance[] = [];
  const banos: RoomDistributionInstance[] = [];

  for (const room of rooms) {
    const elementsTotal = room.elements.length;
    const elementsDone = room.elements.filter((element) => element.status !== "PENDING").length;
    const observations = room.elements.flatMap((element) => element.observations);
    const observationCount = observations.filter((observation) => observation.status === "OBSERVATION").length;
    const photoCount = observations.reduce((sum, observation) => sum + observation.photos.length, 0);

    const instance: RoomDistributionInstance = {
      id: room.id,
      name: room.name,
      elementsTotal,
      elementsDone,
      photoCount,
      observationCount,
    };

    if (room.roomTemplate.slug === "dormitorios") {
      dormitorios.push(instance);
    } else if (room.roomTemplate.slug === "banos") {
      banos.push(instance);
    }
  }

  return {
    bedroomCount: inspection.bedroomCount,
    bathroomCount: inspection.bathroomCount,
    dormitorios,
    banos,
  };
}
