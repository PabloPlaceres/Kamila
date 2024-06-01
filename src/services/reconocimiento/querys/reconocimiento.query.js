import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearReconocimientoQuery = async (reconocimiento) =>{
    const result = await prisma.reconocimiento.create({data:{
        nombre: reconocimiento.nombre,
        fecha: reconocimiento.fecha,
        tipo: reconocimiento.tipo,
        costo: reconocimiento.fondo,
        implicados: reconocimiento.implicados,
        solapin: reconocimiento.numSolapin,
        nucleoID: reconocimiento.idNucleo
    }})
    return result
}

const eliminarReconocimientoQuery = async (x)=>{
    const result = await prisma.reconocimiento.delete({where:{idReconocimiento:x}})
    return result
}

const listarReconocimientoQuery = async ()=>{
    const result = await prisma.reconocimiento.findMany()
    return result
}

const actualizaReconocimientosQuery = async (reconocimiento, x)=>{
    const result = prisma.reconocimiento.update({where:{idReconocimiento: x},data:{
        nombre: reconocimiento.nombre,
        fecha: reconocimiento.fecha,
        tipo: reconocimiento.tipo,
        costo: reconocimiento.fondo,
        implicados: reconocimiento.implicados,
        nucleoID: reconocimiento.nucleoID
    }})
    return result
}

const existereconocimiento = async (x)=>{
    const result = prisma.reconocimiento.findFirst({where:{idReconocimiento:x}})
    return result
}

const reconocimientoQuery = {
    listarReconocimientoQuery,existereconocimiento, eliminarReconocimientoQuery, actualizaReconocimientosQuery, eliminarReconocimientoQuery, crearReconocimientoQuery
}

export default reconocimientoQuery