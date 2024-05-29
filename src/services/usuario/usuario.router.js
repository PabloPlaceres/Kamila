import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarUsuario, 
    crearUsuario, 
    eliminarUsuario, 
    listarUsuario, 
    listarUsuarioRevisado, mostrarImagen, usuarioConfirmado } from "./controllers/usuario.controllers.js";
import validarCorreo from "../../middleware/validarCorreoUCI.js";
import verifiToken from "../../middleware/verifiToken.js";
import verificarTokenAdministrador from "../../middleware/validarTokenAdministrador.js";

const usuarioRouter = Router()

usuarioRouter 
.post("/usuario",[validarCorreo,check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
check('usuario', 'Debe incluir un usuario').not().isEmpty(),
check('numSolapin', 'Debe incluir un numero de solapin').not().isEmpty(),
verifi], crearUsuario)
.get("/noRevisado", [verifiToken, verificarTokenAdministrador], listarUsuarioRevisado)
.delete("/usuario/:numSolapin", [verifiToken, verificarTokenAdministrador], eliminarUsuario)
.put("/usuario/:numSolapin", [verifiToken,verificarTokenAdministrador ,validarCorreo, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
check('usuario', 'Debe incluir un usuario').not().isEmpty(),
check('numSolapin', 'Debe incluir un numero de solapin').not().isEmpty(),
verifi], actualizarUsuario)
.put("/rol/:numSolapin", [verifiToken, verificarTokenAdministrador], usuarioConfirmado)
.get("/usuario", [verifiToken, verificarTokenAdministrador], listarUsuario)
.get("/cargarFoto/:numSolapin", [verifiToken, verificarTokenAdministrador], mostrarImagen)
export default usuarioRouter