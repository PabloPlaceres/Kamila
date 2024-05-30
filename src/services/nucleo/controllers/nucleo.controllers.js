import { request, response } from "express";
import nucleoQuery from "../querys/nucleo.querys.js";

export const crearNucleo = async (req = request, res = response)=>{
    try {
        const { cantMilitante, nombre, presupuestoMensual, presupuestoAnual, fondoSindical} = req.body
    
        const anual = parseFloat(presupuestoAnual)
        const mensual = parseFloat(presupuestoMensual)
        const fondo = parseFloat(fondoSindical)
        if (!presupuestoAnual || isNaN(anual)) {
        return res.status(400).json({ error: 'El presupuesto anual es requerido y debe ser un número.' });}

        if (!presupuestoMensual || isNaN(mensual)) {
            return res.status(400).json({ error: 'El presupuesto mensual es requerido y debe ser un número.' });}

            console.log(fondo, fondoSindical)
        if (!fondoSindical || isNaN(fondo)) {
            return res.status(400).json({ error: 'El fondo sindical es requerido y debe ser un número.' });}

        const result = await nucleoQuery.crearNucleoQuery({ cantMilitante, nombre, presupuestoMensual, presupuestoAnual, fondoSindical})
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const listarNucleo = async (req= request, res= response)=>{
    try {
        const resutl = await nucleoQuery.listaNucleoQuery()
        res.status(200).json({resutl})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const eliminarNucleo = async (req = request, res = response)=>{
    try {
        const id  = req.params.id
        const x = parseInt(id )
        const existeNucleo = await nucleoQuery.existeNucleo(x)
        if(!existeNucleo) {
            return res.status(400).json({ error: 'El nucleo no existe' });
        }
        const result = await nucleoQuery.eliminarNucleoQuery(x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const actualizarNucleo = async (req = request, res = response)=>{
    try {
        const { cantMilitante, nombre, presupuestoMensual, presupuestoAnual, fondoSindical} = req.body
        const id  = req.params.id
        const x = parseInt(id )
        const existeNucleo = await nucleoQuery.existeNucleo(x)
        if(!existeNucleo) {
            return res.status(400).json({ error: 'El nucleo no existe' });
        }

        const anual = parseFloat(presupuestoAnual)
        const mensual = parseFloat(presupuestoMensual)
        const fondo = parseFloat(fondoSindical)
        if (!presupuestoAnual || isNaN(anual)) {
        return res.status(400).json({ error: 'El presupuesto anual es requerido y debe ser un número.' });}

        if (!presupuestoMensual || isNaN(mensual)) {
            return res.status(400).json({ error: 'El presupuesto mensual es requerido y debe ser un número.' });}

        if (!fondoSindical || isNaN(fondo)) {
            return res.status(400).json({ error: 'El fondo sindical es requerido y debe ser un número.' });}

        const result = await nucleoQuery.actualizaNucleoQuery({ cantMilitante, nombre, presupuestoMensual, presupuestoAnual, fondoSindical}, x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}