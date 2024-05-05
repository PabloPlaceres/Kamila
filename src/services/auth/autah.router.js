import { Router } from "express";
import { login } from "./controllers/login.js";


const routerAuth = Router()

routerAuth
.post("/login", login)

export default routerAuth