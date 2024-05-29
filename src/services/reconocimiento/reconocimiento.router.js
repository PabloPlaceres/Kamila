import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarReconocimeinto, crearReconocimiento, eliminarReconocimiento, listarReconocimiento } from "./controllers/reconocimiento.controllers.js";
import verifiToken from "../../middleware/verifiToken.js";
import verificarTokenAdmiPres from "../../middleware/verificarTokenAdmiPres.js";
import verificarTokenAdmiPlan from "../../middleware/verificarTokenAdmiPlan.js";

const reconocimientoRouter = Router()

reconocimientoRouter
.post("/reconocimiento", [verifiToken,verificarTokenAdmiPlan, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('fecha', 'Debe incluir una fecha').not().isEmpty(),
check('tipo', 'Debe incluir un tipo de actividad').not().isEmpty(),
check('costo', 'Debe ser un numero float ').isFloat(),
check('implicado', 'Debe incluir un implicado').not().isEmpty(),
check('costo', 'Debe incluir un costo').not().isEmpty(), verifi()], crearReconocimiento)
.get("/reconocimiento", [verifiToken, verificarTokenAdmiPlan], listarReconocimiento)
.delete("/reconocimiento/:id", [verifiToken, verificarTokenAdmiPlan], eliminarReconocimiento)
.put("/reconocimiento/:id", [verifiToken, verificarTokenAdmiPres, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('fecha', 'Debe incluir una fecha').not().isEmpty(),
check('tipo', 'Debe incluir un tipo de actividad').not().isEmpty(),
check('costo', 'Debe ser un numero float ').isFloat(),
check('implicado', 'Debe incluir un implicado').not().isEmpty(),
check('costo', 'Debe incluir un costo').not().isEmpty(), verifi()], actualizarReconocimeinto)

export default reconocimientoRouter