import multer from "multer";
import { request, response } from "express";
import { v4 as uuidv4 } from 'uuid';
import path from "path";

export const verifyPortada = async(req = request, res = response, next)=>{
    let storage =  multer.diskStorage({
        destination: `../upload`,
        filename: (res, file, cb)=>{
            cb(null, uuidv4() + path.extname(file.originalname))
        }
    })
    return storage
}

const storage = verifyPortada()
export default multer({storage})

