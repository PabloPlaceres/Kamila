import { request, response } from "express";
import reconocimientoQuery from "../querys/reconocimiento.query.js";
import nucleoQuery from "../../nucleo/querys/nucleo.querys.js";



export const crearReconocimiento = async (req = request, res = response)=>{
    try {
        const {nombre, fecha, tipo, implicados, costo, nombreNucleo} = req.body
        const {numSolapin} = req.users

        const nucleo = await nucleoQuery.existeNucleoNombre(nombreNucleo)
        const fondo = parseFloat(costo)
        if (!costo || isNaN(fondo)) {
        return res.status(400).json({ error: 'El costo es requerido y debe ser un número.' });}

        if (!nucleo) {
            return res.status(400).json({ error: 'El nucleo no existe' })
        }

        const {idNucleo} = nucleo
        if (!idNucleo) {return res.status(400).json({error: 'El nucleo no viene' })}
        
        const result = await reconocimientoQuery.crearReconocimientoQuery({nombre, fecha, tipo, implicados, fondo, numSolapin, idNucleo})
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const listarReconocimiento = async (req= request, res= response)=>{
    try {
        const resutl = await reconocimientoQuery.listarReconocimientoQuery()
        res.status(200).json({resutl})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const eliminarReconocimiento = async (req = request, res = response)=>{
    try {
        const id  = req.params.id
        const x = parseInt(id )
        const existeReconocimiento = await reconocimientoQuery.existereconocimiento(x)
        if(!existeReconocimiento) {
            return res.status(400).json({ error: 'El reconocimiento no existe' });
        }
        const result = await reconocimientoQuery.eliminarReconocimientoQuery(x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const actualizarReconocimeinto = async (req = request, res = response)=>{
    try {
        const {nombre, fecha, tipo, implicado, costo} = req.body
        const id  = req.params.id
        const x = parseInt(id )
        const fondo = parseFloat(costo)
        if (!costo || isNaN(fondo)) {
        return res.status(400).json({ error: 'El costo es requerido y debe ser un número.' });}
        const existeReconocimiento = await reconocimientoQuery.existereconocimiento(x)
        if(!existeReconocimiento) {
            return res.status(400).json({ error: 'El reconocimiento no existe' });
        }
        const result = await reconocimientoQuery.actualizaReconocimientosQuery({nombre, fecha, tipo, implicado, fondo},x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}