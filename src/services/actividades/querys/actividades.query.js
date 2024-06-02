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
        nucleoID: actividad.idNucleo,
        costo: actividad.fondo
    }})
    return result
}

const eliminarActividadesoQuery = async (id)=>{
    const result = await prisma.actividad.delete({where:{idActividad:id}})
    return result
}

const listarActividadesQuery = async ()=>{
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
        costo: actividad.fondo
    }})
    return result
}

const existeActividad = async (id)=>{
    const result = prisma.actividad.findFirst({where:{idActividad:id}})
    return result
}

const eliminarPornucleo =async (x)=>{
    const result = prisma.actividad.deleteMany({where:{nucleoID: x}})
    return result
    }

const filtroQuery = async(nombre = undefined, fecha = undefined, lugar= undefined)=>{
    const result = prisma.actividad.findMany({where:{
        nombre: nombre,
        lugar: lugar,
        fecha: fecha }})
    return result
}
const actividadQuery = {
    eliminarPornucleo,filtroQuery,existeActividad,listarActividadesQuery, eliminarActividadesoQuery, crearActividadesQuery, actualizarActividadesQuery
}

export default actividadQuery