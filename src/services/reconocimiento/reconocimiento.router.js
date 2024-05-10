import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarReconocimeinto, crearReconocimiento, eliminarReconocimiento, listarReconocimiento } from "./controllers/reconocimiento.controllers.js";
import verifiToken from "../../middleware/verifiToken.js";

const reconocimientoRouter = Router()

reconocimientoRouter
.post("/reconocimiento", [verifiToken], crearReconocimiento)
.get("/reconocimiento", [], listarReconocimiento)
.delete("/reconocimiento/:id", [], eliminarReconocimiento)
.put("/reconocimiento/:id", [], actualizarReconocimeinto)

export default reconocimientoRouter