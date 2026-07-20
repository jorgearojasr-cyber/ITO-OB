import "server-only";

import type { ElementInstanceStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type ElementListItem = {
  id: string;
  name: string;
  status: ElementInstanceStatus;
  roomInstanceId: string;
  roomName: string;
};

export async function getElementsListData(inspectionId: string): Promise<ElementListItem[]> {
  const session = await requireSession();

  const elements = await prisma.elementInstance.findMany({
    where: {
      roomInstance: {
        inspectionId,
        inspection: { organizationId: session.user.organizationId },
      },
    },
    include: { roomInstance: true },
    orderBy: [{ roomInstance: { order: "asc" } }, { order: "asc" }],
  });

  return elements.map((element) => ({
    id: element.id,
    name: element.name,
    status: element.status,
    roomInstanceId: element.roomInstanceId,
    roomName: element.roomInstance.name,
  }));
}
