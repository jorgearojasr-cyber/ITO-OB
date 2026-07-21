-- AlterTable
ALTER TABLE "library_articles" ADD COLUMN     "quickCheckItems" TEXT[] DEFAULT ARRAY[]::TEXT[];
