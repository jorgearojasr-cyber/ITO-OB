import "server-only";

import type { ParkingLocation, PropertyType, StorageLockType } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requireSession } from "@/lib/auth/session";

export type FeatureFlagsData = {
  propertyType: PropertyType;
  hasFrontYard: boolean;
  hasBackYard: boolean;
  hasRoofSpace: boolean;
  hasStairs: boolean;
  hasPedestrianGate: boolean;
  hasVehicleGate: boolean;
  isVehicleGateAutomatic: boolean;
  hasTerrace: boolean;
  hasStorageRoom: boolean;
  storageLockType: StorageLockType | null;
  hasParkingSpace: boolean;
  parkingLocation: ParkingLocation | null;
  parkingIsMarked: boolean | null;
  hasGas: boolean;
  hasClimatizacion: boolean;
  hasPool: boolean;
  hasQuincho: boolean;
  hasPerimeterFence: boolean;
} | null;

export async function getFeatureFlagsData(inspectionId: string): Promise<FeatureFlagsData> {
  const session = await requireSession();

  const inspection = await prisma.inspection.findFirst({
    where: { id: inspectionId, organizationId: session.user.organizationId },
    select: {
      propertyType: true,
      hasFrontYard: true,
      hasBackYard: true,
      hasRoofSpace: true,
      hasStairs: true,
      hasPedestrianGate: true,
      hasVehicleGate: true,
      isVehicleGateAutomatic: true,
      hasTerrace: true,
      hasStorageRoom: true,
      storageLockType: true,
      hasParkingSpace: true,
      parkingLocation: true,
      parkingIsMarked: true,
      hasGas: true,
      hasClimatizacion: true,
      hasPool: true,
      hasQuincho: true,
      hasPerimeterFence: true,
    },
  });

  return inspection;
}
