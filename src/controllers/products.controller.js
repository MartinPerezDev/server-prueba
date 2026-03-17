import { FileManager } from "../class/fileManager.js"
import * as dotenv from 'dotenv'
import path from "node:path"
import { fileURLToPath } from "node:url"
dotenv.config()

const admin = process.env.ADMIN
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const productsPath = path.resolve(__dirname, "../data/products.json")
const fileProducts = new FileManager(productsPath)

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
            console.log(req.body)
            console.log(req.params.id)
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
