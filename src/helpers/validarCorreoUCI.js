import { request, response } from "express";

const validarCorreo = async(correo)=> {


    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ((!correo)||(!regexEmail.test(correo))) {return res.status(400).json({msg: 'correo no valido'}); }
    
    const extensionUciCu = '.uci.cu';
    if (!correo.endsWith(extensionUciCu)) {
        return res.status(400).json({msg: 'correo no valido'}) 
    }

    return true
}

export default validarCorreo