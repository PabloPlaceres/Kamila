import { request, response } from "express";

const validarCorreo = async(req = request, res = response, next)=> {

    const {correo} = req.users 
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ((!correo)||(!regexEmail.test(correo))) {return res.status(400).json({msg: 'correo no valido'}); }
    
    const extensionUciCu = '.uci.cu';
    if (correo.endsWith(extensionUciCu)) {
        next();
    }

    return res.status(400).json({msg: 'correo no valido'})
}

export default validarCorreo