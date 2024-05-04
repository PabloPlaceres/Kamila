-- CreateTable
CREATE TABLE "Usuario" (
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'MIEMBRO',
    "numSolapin" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("numSolapin")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "idActividad" SERIAL NOT NULL,
    "lugar" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "implicado" TEXT NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "solapin" TEXT NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("idActividad")
);

-- CreateTable
CREATE TABLE "Reconocimiento" (
    "idReconocimiento" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "implicados" TEXT NOT NULL,
    "solapin" TEXT NOT NULL,

    CONSTRAINT "Reconocimiento_pkey" PRIMARY KEY ("idReconocimiento")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_numSolapin_key" ON "Usuario"("numSolapin");

-- CreateIndex
CREATE UNIQUE INDEX "Actividad_idActividad_key" ON "Actividad"("idActividad");

-- CreateIndex
CREATE UNIQUE INDEX "Reconocimiento_idReconocimiento_key" ON "Reconocimiento"("idReconocimiento");

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_solapin_fkey" FOREIGN KEY ("solapin") REFERENCES "Usuario"("numSolapin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reconocimiento" ADD CONSTRAINT "Reconocimiento_solapin_fkey" FOREIGN KEY ("solapin") REFERENCES "Usuario"("numSolapin") ON DELETE RESTRICT ON UPDATE CASCADE;
