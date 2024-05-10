import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearReconocimientoQuery = async (reconocimiento) =>{
    const result = await prisma.reconocimiento.create({data:{
        nombre: reconocimiento.nombre,
        fecha: reconocimiento.fecha,
        tipo: reconocimiento.tipo,
        costo: reconocimiento.costo,
        implicados: reconocimiento.implicados,
        solapin: reconocimiento.numSolapin,
        nucleoID: reconocimiento.idNucleo
    }})
    return result
}

const eliminarReconocimientoQuery = async (id)=>{
    const result = await prisma.reconocimiento.delete({where:{idReconocimiento:id}})
    return result
}

const listarReconocimientoQuery = async (nombre)=>{
    const result = await prisma.reconocimiento.findUnique({where:{nombre:nombre}})
    return result
}

const actualizaReconocimientosQuery = async (reconocimiento, id)=>{
    const result = prisma.reconocimiento.update({where:{idReconocimiento: id},data:{
        nombre: reconocimiento.nombre,
        fecha: reconocimiento.fecha,
        tipo: reconocimiento.tipo,
        costo: reconocimiento.costo,
        implicados: reconocimiento.implicados,
        nucleoID: reconocimiento.nucleoID
    }})
    return result
}

const existereconocimiento = async (id)=>{
    const result = prisma.reconocimiento.findFirst({where:{idReconocimiento:id}})
    return result
}

const reconocimientoQuery = {
    listarReconocimientoQuery,existereconocimiento, eliminarReconocimientoQuery, actualizaReconocimientosQuery, eliminarReconocimientoQuery, crearReconocimientoQuery
}

export default reconocimientoQuery