/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `equipmentId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleGroupId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_sessionId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "sessionId",
ADD COLUMN     "equipmentId" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "muscleGroupId" INTEGER NOT NULL,
ADD COLUMN     "pbWeight" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToGymSession" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExerciseToGymSession_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MuscleGroupToSplit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MuscleGroupToSplit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroup_name_key" ON "MuscleGroup"("name");

-- CreateIndex
CREATE INDEX "_ExerciseToGymSession_B_index" ON "_ExerciseToGymSession"("B");

-- CreateIndex
CREATE INDEX "_MuscleGroupToSplit_B_index" ON "_MuscleGroupToSplit"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToGymSession" ADD CONSTRAINT "_ExerciseToGymSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToGymSession" ADD CONSTRAINT "_ExerciseToGymSession_B_fkey" FOREIGN KEY ("B") REFERENCES "GymSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MuscleGroupToSplit" ADD CONSTRAINT "_MuscleGroupToSplit_A_fkey" FOREIGN KEY ("A") REFERENCES "MuscleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MuscleGroupToSplit" ADD CONSTRAINT "_MuscleGroupToSplit_B_fkey" FOREIGN KEY ("B") REFERENCES "Split"("id") ON DELETE CASCADE ON UPDATE CASCADE;
