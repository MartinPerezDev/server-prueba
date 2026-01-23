import { Router } from "express";
import { addCart, addProductIncart, deleteById, deleteProductInCart, getById } from "../controllers/cart.controller.js";

export const cartRouter = Router()

cartRouter.post("/", addCart)
cartRouter.delete("/:id", deleteById)
cartRouter.get("/:id/productos", getById)
cartRouter.post("/:id/productos", addProductIncart)
cartRouter.delete("/:id/productos/:id_prod", deleteProductInCart)