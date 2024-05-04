import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearUsuarioQuery = async (usuario) =>{
    const result = await prisma.usuario.create({data:{usuario}})
    return result
}

const eliminarUsuarioQuery = async (solapin)=>{
    const result = await prisma.usuario.delete({where:{numSolapin:solapin}})
    return result
}

const listarMiembrosQuery = async ()=>{
    const result = await prisma.usuario.findUnique({where:{rol:"MIEMBRO"}})
    return result
}

const actualizarUsuarioQuery = async (usuario, solapin)=>{
    const result = prisma.usuario.update({where:{numSolapin: solapin},data:{usuario}})
    return result
}

const listarPresidenteQuery = async ()=>{
    const result = await prisma.usuario.findUnique({where:{rol:"Presidente"}})
    return result
}

const listarPlanificadorQuery = async ()=>{
    const result = await prisma.usuario.findUnique({where:{rol:"PLANIFICADOR"}})
    return result
}

const listarAdministradorQuery = async ()=>{
    const result = await prisma.usuario.findUnique({where:{rol:"ADMINISTRADOR"}})
    return result
}

const listarUsuarioRevisadoQuery = async ()=>{
    const result= await prisma.usuario.findUnique({where:{revisado:false}})
    return result
}

const usuarioConfirmadoQuery = async (rol = "MIEMBRO", solapin)=>{
    const result = await prisma.usuario.update({where:{numSolapin: solapin},
        data:{
        revisado: true,
        rol: rol
    }})
    return result
}

const existeUsuarioQuery = async(solapin)=>{
    const result = await prisma.usuario.findFirst({where:{numSolapin:solapin}})
    return result
}

const existeUsernameQuery = async (usuario)=>{
    const result = await prisma.usuario.findFirst({where:{usuario:usuario}})
    return result
}

const usuarioQuery = {usuarioConfirmadoQuery, 
    listarAdministradorQuery, 
    listarMiembrosQuery, 
    listarPlanificadorQuery, 
    listarPresidenteQuery, 
    listarUsuarioRevisadoQuery, 
    crearUsuarioQuery, eliminarUsuarioQuery, actualizarUsuarioQuery, 
existeUsuarioQuery, existeUsernameQuery}


    export default usuarioQuery