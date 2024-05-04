import http from "http"
import app from "./src/app.js";

//import { seedUsers } from "./src/services/usuarios/controllers/usuarios.controllers.js";


const server = new http.Server(app);


server.listen(app.get("port"),async()=>{
   // await seedUsers()
    console.log("es ahora")
    console.log(`Server running on port: ${app.get('port')}`)
})