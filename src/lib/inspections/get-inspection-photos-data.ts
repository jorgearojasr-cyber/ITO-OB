import "server-only";

import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type InspectionPhotoItem = {
  id: string;
  url: string;
  createdAt: Date;
  roomName: string;
  elementName: string;
  elementInstanceId: string;
};

export async function getInspectionPhotosData(inspectionId: string): Promise<InspectionPhotoItem[]> {
  const session = await requireSession();

  const photos = await prisma.photo.findMany({
    where: {
      observation: {
        elementInstance: {
          roomInstance: {
            inspectionId,
            inspection: { organizationId: session.user.organizationId },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    include: {
      observation: { include: { elementInstance: { include: { roomInstance: true } } } },
    },
  });

  return photos.map((photo) => ({
    id: photo.id,
    url: photo.url,
    createdAt: photo.createdAt,
    roomName: photo.observation.elementInstance.roomInstance.name,
    elementName: photo.observation.elementInstance.name,
    elementInstanceId: photo.observation.elementInstanceId,
  }));
}
