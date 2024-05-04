import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearNucleoQuery = async (nucleo) =>{
    const result = await prisma.nucleo.create({data:{nucleo}})
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
    const result = prisma.nucleo.update({where:{idNucleo: id},data:{nucleo}})
    return result
}

const existeNucleo = async (id)=>{
    const result = prisma.nucleo.findFirst({where:{idNucleo:id}})
    return result
}

const nucleoQuery = {
    actualizaNucleoQuery, crearNucleoQuery, eliminarNucleoQuery, existeNucleo, listaNucleoQuery
}

export default nucleoQuery