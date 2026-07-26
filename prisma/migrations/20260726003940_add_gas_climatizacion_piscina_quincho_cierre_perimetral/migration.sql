-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'GAS';
ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'CLIMATIZACION';
ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'PISCINA';
ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'QUINCHO';
ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'CIERRE_PERIMETRAL';

-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "hasClimatizacion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasGas" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPerimeterFence" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPool" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasQuincho" BOOLEAN NOT NULL DEFAULT false;
