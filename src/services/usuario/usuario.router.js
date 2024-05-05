import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarAdministrador, listarMiembro, listarPlanificador, listarPresidente, listarUsuarioRevisado, usuarioConfirmado } from "./controllers/usuario.controllers.js";

const usuarioRouter = Router()

usuarioRouter 
.post("/usuario", [], crearUsuario)
.get("/norevisado", [], listarUsuarioRevisado)
.delete("/usuario/:numSolapin", [], eliminarUsuario)
.put("/usuario/:numSolapin", [], actualizarUsuario)
.put("/rol/:numSolapin", [], usuarioConfirmado)
.get("/presidente", [], listarPresidente)
.get("/planificador", [], listarPlanificador)
.get("/administrador", [], listarAdministrador)
.get("/miembro", [], listarMiembro)

export default usuarioRouter