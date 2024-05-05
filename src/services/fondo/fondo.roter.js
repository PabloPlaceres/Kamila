import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarFondo, crearFondo, eliminarFondo, listarFondo } from "./controllers/fondo.controllers.js";

const fondoRouter = Router()

fondoRouter
.post("/fondo", [], crearFondo)
.get("/fondo", [], listarFondo)
.delete("/fondo/:id", [], eliminarFondo)
.put("/fondo/:id", [], actualizarFondo)

export default fondoRouter