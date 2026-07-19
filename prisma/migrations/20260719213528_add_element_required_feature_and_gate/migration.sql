-- AlterEnum
ALTER TYPE "RoomFeatureRequirement" ADD VALUE 'REJA';

-- AlterTable
ALTER TABLE "element_templates" ADD COLUMN     "requiredFeature" "RoomFeatureRequirement" NOT NULL DEFAULT 'NINGUNA';

-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "hasGate" BOOLEAN NOT NULL DEFAULT false;
