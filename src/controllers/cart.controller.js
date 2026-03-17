import { FileManager } from "../class/fileManager.js";
import * as dotenv from 'dotenv'
import path from "node:path"
import { fileURLToPath } from "node:url"
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cartPath = path.resolve(__dirname, "../data/cart.js")
const fileCart = new FileManager(cartPath)

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
