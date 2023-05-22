import { Router } from "express";
import { ProductManager } from "../ProductManager";

const productManager = new ProductManager("./productos.txt")
const viewsRouter = Router()

//Ruta General
viewsRouter.get("/", async (req, res) =>{
    try{
        const products = await productManager.getProducts()
        res.render("home", {products})
    }catch(error){
        res.render(error)
    }
})

//Real Time Products
viewsRouter.get("/realTimeProducts", async (req, res) =>{
    try{
        const products = await productManager.getProducts() 
        res.render('realTimeProducts', {products})
    }catch(error){
        res.send(error)
    }
})

export default viewsRouter