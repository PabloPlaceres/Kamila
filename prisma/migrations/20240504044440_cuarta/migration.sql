/*
  Warnings:

  - A unique constraint covering the columns `[usuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "usuario" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Nucleo" (
    "idNucleo" SERIAL NOT NULL,
    "cantMilitante" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Nucleo_pkey" PRIMARY KEY ("idNucleo")
);

-- CreateTable
CREATE TABLE "Fondo" (
    "idFondo" SERIAL NOT NULL,
    "presupuestoMensual" DOUBLE PRECISION NOT NULL,
    "presupuestoAnual" DOUBLE PRECISION NOT NULL,
    "fondoSindical" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fondo_pkey" PRIMARY KEY ("idFondo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nucleo_idNucleo_key" ON "Nucleo"("idNucleo");

-- CreateIndex
CREATE UNIQUE INDEX "Fondo_idFondo_key" ON "Fondo"("idFondo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");
