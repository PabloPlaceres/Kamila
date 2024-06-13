import { request, response } from "express";
import generateToken from "../../../helpers/jwt.js";
import bcryptjs from "bcryptjs"
import loginQuery from "../query/login.query.js"




export const login = async(req = request, res = response)=>{
    try {
        const {usuario, password} = req.body
        console.log(usuario , password)

        const user = await loginQuery(usuario)
        console.log(user)
        if(!user){return res.status(400).json({msg: 'No se ha econtrado un usuario con esos datos'})}
        
        const verifiPassword = bcryptjs.compareSync(password, user.password)
        if (!verifiPassword) {return res.status(400).json({msg: 'La contrasenna no es correcta'})}
        
        const {numSolapin}= user
        if (numSolapin) {
            const token = generateToken(numSolapin);
        return res.status(200).json({ user, token });
        } else {
            return res.status(400).json({ message: 'User role not recognized' });
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error interno del servidor'
        })
    }
}


