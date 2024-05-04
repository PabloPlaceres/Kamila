import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearActividadesQuery = async (actividad) =>{
    const result = await prisma.actividad.create({data:{actividad}})
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
    const result = prisma.actividad.update({where:{idActividad: id},data:{actividad}})
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