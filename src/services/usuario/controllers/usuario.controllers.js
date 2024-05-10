import { request, response } from "express";
import usuarioQuery from "../query/usuario.query.js"
import bcryptjs from 'bcryptjs'



export const listarUsuario = async (req= request, res= response)=>{
    try {
        const result = await usuarioQuery.listarUsuarioQuery()
        res.status(200).json({result})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const listarUsuarioRevisado = async (req= request, res= response)=>{
    try {
        const resutl = await usuarioQuery.listarUsuarioRevisadoQuery()
        res.status(200).json({resutl})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const eliminarUsuario = async (req = request, res = response)=>{
    try {
        const {numSolapin} = req.params
        const existeSolapin = await usuarioQuery.existeUsuarioQuery(numSolapin)
        if (!existeSolapin) {
            return res.status(400).json({ error: 'El solapin no existe' });
        }
        const result = await usuarioQuery.eliminarUsuarioQuery(numSolapin)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const actualizarUsuario = async (req = request, res = response)=>{
    try {

        const {nombre, correo} = req.body
        const {numSolapin} = req.params
        const existeSolapin = await usuarioQuery.existeUsuarioQuery(numSolapin)
        if (!existeSolapin) {
            return res.status(400).json({ error: 'El solapin no existe' });
        }
        const result = await usuarioQuery.actualizarUsuarioQuery({nombre, correo}, numSolapin)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const usuarioConfirmado = async (req = request, res = response)=>{
    try {
        const {rol} = req.body
        const {numSolapin} = req.params
        const rolesPermitidos = ["ADMINISTRADOR", "PRESIDENTE", "PLANIFICADOR"]
        const existeSolapin = await usuarioQuery.existeUsuarioQuery(numSolapin)
        if (!existeSolapin) {
            return res.status(400).json({ error: 'El solapin no existe' });
        }

        if (!rolesPermitidos.includes(rol)) {
            return res.status(400).json({ error: 'El rol no es valido' });
        }

        const result = await usuarioQuery.usuarioConfirmadoQuery(rol, numSolapin)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


export const crearUsuario = async (req = request, res = response)=>{
    try {

        const {nombre, correo, foto, numSolapin, usuario} = req.body
    
        const existeSolapin = await usuarioQuery.existeUsuarioQuery(numSolapin)
        if (existeSolapin) {
            return res.status(400).json({ error: 'El solapin no existe' });
        }

        const existeUsuario = await usuarioQuery.existeUsernameQuery(usuario)
        if (existeUsuario) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const salt = bcryptjs.genSaltSync()
        const password = bcryptjs.hashSync(req.body.password, salt)

        const result = await usuarioQuery.crearUsuarioQuery({nombre, usuario,correo, password, foto, numSolapin})
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}