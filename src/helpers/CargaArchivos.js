import {v4 as uuidv4} from "uuid"
import path from "path"
import { fileURLToPath } from 'url';
import multer from "multer";



const cargarArchivos = async(files)=>{
    
    return new Promise( (resolve, reject) =>{
        const {archivo} = files

        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[ nombreCortado.length - 1]
    
        const extensionesValidas = ['jpg', 'gif', 'png', 'jpeg']
        if (!extensionesValidas.includes(extension)) {
            return reject(`La ${extension} no es valida, las permitidas son ${extensionesValidas}`)
        }
    
        
        const nombreTemporal = uuidv4() + '.' + extension
        const __filename = fileURLToPath(import.meta.url);
        const directoryPath = path.dirname(__filename);
        const uploadpath = path.join(directoryPath, '../upload', nombreTemporal)
    
        archivo.mv(uploadpath, (error)=>{
            return reject(error)
        })
        
        return resolve(uploadpath)
    })
    
}

export default cargarArchivos

