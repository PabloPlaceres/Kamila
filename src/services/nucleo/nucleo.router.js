import { Router } from "express";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import { actualizarNucleo, crearNucleo, eliminarNucleo, listarNucleo } from "./controllers/nucleo.controllers.js";
import verifiToken from "../../middleware/verifiToken.js";
import verificarTokenAdministrador from "../../middleware/validarTokenAdministrador.js";

const nucleoRouter = Router()

nucleoRouter
.post("/nucleo", [verifiToken, verificarTokenAdministrador, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('cantMilitante', 'Debe ser un numero decimal ').isDecimal(),
check('cantMilitante', 'Debe incluir cantidad de militante ').not().isEmpty(),
check('fondoSidical', 'Debe ser un numero float ').isFloat(),
check('presupuestoAnual', 'Debe ser un numero float ').isFloat(),
check('presupuestoMensual', 'Debe ser un numero float ').isFloat(),
check('fondoSidical', 'Debe incluir un fondo sidical').not().isEmpty(),
check('presupuestoAnual', 'Debe incluir un presupuesto anual').not().isEmpty(),
check('presupuestoMensual', 'Debe incluir un presupuesto mensual').not().isEmpty(),
verifi], crearNucleo)
.get("/nucleo", [verifiToken, verificarTokenAdministrador], listarNucleo)
.delete("/nucleo/:id", [verifiToken, verificarTokenAdministrador], eliminarNucleo)
.put("/nucleo/:id", [verifiToken, verificarTokenAdministrador, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('cantMilitante', 'Debe ser un numero decimal ').isDecimal(),
check('cantMilitante', 'Debe incluir cantidad de militante ').not().isEmpty(),
check('fondoSindical', 'Debe ser un numero float ').isFloat(),
check('presupuestoAnual', 'Debe ser un numero float ').isFloat(),
check('presupuestoMensual', 'Debe ser un numero float ').isFloat(),
check('fondoSindical', 'Debe incluir un fondo sidical').not().isEmpty(),
check('presupuestoAnual', 'Debe incluir un presupuesto anual').not().isEmpty(),
check('presupuestoMensual', 'Debe incluir un presupuesto mensual').not().isEmpty(),
verifi], actualizarNucleo)

export default nucleoRouter