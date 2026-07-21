-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "bathroomCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "bedroomCount" INTEGER NOT NULL DEFAULT 1;
