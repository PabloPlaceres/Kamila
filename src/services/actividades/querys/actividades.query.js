import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearActividadesQuery = async (actividad) =>{
    const result = await prisma.actividad.create({data:{
        lugar: actividad.lugar,
        fecha: actividad.fecha,
        nombre: actividad.nombre,
        hora: actividad.hora,
        implicado: actividad.implicado,
        solapin: actividad.numSolapin,
        nucleoID: actividad.idNucleo
    }})
    return result
}

const eliminarActividadesoQuery = async (id)=>{
    const result = await prisma.actividad.delete({where:{idActividad:id}})
    return result
}

const listarActividadesQuery = async (nombre)=>{
    const result = await prisma.actividad.findMany()
    return result
}

const actualizarActividadesQuery = async (actividad, id)=>{
    const result = prisma.actividad.update({where:{idActividad: id},data:{
        lugar: actividad.lugar,
        fecha: actividad.fecha,
        nombre: actividad.nombre,
        hora: actividad.hora,
        implicado: actividad.implicado,
    }})
    return result
}

const existeActividad = async (id)=>{
    const result = prisma.actividad.findFirst({where:{idActividad:id}})
    return result
}

const actividadQuery = {
    existeActividad,listarActividadesQuery, eliminarActividadesoQuery, crearActividadesQuery, actualizarActividadesQuery
}

export default actividadQuery