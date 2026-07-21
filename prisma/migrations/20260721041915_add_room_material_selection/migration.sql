-- CreateEnum
CREATE TYPE "FloorMaterial" AS ENUM ('CERAMICA', 'PORCELANATO', 'PISO_FLOTANTE', 'PAVIMENTO_VINILICO', 'ALFOMBRA_CUBREPISO', 'OTRO');

-- CreateEnum
CREATE TYPE "WallCoveringMaterial" AS ENUM ('PINTURA', 'PAPEL_MURAL', 'CERAMICO_PORCELANATO', 'OTRO');

-- CreateEnum
CREATE TYPE "MaterialSlot" AS ENUM ('FLOOR', 'WALL');

-- AlterTable
ALTER TABLE "element_templates" ADD COLUMN     "isMaterialVariant" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "materialSlot" "MaterialSlot";

-- AlterTable
ALTER TABLE "room_instances" ADD COLUMN     "floorMaterial" "FloorMaterial",
ADD COLUMN     "wallCoveringMaterial" "WallCoveringMaterial";
