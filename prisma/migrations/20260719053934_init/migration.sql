-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('PARTICULAR', 'INMOBILIARIA', 'CONSTRUCTORA');

-- CreateEnum
CREATE TYPE "OrganizationPlan" AS ENUM ('GRATUITO', 'PROPIETARIO', 'PROFESIONAL', 'ORGANIZACION');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PROPIETARIO', 'COLABORADOR', 'ADMIN_ORGANIZACION', 'EDITOR_CONTENIDO', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('CASA', 'DEPARTAMENTO');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ElementInstanceStatus" AS ENUM ('PENDING', 'CORRECT', 'OBSERVED');

-- CreateEnum
CREATE TYPE "ObservationStatus" AS ENUM ('CORRECT', 'OBSERVATION');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('ALTA', 'MEDIA', 'BAJA');

-- CreateEnum
CREATE TYPE "RoomFeatureRequirement" AS ENUM ('NINGUNA', 'TERRAZA', 'TECHUMBRE');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "plan" "OrganizationPlan" NOT NULL DEFAULT 'GRATUITO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PROPIETARIO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "unitLabel" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "developerName" TEXT,
    "builderName" TEXT,
    "propertyType" "PropertyType" NOT NULL,
    "hasTerrace" BOOLEAN NOT NULL DEFAULT false,
    "hasRoofSpace" BOOLEAN NOT NULL DEFAULT false,
    "receptionDate" TIMESTAMP(3),
    "status" "InspectionStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_collaborators" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspection_collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "requiredFeature" "RoomFeatureRequirement" NOT NULL DEFAULT 'NINGUNA',
    "appliesToCasa" BOOLEAN NOT NULL DEFAULT true,
    "appliesToDepto" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "element_templates" (
    "id" TEXT NOT NULL,
    "roomTemplateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "referenceLibraryArticleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "element_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklist_item_templates" (
    "id" TEXT NOT NULL,
    "elementTemplateId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "helpText" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklist_item_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_instances" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "roomTemplateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "element_instances" (
    "id" TEXT NOT NULL,
    "roomInstanceId" TEXT NOT NULL,
    "elementTemplateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "ElementInstanceStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "element_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observations" (
    "id" TEXT NOT NULL,
    "elementInstanceId" TEXT NOT NULL,
    "checklistItemTemplateId" TEXT NOT NULL,
    "status" "ObservationStatus" NOT NULL,
    "comment" TEXT,
    "priority" "Priority",
    "aiMetadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "observations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "observationId" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "aiMetadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "library_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library_articles" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "library_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "pdfStorageKey" TEXT,
    "snapshot" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "inspections_organizationId_idx" ON "inspections"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "inspection_collaborators_inspectionId_userId_key" ON "inspection_collaborators"("inspectionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "room_templates_slug_key" ON "room_templates"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "element_templates_roomTemplateId_slug_key" ON "element_templates"("roomTemplateId", "slug");

-- CreateIndex
CREATE INDEX "room_instances_inspectionId_idx" ON "room_instances"("inspectionId");

-- CreateIndex
CREATE INDEX "element_instances_roomInstanceId_idx" ON "element_instances"("roomInstanceId");

-- CreateIndex
CREATE INDEX "observations_elementInstanceId_idx" ON "observations"("elementInstanceId");

-- CreateIndex
CREATE INDEX "photos_observationId_idx" ON "photos"("observationId");

-- CreateIndex
CREATE UNIQUE INDEX "library_categories_slug_key" ON "library_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "library_articles_categoryId_slug_key" ON "library_articles"("categoryId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "reports_inspectionId_key" ON "reports"("inspectionId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_collaborators" ADD CONSTRAINT "inspection_collaborators_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "inspections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_collaborators" ADD CONSTRAINT "inspection_collaborators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_templates" ADD CONSTRAINT "element_templates_roomTemplateId_fkey" FOREIGN KEY ("roomTemplateId") REFERENCES "room_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_templates" ADD CONSTRAINT "element_templates_referenceLibraryArticleId_fkey" FOREIGN KEY ("referenceLibraryArticleId") REFERENCES "library_articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_item_templates" ADD CONSTRAINT "checklist_item_templates_elementTemplateId_fkey" FOREIGN KEY ("elementTemplateId") REFERENCES "element_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_instances" ADD CONSTRAINT "room_instances_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "inspections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_instances" ADD CONSTRAINT "room_instances_roomTemplateId_fkey" FOREIGN KEY ("roomTemplateId") REFERENCES "room_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_instances" ADD CONSTRAINT "element_instances_roomInstanceId_fkey" FOREIGN KEY ("roomInstanceId") REFERENCES "room_instances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_instances" ADD CONSTRAINT "element_instances_elementTemplateId_fkey" FOREIGN KEY ("elementTemplateId") REFERENCES "element_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_elementInstanceId_fkey" FOREIGN KEY ("elementInstanceId") REFERENCES "element_instances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_checklistItemTemplateId_fkey" FOREIGN KEY ("checklistItemTemplateId") REFERENCES "checklist_item_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "observations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_articles" ADD CONSTRAINT "library_articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "library_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "inspections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
