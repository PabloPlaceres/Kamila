import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarUsuario, listarUsuarioRevisado, mostrarImagen, usuarioConfirmado } from "./controllers/usuario.controllers.js";
import cargarArchivos from "../../helpers/CargaArchivos.js";
import validarCorreo from "../../middleware/validarCorreoUCI.js";
import verifiToken from "../../middleware/verifiToken.js";

const usuarioRouter = Router()

usuarioRouter 
.post("/usuario",[validarCorreo,check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
check('usuario', 'Debe incluir un usuario').not().isEmpty(),
check('numSolapin', 'Debe incluir un numero de solapin').not().isEmpty(),
verifi], crearUsuario)
.get("/noRevisado", [verifiToken], listarUsuarioRevisado)
.delete("/usuario/:numSolapin", [verifiToken], eliminarUsuario)
.put("/usuario/:numSolapin", [verifiToken ,validarCorreo, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
check('usuario', 'Debe incluir un usuario').not().isEmpty(),
check('numSolapin', 'Debe incluir un numero de solapin').not().isEmpty(),
verifi], actualizarUsuario)
.put("/rol/:numSolapin", [verifiToken], usuarioConfirmado)
.get("/usuario", [verifiToken], listarUsuario)
.get("/cargarFoto/:numSolapin", [verifiToken], mostrarImagen)
export default usuarioRouter