import { request, response } from "express";
import fondoQuery from "../querys/fondo.querys.js";
import nucleoQuery from "../../nucleo/querys/nucleo.querys.js";


export const crearFondo = async (req = request, res = response)=>{
    try {
        const { presupuestoMensual, presupuestoAnual, fondoSindical, nombre} = req.body
        
        const nucleo = await nucleoQuery.existeNucleoNombre(nombre)
        
        if (!nucleo) {
            return res.status(400).json({ error: 'El nucleo no existe' })
        }

        const {idNucleo} = nucleo
        if (!idNucleo) {return res.status(400).json({error: 'El nucleo no viene' })}
        
        const result = await fondoQuery.crearFondoQuery({ presupuestoMensual, presupuestoAnual, fondoSindical, idNucleo})
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
        const id  = req.params.id
        const x = parseInt(id )
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
        const { presupuestoMensual, presupuestoAnual, fondoSindical, nucleoID} = req.body
        const id  = req.params.id
        const x = parseInt(id )
        const nucleo = await nucleoQuery.existeNucleo(nucleoID)
        
        if (!nucleo) {
            return res.status(400).json({ error: 'El nucleo no existe' })
        }

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