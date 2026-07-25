/*
  Warnings:

  - Added the required column `generatedByUserId` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signatureBuilderUrl` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signatureOwnerUrl` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signedAt` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "generatedByUserId" TEXT NOT NULL,
ADD COLUMN     "signatureBuilderUrl" TEXT NOT NULL,
ADD COLUMN     "signatureOwnerUrl" TEXT NOT NULL,
ADD COLUMN     "signedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "ReportStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_generatedByUserId_fkey" FOREIGN KEY ("generatedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
