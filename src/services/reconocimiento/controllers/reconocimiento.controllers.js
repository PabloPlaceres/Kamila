import { request, response } from "express";
import reconocimientoQuery from "../querys/reconocimiento.query.js";
import nucleoQuery from "../../nucleo/querys/nucleo.querys.js";



export const crearReconocimiento = async (req = request, res = response)=>{
    try {
        const {nombre, fecha, tipo, implicados, costo, nombreNucleo} = req.body
        const {numSolapin} = req.users

        const y = toString(tipo)
        const x = toString(nombre)
        const nombreCambiado = x.toLowerCase().replace(/\s+/g, '')
        const tipoCambiado = y.toLowerCase().replace(/\s+/g, '')


        const nucleo = await nucleoQuery.existeNucleoNombre(nombreNucleo)
        const fondo = parseFloat(costo)
        if (!costo || isNaN(fondo)) {
        return res.status(400).json({ error: 'El costo es requerido y debe ser un número.' });}

        if (!nucleo) {
            return res.status(400).json({ error: 'El nucleo no existe' })
        }

        const {idNucleo} = nucleo
        if (!idNucleo) {return res.status(400).json({error: 'El nucleo no viene' })}
        
        const result = await reconocimientoQuery.crearReconocimientoQuery({nombreCambiado, fecha, tipoCambiado, implicados, fondo, numSolapin, idNucleo})
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
        const y = toString(tipo)
        const z = toString(nombre)
        const nombreCambiado = z.toLowerCase().replace(/\s+/g, '')
        const tipoCambiado = y.toLowerCase().replace(/\s+/g, '')
        const id  = req.params.id
        const x = parseInt(id )
        const fondo = parseFloat(costo)
        if (!costo || isNaN(fondo)) {
        return res.status(400).json({ error: 'El costo es requerido y debe ser un número.' });}
        const existeReconocimiento = await reconocimientoQuery.existereconocimiento(x)
        if(!existeReconocimiento) {
            return res.status(400).json({ error: 'El reconocimiento no existe' });
        }
        const result = await reconocimientoQuery.actualizaReconocimientosQuery({nombreCambiado, fecha, tipoCambiado, implicado, fondo},x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const filtroR = async (req = request, res = response)=>{
    try {
        const {nombre, tipo, fecha} = req.params
        const y = toString(tipo)
        const x = toString(nombre)
        const nombreCambiado = x.toLowerCase().replace(/\s+/g, '')
        const tipoCambiado = y.toLowerCase().replace(/\s+/g, '')

        console.log(nombre, tipo, fecha)

        const result = reconocimientoQuery.filtroQueryR(nombreCambiado, fecha, tipoCambiado)
        if (result.length === 0) {
            return res.status(200).json({msg: "No hay nada con esas caracteristicas"})
        }
        return res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}