-- CreateEnum
CREATE TYPE "ObservationLifecycleStatus" AS ENUM ('PENDIENTE', 'EN_REPARACION', 'RESUELTO', 'VERIFICADO');

-- CreateEnum
CREATE TYPE "PhotoKind" AS ENUM ('EVIDENCIA', 'REPARACION');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('OBSERVATION_LIFECYCLE_CHANGED');

-- AlterTable
ALTER TABLE "observations" ADD COLUMN     "lifecycleStatus" "ObservationLifecycleStatus",
ADD COLUMN     "lifecycleUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "lifecycleUpdatedByUserId" TEXT;

-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "kind" "PhotoKind" NOT NULL DEFAULT 'EVIDENCIA';

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT,
    "createdByUserId" TEXT,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "linkUrl" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_organizationId_createdAt_idx" ON "notifications"("organizationId", "createdAt");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_lifecycleUpdatedByUserId_fkey" FOREIGN KEY ("lifecycleUpdatedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
