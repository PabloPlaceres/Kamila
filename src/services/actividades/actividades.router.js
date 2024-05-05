import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarActividad, crearActividad, eliminarActividad, listarActividades } from "./controllers/actividades.controllers.js";


const actividadRouter = Router()

actividadRouter
.post("/actividad", [], crearActividad)
.get("/actividad", [], listarActividades)
.delete("/actividad/:id", [], eliminarActividad)
.put("/actividad/:id", [], actualizarActividad)

export default actividadRouter