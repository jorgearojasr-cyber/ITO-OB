-- DropIndex
DROP INDEX "observations_elementInstanceId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "observations_elementInstanceId_checklistItemTemplateId_key" ON "observations"("elementInstanceId", "checklistItemTemplateId");
