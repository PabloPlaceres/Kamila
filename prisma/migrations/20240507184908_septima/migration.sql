/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Nucleo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "correo" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Nucleo_nombre_key" ON "Nucleo"("nombre");
