import { request, response } from "express";
import generateToken from "../../../helpers/jwt.js";
import bcryptjs from "bcryptjs"
import loginQuery from "../query/login.query.js"




export const login = async(req = request, res = response)=>{
    const {usuario, password} = req.body
    try {
        let user = await loginQuery(usuario)
        if(!user){return res.status(400).json({msg: 'No se ha econtrado un usuario con esos datos'})}
        

        const verifiPassword = bcryptjs.compareSync(password, user.password)
        if (!verifiPassword) {return res.status(400).json({msg: 'La contrasenna no es correcta'})}
        
        const token = generateToken(user.numSolapin);
        return res.status(200).json({ user, token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error interno del servidor'
        })
    }
}


