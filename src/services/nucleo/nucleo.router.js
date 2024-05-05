import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarNucleo, crearNucleo, eliminarNucleo, listarNucleo } from "./controllers/nucleo.controllers.js";

const nucleoRouter = Router()

nucleoRouter
.post("/nucleo", [], crearNucleo)
.get("/nucleo", [], listarNucleo)
.delete("/nucleo/:id", [], eliminarNucleo)
.put("/nucleo/:id", [], actualizarNucleo)

export default nucleoRouter