import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearFondoQuery = async (fondo) =>{
    const result = await prisma.fondo.create({data:{
        presupuestoAnual: fondo.presupuestoAnual,
        presupuestoMensual: fondo.presupuestoMensual,
        fondoSindical: fondo.fondoSindical,
        nucleoID: fondo.idNucleo
    }})
    return result
}

const eliminarFondoQuery = async (id)=>{
    const result = await prisma.fondo.delete({where:{idFondo:id}})
    return result
}

const listaFondoQuery = async ()=>{
    const result = await prisma.fondo.findMany()
    return result
}

const actualizaFondoQuery = async (fondo, id)=>{
    const result = prisma.fondo.update({where:{idFondo: id},data:{
        presupuestoAnual: fondo.presupuestoAnual,
        presupuestoMensual: fondo.presupuestoMensual,
        fondoSindical: fondo.fondoSindical,}})
    return result
}

const existeFondo = async (id)=>{
    const result = prisma.fondo.findFirst({where:{idFondo:id}})
    return result
}


const fondoQuery = {
    actualizaFondoQuery, eliminarFondoQuery, existeFondo, crearFondoQuery, listaFondoQuery
}

export default fondoQuery