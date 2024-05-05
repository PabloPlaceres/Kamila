import { request, response } from "express";
import { validationResult } from "express-validator";


const verifi = (req = request, res = response, next)=>{
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }

    next()
}


export default verifi