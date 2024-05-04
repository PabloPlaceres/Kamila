/*
  Warnings:

  - A unique constraint covering the columns `[nucleoID]` on the table `Actividad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nucleoID]` on the table `Fondo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nucleoID]` on the table `Reconocimiento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nucleoID` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nucleoID` to the `Fondo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nucleoID` to the `Reconocimiento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actividad" ADD COLUMN     "nucleoID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Fondo" ADD COLUMN     "nucleoID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reconocimiento" ADD COLUMN     "nucleoID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Actividad_nucleoID_key" ON "Actividad"("nucleoID");

-- CreateIndex
CREATE UNIQUE INDEX "Fondo_nucleoID_key" ON "Fondo"("nucleoID");

-- CreateIndex
CREATE UNIQUE INDEX "Reconocimiento_nucleoID_key" ON "Reconocimiento"("nucleoID");

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_nucleoID_fkey" FOREIGN KEY ("nucleoID") REFERENCES "Nucleo"("idNucleo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reconocimiento" ADD CONSTRAINT "Reconocimiento_nucleoID_fkey" FOREIGN KEY ("nucleoID") REFERENCES "Nucleo"("idNucleo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fondo" ADD CONSTRAINT "Fondo_nucleoID_fkey" FOREIGN KEY ("nucleoID") REFERENCES "Nucleo"("idNucleo") ON DELETE RESTRICT ON UPDATE CASCADE;
