import { error } from "console";
import { request, response } from "express";
import path from "path"

const cargarArchivos = (res = response, req = request)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files ) {
        return res.status(500).json({msg:'No hay archivo a subir '})
    }

    const {archivo} = req.files

    const uploadpath = path.join(__dirname, '../upload', archivo.name)

    console.log(archivo, uploadpath)
    archivo.mv(uploadpath, (error)=>{
        return res.status(500).json({error})
    })
    
    return res.status(200).json({msg : 'Se subio el archivo '})
}

export default cargarArchivos