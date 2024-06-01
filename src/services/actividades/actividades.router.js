import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarActividad, crearActividad, eliminarActividad, filtro, listarActividades } from "./controllers/actividades.controllers.js";
import verifiToken from "../../middleware/verifiToken.js";
import verificarTokenAdmiPlan from "../../middleware/verificarTokenAdmiPlan.js";
import verificarTokenAdmiPres from "../../middleware/verificarTokenAdmiPres.js";


const actividadRouter = Router()

actividadRouter
.post("/actividad", [verifiToken,verificarTokenAdmiPlan, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('fecha', 'Debe incluir una fecha').not().isEmpty(),
check('lugar', 'Debe incluir un lugar').not().isEmpty(),
check('hora', 'Debe incluir una hora').not().isEmpty(),
check('implicado', 'Debe incluir un implicado').not().isEmpty(),
check('costo', 'Debe incluir un costo').not().isEmpty(), verifi
], crearActividad)
.get("/actividad", [verifiToken, verificarTokenAdmiPlan], listarActividades)
.delete("/actividad/:id", [verifiToken, verificarTokenAdmiPlan], eliminarActividad)
.put("/actividad/:id", [verifiToken,verificarTokenAdmiPres, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('fecha', 'Debe incluir una fecha').not().isEmpty(),
check('lugar', 'Debe incluir un lugar').not().isEmpty(),
check('hora', 'Debe incluir una hora').not().isEmpty(),
check('implicado', 'Debe incluir un implicado').not().isEmpty(),
check('costo', 'Debe incluir un costo').not().isEmpty(), verifi], actualizarActividad)
.get("/actividad/filtro", filtro)

export default actividadRouter