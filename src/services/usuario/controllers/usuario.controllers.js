import { request, response } from "express";
import usuarioQuery from "../query/usuario.query.js"
import bcryptjs from 'bcryptjs'
import { validarCorreo } from '../../../helpers/validarCorreoUCI.js'


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

        const {nombre, correo, apellido} = req.body
        const {numSolapin} = req.params
        const existeSolapin = await usuarioQuery.existeUsuarioQuery(numSolapin)
        if (!existeSolapin) {
            return res.status(400).json({ error: 'El solapin no existe' });
        }

        validarCorreo(correo)

        const existeCorreo = await usuarioQuery.existeUsernameQuery(correo)
        if (existeCorreo) {
            return res.status(400).json({ error: 'El correo ya existe' });
        }
        
        const result = await usuarioQuery.actualizarUsuarioQuery({nombre, correo, apellido}, numSolapin)
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
    
        const {nombre, correo, numSolapin, usuario, apellido} = req.body


        if (correo) {
            const gmail = await validarCorreo(correo)
            console.log(gmail)
            if (!gmail) {
                return res.status(400).json({message:"correo is invalid"})
            }
        }

        const existeSolapin = await usuarioQuery.existeUsuarioQuery(numSolapin)
        if (existeSolapin) {
            return res.status(400).json({ error: 'El solapin no existe' });
        }

        const existeUsuario = await usuarioQuery.existeUsernameQuery(usuario)
        if (existeUsuario) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const existeCorreo = await usuarioQuery.existeUsernameQuery(correo)
        if (existeCorreo) {
            return res.status(400).json({ error: 'El correo ya existe' });
        }
        

        const salt = bcryptjs.genSaltSync()
        const password = bcryptjs.hashSync(req.body.password, salt)

        const result = await usuarioQuery.crearUsuarioQuery({nombre, usuario,correo, password, numSolapin, apellido})
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

/*export const mostrarImagen = async (req = request, res = response)=>{
    try {
        const {numSolapin} = req.params
        const existeSolapin = await usuarioQuery.existeUsuarioQuery(numSolapin)
        if (!existeSolapin) {
            return res.status(400).json({ error: 'El solapin no existe' });
        }

        if (!existeSolapin.foto) {
            return res.status(400).json({ error: 'El usuario no tiene foto' });
        }

        const __filename = fileURLToPath(import.meta.url);
            const directoryPath = path.dirname(__filename);
            const pathImg = path.join(directoryPath, '../../../upload', existeSolapin.foto)
            if (fs.existsSync(pathImg)) {
                return  res.sendFile(pathImg)
            }
    } catch (error) {
        return res.status(500).json(error)
    }
}*/





export const seedUsers = async (req = request, res = response)=>{
    try {
        console.log('%csrc/services/usuarios/controllers/usuarios.controllers.js:19 {}', 'color: #007acc;', {});
        const users = await usuarioQuery.listarUsuarioQuery()
        console.log(users)
        if(users?.length === 0){
            console.log('Seeding', users)

            const salt = bcryptjs.genSaltSync()
            const password = bcryptjs.hashSync('Admin1234', salt)
            
            const result = await usuarioQuery.seedUsersQuery(password)
        }

    } catch (error) {
        console.log('%csrc/services/usuarios/controllers/usuarios.controllers.js:49 error', 'color: #007acc;', error);
    }
}