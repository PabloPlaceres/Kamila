import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarUsuario, 
    crearUsuario, 
    eliminarUsuario, 
    listarUsuario, 
    listarUsuarioRevisado, mostrarImagen, usuarioConfirmado } from "./controllers/usuario.controllers.js";
import verifiToken from "../../middleware/verifiToken.js";
import verificarTokenAdministrador from "../../middleware/validarTokenAdministrador.js";


import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
}); 
const upload = multer({ storage });


const usuarioRouter = Router()

usuarioRouter 
.post("/usuario",[upload.single('archivo'),check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
check('usuario', 'Debe incluir un usuario').not().isEmpty(),
check('numSolapin', 'Debe incluir un numero de solapin').not().isEmpty(),
verifi], crearUsuario)
.get("/noRevisado", [verifiToken, verificarTokenAdministrador], listarUsuarioRevisado)
.delete("/usuario/:numSolapin", [verifiToken, verificarTokenAdministrador], eliminarUsuario)
.put("/usuario/:numSolapin", [verifiToken,verificarTokenAdministrador, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
check('usuario', 'Debe incluir un usuario').not().isEmpty(),
check('numSolapin', 'Debe incluir un numero de solapin').not().isEmpty(),
verifi], actualizarUsuario)
.put("/rol/:numSolapin", [verifiToken, verificarTokenAdministrador], usuarioConfirmado)
.get("/usuario", [verifiToken, verificarTokenAdministrador], listarUsuario)
.get("/cargarFoto/:numSolapin", [verifiToken, verificarTokenAdministrador], mostrarImagen)
.post('/test-upload', upload.single('archivo'), (req, res) => {
    res.send('Archivo recibido!');
},(err, req, res, next) => {
    console.error(err);
    res.status(500).send('Ocurrió un error al subir el archivo');
});
export default usuarioRouter