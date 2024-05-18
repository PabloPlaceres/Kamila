-- CreateTable
CREATE TABLE "Usuario" (
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT,
    "password" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'MIEMBRO',
    "numSolapin" TEXT NOT NULL,
    "revisado" BOOLEAN NOT NULL DEFAULT false,

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
    "nucleoID" INTEGER NOT NULL,

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
    "nucleoID" INTEGER NOT NULL,

    CONSTRAINT "Reconocimiento_pkey" PRIMARY KEY ("idReconocimiento")
);

-- CreateTable
CREATE TABLE "Nucleo" (
    "idNucleo" SERIAL NOT NULL,
    "cantMilitante" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "presupuestoMensual" DOUBLE PRECISION NOT NULL,
    "presupuestoAnual" DOUBLE PRECISION NOT NULL,
    "fondoSindical" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Nucleo_pkey" PRIMARY KEY ("idNucleo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_numSolapin_key" ON "Usuario"("numSolapin");

-- CreateIndex
CREATE UNIQUE INDEX "Actividad_idActividad_key" ON "Actividad"("idActividad");

-- CreateIndex
CREATE UNIQUE INDEX "Reconocimiento_idReconocimiento_key" ON "Reconocimiento"("idReconocimiento");

-- CreateIndex
CREATE UNIQUE INDEX "Nucleo_idNucleo_key" ON "Nucleo"("idNucleo");

-- CreateIndex
CREATE UNIQUE INDEX "Nucleo_nombre_key" ON "Nucleo"("nombre");

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_solapin_fkey" FOREIGN KEY ("solapin") REFERENCES "Usuario"("numSolapin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_nucleoID_fkey" FOREIGN KEY ("nucleoID") REFERENCES "Nucleo"("idNucleo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reconocimiento" ADD CONSTRAINT "Reconocimiento_solapin_fkey" FOREIGN KEY ("solapin") REFERENCES "Usuario"("numSolapin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reconocimiento" ADD CONSTRAINT "Reconocimiento_nucleoID_fkey" FOREIGN KEY ("nucleoID") REFERENCES "Nucleo"("idNucleo") ON DELETE RESTRICT ON UPDATE CASCADE;
