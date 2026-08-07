-- AlterEnum
ALTER TYPE "MaterialSlot" ADD VALUE 'FACADE';

-- AlterTable
ALTER TABLE "room_instances" ADD COLUMN     "facadeFinishOptionId" TEXT;

-- CreateTable
CREATE TABLE "facade_finish_options" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "familySlug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facade_finish_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "facade_finish_options_slug_key" ON "facade_finish_options"("slug");

-- AddForeignKey
ALTER TABLE "room_instances" ADD CONSTRAINT "room_instances_facadeFinishOptionId_fkey" FOREIGN KEY ("facadeFinishOptionId") REFERENCES "facade_finish_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
