import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearNucleoQuery = async (nucleo) =>{
    const result = await prisma.nucleo.create({data:{
        nombre: nucleo.nombre,
        cantMilitante: nucleo.cantMilitante
    }})
    return result
}

const eliminarNucleoQuery = async (id)=>{
    const result = await prisma.nucleo.delete({where:{idNucleo:id}})
    return result
}

const listaNucleoQuery = async ()=>{
    const result = await prisma.nucleo.findMany()
    return result
}

const actualizaNucleoQuery = async (nucleo, id)=>{
    const result = prisma.nucleo.update({where:{idNucleo: id},data:{
        nombre: nucleo.nombre,
        cantMilitante: nucleo.cantMilitante,
        
    }})
    return result
}

const existeNucleo = async (id)=>{
    const result = prisma.nucleo.findFirst({where:{idNucleo:id}})
    return result
}

const existeNucleoNombre = async (nombre)=>{
    const result = prisma.nucleo.findFirst({where:{nombre:nombre}})
    return result
}

const nucleoQuery = {
    actualizaNucleoQuery, crearNucleoQuery, eliminarNucleoQuery, existeNucleo, listaNucleoQuery, existeNucleoNombre
}

export default nucleoQuery