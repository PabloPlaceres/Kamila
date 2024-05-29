import { request, response } from "express";
import JWT from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const verificarTokenAdmiPres = async (req= request, res= response, next)=>{
    const token = req.header('x-Token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {numSolapin} = JWT.verify(token, process.env.SECRETORPRIVATEKEY)
        
        const users = await prisma.usuario.findUnique({where: {idAdmi:numSolapin}})
        console.log(numSolapin)
            if (!users.rol === 'ADMINISTRADOR'|| !users.rol === 'PRESIDENTE' || !users.rol === 'PLANIFICADOR') {
                res.status(401).json({
                    msg: 'No tiene acceso'
            })
        }
        
        req.users = users   
        if (!users) {
        return res.status(401).json({msg: 'No existes en db'}) }  
            
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido PRESIDENTE'
        })
    }
}


export default verificarTokenAdmiPres