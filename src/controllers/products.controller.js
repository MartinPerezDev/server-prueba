import { FileManager } from "../class/fileManager.js"
import * as dotenv from 'dotenv'
dotenv.config()

const admin = process.env.ADMIN
const fileProducts = new FileManager("./src/data/products.js")

export const get = async (req, res)=>{
    try{
        res.send(await fileProducts.get())
    }
    catch(error){
        res.status(400).json({error: "Archivo corrupto", ruta: req.originalUrl, metodo: req.method})
    }
}

export const getById = async (req, res)=>{
    try{
        const product = fileProducts.getById(req.params.id)
        if(product) res.send( await product)
        else throw new Error("Producto no encontrado")
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const add = async (req, res)=>{
    try{
        if(admin === "true"){
            await fileProducts.addProduct(req.body)
            res.send(await fileProducts.get())
        }else{
            res.status(401).json({error: "Unauthorized", ruta: req.originalUrl, metodo: req.method})
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const set = async (req, res)=>{
    try{
        if(admin === "true"){
            const products = await fileProducts.set(req.body, req.params.id)
            res.send(products)
        }else{
            res.status(401).json({error: "Unauthorized", ruta: req.originalUrl, metodo: req.method})
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const deleteById = async(req, res)=>{
    try{
        if(admin === "true"){
            const products = await fileProducts.deleteById(req.params.id)
            res.send(products)
        }else{
            res.status(401).json({error: "Unauthorized", ruta: req.originalUrl, metodo: req.method})
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
