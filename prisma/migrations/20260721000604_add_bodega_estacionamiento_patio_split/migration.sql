-- CreateEnum
CREATE TYPE "StorageLockType" AS ENUM ('CANDADO', 'LLAVE', 'OTRO');

-- CreateEnum
CREATE TYPE "ParkingLocation" AS ENUM ('SUBTERRANEO', 'SUPERFICIE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'BODEGA';
ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'ESTACIONAMIENTO';

-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "hasBackYard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFrontYard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasParkingSpace" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasStorageRoom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parkingIsMarked" BOOLEAN,
ADD COLUMN     "parkingLocation" "ParkingLocation",
ADD COLUMN     "storageLockType" "StorageLockType";
