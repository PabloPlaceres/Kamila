import { request, response } from "express";
import actividadQuery from "../querys/actividades.query.js";
import nucleoQuery from "../../nucleo/querys/nucleo.querys.js";


export const crearActividad = async (req = request, res = response)=>{
    try {
        const {numSolapin} = req.users

        if (!numSolapin) {
            res.status(400).json({msg: 'Se nesecita numero de solapin'})
        }
        const {nombre, lugar, fecha, hora, implicado, costo, nombreNucleo} = req.body

        const nucleo = await nucleoQuery.existeNucleoNombre(nombreNucleo)
        const fondo = parseFloat(costo)
        if (!costo || isNaN(fondo)) {
        return res.status(400).json({ error: 'El costo es requerido y debe ser un número.' });}

        if (!nucleo) {
            return res.status(400).json({ error: 'El nucleo no existe' })
        }

        const {idNucleo} = nucleo
        if (!idNucleo) {return res.status(400).json({error: 'El nucleo no viene' })}
    
        const result = await actividadQuery.crearActividadesQuery({nombre, lugar, fecha, hora, implicado, fondo, numSolapin, idNucleo})
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const listarActividades = async (req= request, res= response)=>{
    try {
        const resutl = await actividadQuery.listarActividadesQuery()
        res.status(200).json({resutl})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const eliminarActividad = async (req = request, res = response)=>{
    try {
        const id  = req.params.id
        const x = parseInt(id )
        const existeActividad = await actividadQuery.existeActividad(x)
        if(!existeActividad) {
            return res.status(400).json({ error: 'La actividad no existe' });
        }
        const result = await actividadQuery.eliminarActividadesoQuery(x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const actualizarActividad = async (req = request, res = response)=>{
    try {
        const {nombre, lugar, fecha, hora, implicado, costo} = req.body

        const id  = req.params.id
        const x = parseInt(id )
        const existeActividad = await actividadQuery.existeActividad(x)
        if(!existeActividad) {
            return res.status(400).json({ error: 'La actividad no existe' });
        }
        const fondo = parseFloat(costo)
        if (!costo || isNaN(fondo)) {
            return res.status(400).json({ error: 'El costo es requerido y debe ser un número.' });}
    
        const result = await actividadQuery.actualizarActividadesQuery({nombre, lugar, fecha, hora, implicado, fondo}, x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


