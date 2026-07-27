-- AlterTable
ALTER TABLE "inspection_invites" ADD CONSTRAINT "inspection_invites_inspectionId_email_key" UNIQUE ("inspectionId", "email");
