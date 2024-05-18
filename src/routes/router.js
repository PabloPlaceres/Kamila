import { Router } from "express";
import usuarioRouter from "../services/usuario/usuario.router.js";
import routerAuth from "../services/auth/autah.router.js";
import nucleoRouter from "../services/nucleo/nucleo.router.js";
import reconocimientoRouter from "../services/reconocimiento/reconocimiento.router.js";
import actividadRouter from "../services/actividades/actividades.router.js";

const router = Router ()
router.use(usuarioRouter)
router.use(routerAuth)
router.use(nucleoRouter)
router.use(reconocimientoRouter)
router.use(actividadRouter)

export default router