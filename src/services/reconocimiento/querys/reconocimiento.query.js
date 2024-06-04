import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearReconocimientoQuery = async (reconocimiento) =>{
    const result = await prisma.reconocimiento.create({data:{
        nombre: reconocimiento.nombreCambiado,
        fecha: reconocimiento.fecha,
        tipo: reconocimiento.tipoCambiodo,
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
        nombre: reconocimiento.nombreCambiado,
        fecha: reconocimiento.fecha,
        tipo: reconocimiento.tipoCambiodo,
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

const eliminarPornucleoR =async (x)=>{
    const result = prisma.reconocimiento.deleteMany({where:{nucleoID: x}})
    return result
    }

    const filtroQueryR = async(nombre = undefined, fecha = undefined, tipo= undefined)=>{
        console.log(nombre, tipo, fecha, "Query")
        const result = prisma.reconocimiento.findMany({where:{
            nombre: nombre,
            tipo: tipo,
            fecha: fecha }})
        return result
    }

const reconocimientoQuery = {
    filtroQueryR,eliminarPornucleoR,listarReconocimientoQuery,existereconocimiento, eliminarReconocimientoQuery, actualizaReconocimientosQuery, eliminarReconocimientoQuery, crearReconocimientoQuery
}

export default reconocimientoQuery