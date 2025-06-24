/*
  Warnings:

  - Added the required column `splitId` to the `GymSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GymSession" ADD COLUMN     "splitId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Split" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Split_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Split_name_key" ON "Split"("name");

-- AddForeignKey
ALTER TABLE "GymSession" ADD CONSTRAINT "GymSession_splitId_fkey" FOREIGN KEY ("splitId") REFERENCES "Split"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
