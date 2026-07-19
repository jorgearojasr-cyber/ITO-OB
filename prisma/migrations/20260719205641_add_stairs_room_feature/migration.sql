-- AlterEnum
ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'ESCALERA';

-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "hasStairs" BOOLEAN NOT NULL DEFAULT false;
