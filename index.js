import http from "http"
import app from "./src/app.js";
import { seedUsers } from "./src/services/usuario/controllers/usuario.controllers.js";




const server = new http.Server(app);


server.listen(app.get("port"),async()=>{
    await seedUsers()
    console.log("es ahora")
    console.log(`Server running on port: ${app.get('port')}`)
})