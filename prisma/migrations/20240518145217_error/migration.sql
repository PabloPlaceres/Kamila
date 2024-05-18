/*
  Warnings:

  - You are about to drop the `Actividad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fondo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nucleo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reconocimiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_nucleoID_fkey";

-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_solapin_fkey";

-- DropForeignKey
ALTER TABLE "Fondo" DROP CONSTRAINT "Fondo_nucleoID_fkey";

-- DropForeignKey
ALTER TABLE "Reconocimiento" DROP CONSTRAINT "Reconocimiento_nucleoID_fkey";

-- DropForeignKey
ALTER TABLE "Reconocimiento" DROP CONSTRAINT "Reconocimiento_solapin_fkey";

-- DropTable
DROP TABLE "Actividad";

-- DropTable
DROP TABLE "Fondo";

-- DropTable
DROP TABLE "Nucleo";

-- DropTable
DROP TABLE "Reconocimiento";

-- DropTable
DROP TABLE "Usuario";
