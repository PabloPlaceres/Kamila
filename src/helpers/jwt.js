import JWT from "jsonwebtoken";


const generateToken = (id, rol)=>{
const payload = {id, rol}
return  JWT.sign(payload, process.env.SECRETORPRIVATEKEY, {expiresIn: '1h'})
}

export default generateToken