-- RenameColumn (storageKey never held a real URL — only S3-style demo keys)
ALTER TABLE "photos" RENAME COLUMN "storageKey" TO "url";

-- AlterTable
ALTER TABLE "photos" ADD COLUMN "contentType" TEXT;
