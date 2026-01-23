import { FileManager } from "../class/fileManager.js";
import * as dotenv from 'dotenv'
dotenv.config()

const fileCart = new FileManager("./src/data/cart.js")

export const getById = async (req, res)=>{
    try{
        const item = await fileCart.getById(req.params.id)
        if(item) res.send(item.products)
        else throw new Error("Carrito no encontrado")
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addCart = async (req, res)=>{
    try{
        res.send(await fileCart.addCart())
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addProductIncart = async (req, res)=>{
    try{
        res.send(await fileCart.addProductInCart(req.params.id, req.body))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const deleteProductInCart = async (req, res)=>{
    try{
        res.send(await fileCart.deleteProductInCart(req.params.id, req.params.id_prod))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const deleteById = async(req, res)=>{
    try{ 
        res.send(await fileCart.deleteById(req.params.id))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
