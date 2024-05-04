import { request, response } from "express";
import fondoQuery from "../querys/fondo.querys";


export const crearFondo = async (req = request, res = response)=>{
    try {
        //falta esto es procisional falta trabajar con el toquen 
        const { presupuestoMensual, presupuestoAnual, fondoSindical} = req.body
    
        const result = await fondoQuery.crearFondoQuery({ presupuestoMensual, presupuestoAnual, fondoSindical})
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const listarFondo = async (req= request, res= response)=>{
    try {
        const resutl = await fondoQuery.listaFondoQuery()
        res.status(200).json({resutl})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const eliminarFondo = async (req = request, res = response)=>{
    try {
        const idFondo  = req.params.idFondo 
        const x = parseInt(idFondo )
        const existeFondo = await fondoQuery.existeFondo(x)
        if(!existeFondo) {
            return res.status(400).json({ error: 'El fondo no existe' });
        }
        const result = await fondoQuery.eliminarFondoQuery(x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const actualizarFondo = async (req = request, res = response)=>{
    try {
        const { presupuestoMensual, presupuestoAnual, fondoSindical} = req.body
        const idFondo  = req.params.idFondo 
        const x = parseInt(idFondo )
        const existeFondo = await fondoQuery.existeFondo(x)
        if(!existeFondo) {
            return res.status(400).json({ error: 'El fondo no existe' });
        }
        const result = await fondoQuery.actualizaFondoQuery({ presupuestoMensual, presupuestoAnual, fondoSindical}, x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}