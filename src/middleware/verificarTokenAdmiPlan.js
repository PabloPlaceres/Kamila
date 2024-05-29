import { request, response } from "express";
import JWT from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const verificarTokenAdmiPlan = async (req= request, res= response, next)=>{
    const token = req.header('x-Token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {numSolapin} = JWT.verify(token, process.env.SECRETORPRIVATEKEY)
        console.log(numSolapin, token)
        const users = await prisma.usuario.findFirst({where: {numSolapin:numSolapin}})
        
        if (!users) {
            return res.status(401).json({msg: 'No existes en db'}) }  


        if (users.rol === 'ADMINISTRADOR'||users.rol === 'PLANIFICADOR') {
                req.users = users 
                return res.status(200).json({msg : "ok"})}
                else{
                    res.status(401).json({
                        msg: 'No tiene acceso'
                })
                }
        
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido PLANIFICADOR'
        })
    }
}


export default verificarTokenAdmiPlan