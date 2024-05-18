import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarUsuario, listarUsuarioRevisado, usuarioConfirmado } from "./controllers/usuario.controllers.js";
import cargarArchivos from "../../helpers/CargaArchivos.js";

const usuarioRouter = Router()

usuarioRouter 
.post("/usuario", [], crearUsuario)
.get("/noRevisado", [], listarUsuarioRevisado)
.delete("/usuario/:numSolapin", [], eliminarUsuario)
.put("/usuario/:numSolapin", [], actualizarUsuario)
.put("/rol/:numSolapin", [], usuarioConfirmado)
.get("/usuario", [], listarUsuario)
.post("/archivo", cargarArchivos)

export default usuarioRouter