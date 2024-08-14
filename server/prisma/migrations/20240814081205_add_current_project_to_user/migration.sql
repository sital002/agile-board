-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentProjectId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentProjectId_fkey" FOREIGN KEY ("currentProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
