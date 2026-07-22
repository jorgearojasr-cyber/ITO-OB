-- AlterTable
ALTER TABLE "checklist_item_templates" ADD COLUMN     "requiresBathtub" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresShower" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "room_instances" ADD COLUMN     "hasBathtub" BOOLEAN,
ADD COLUMN     "hasShower" BOOLEAN;
