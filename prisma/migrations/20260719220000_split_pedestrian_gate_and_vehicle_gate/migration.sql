-- AlterEnum
BEGIN;
CREATE TYPE "RoomFeatureRequirement_new" AS ENUM ('NINGUNA', 'TERRAZA', 'TECHUMBRE', 'ESCALERA', 'REJA_PEATONAL', 'PORTON_VEHICULAR');
ALTER TABLE "public"."element_templates" ALTER COLUMN "requiredFeature" DROP DEFAULT;
ALTER TABLE "public"."room_templates" ALTER COLUMN "requiredFeature" DROP DEFAULT;
ALTER TABLE "room_templates" ALTER COLUMN "requiredFeature" TYPE "RoomFeatureRequirement_new" USING ("requiredFeature"::text::"RoomFeatureRequirement_new");
ALTER TABLE "element_templates" ALTER COLUMN "requiredFeature" TYPE "RoomFeatureRequirement_new" USING ("requiredFeature"::text::"RoomFeatureRequirement_new");
ALTER TYPE "RoomFeatureRequirement" RENAME TO "RoomFeatureRequirement_old";
ALTER TYPE "RoomFeatureRequirement_new" RENAME TO "RoomFeatureRequirement";
DROP TYPE "public"."RoomFeatureRequirement_old";
ALTER TABLE "element_templates" ALTER COLUMN "requiredFeature" SET DEFAULT 'NINGUNA';
ALTER TABLE "room_templates" ALTER COLUMN "requiredFeature" SET DEFAULT 'NINGUNA';
COMMIT;

-- AlterTable
ALTER TABLE "inspections" DROP COLUMN "hasGate",
ADD COLUMN     "hasPedestrianGate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasVehicleGate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVehicleGateAutomatic" BOOLEAN NOT NULL DEFAULT false;

