
export const validarCorreo = async(correo)=> {
    return new Promise( (resolve, reject) =>{

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ((!correo)||(!regexEmail.test(correo))) {return reject({msg: 'correo no valido'}); }
    
    const extensionUciCu = '@uci.cu';
    if (!correo.endsWith(extensionUciCu)) {
        return reject({msg: 'correo no valido'}) 
    }


    return resolve(true)
})
}

