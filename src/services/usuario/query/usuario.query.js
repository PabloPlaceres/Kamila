import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearUsuarioQuery = async (usuario) =>{
    const result = await prisma.usuario.create({data:{
        nombre: usuario.nombre,
        numSolapin: usuario.numSolapin,
        usuario: usuario.usuario,
        password: usuario.password,
        correo: usuario.correo,
        apellido: usuario.apellido
    }})
    return result
}

const eliminarUsuarioQuery = async (solapin)=>{
    const result = await prisma.usuario.delete({where:{numSolapin:solapin}})
    return result
}



const actualizarUsuarioQuery = async (usuario, solapin)=>{
    const result = await prisma.usuario.update({where:{numSolapin: solapin},data:{
        nombre: usuario.nombre,
        numSolapin: usuario.numSolapin,
        usuario: usuario.usuario,
        password: usuario.password,
        correo: usuario.correo,
        apellido: usuario.apellido
    }})
    return result
}



const listarUsuarioRevisadoQuery = async ()=>{
    const result= await prisma.usuario.findFirst({where:{revisado:false}})
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

const listarUsuarioQuery = async()=>{
    const result = await prisma.usuario.findMany()
    return result
}

const existeUsernameQuery = async (usuario)=>{
    const result = await prisma.usuario.findFirst({where:{usuario:usuario}})
    return result
}

const seedUsersQuery = async (password)=>{
    const result = await prisma.usuario.create({data:{
        nombre : "ADMINISTRADOR",
        apellido: "ADMINISTRADOR",
        numSolapin: "T111111",
        password : password,
        usuario: "ADMINISTRADOR",
        revisado: true,
        rol: "ADMINISTRADOR"

        
    }})
    return result
}

const usuarioQuery = {usuarioConfirmadoQuery, 
    listarUsuarioRevisadoQuery, listarUsuarioQuery,
    crearUsuarioQuery, eliminarUsuarioQuery, actualizarUsuarioQuery, 
existeUsuarioQuery, existeUsernameQuery, seedUsersQuery}


    export default usuarioQuery