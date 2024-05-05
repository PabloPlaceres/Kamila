import { request, response } from "express";
import reconocimientoQuery from "../querys/reconocimiento.query";


export const crearReconocimiento = async (req = request, res = response)=>{
    try {
        //falta esto es procisional falta trabajar con el toquen 
        const {nombre, fecha, tipo, implicado, costo} = req.body
    
        const result = await reconocimientoQuery.crearReconocimientoQuery({nombre, fecha, tipo, implicado, costo})
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
        const existeReconocimiento = await reconocimientoQuery.existereconocimiento(x)
        if(!existeReconocimiento) {
            return res.status(400).json({ error: 'El reconocimiento no existe' });
        }
        const result = await reconocimientoQuery.actualizaReconocimientosQuery({nombre, fecha, tipo, implicado, costo},x)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}