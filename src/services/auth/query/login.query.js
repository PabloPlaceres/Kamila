import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const loginQuery = async (usuario)=>{
    const result = await prisma.usuario.findUnique({where:{usuario:usuario}})
    return result
}


export default loginQuery