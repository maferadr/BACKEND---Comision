import { Router } from "express";
import { ProductManager } from "../ProductManager.js";


const productRouter = Router()
const productManager = new ProductManager('./productos.txt')

// app.get('/', (req, res)=>{
//     res.send("Mi primer servidor con Express")
// })


productRouter.get("/", async (req, res)=>{
    try{
        let {limit} = req.query
        const products = await productManager.getProducts()

        const prodLimit = await products.slice(0, limit)
        res.send(JSON.stringify(prodLimit))
    }catch(error){
        res.send(error)
    }
    
})

//Real Time Products
productRouter.get("/realTimeProducts", async (req, res) =>{
    try{
        const products = await productManager.getProducts() 
        res.render('realTimeProducts', {products})
    }catch(error){
        res.send(error)
    }
})


productRouter.get("/:id", async (req, res) =>{
    const idProduct = await productManager.getProductsById(req.params.id) 
    res.render('product', {
        title: idProduct.title,
        description: idProduct.description,
        price: idProduct.price,
        code: idProduct.code,
        stock: idProduct.stock,
    })
})
   
productRouter.post("/", async (req, res)=>{
    const {title, description, price, thumbnail, code, stock, status} = req.body
    await productManager.addProducts({title, description, price, thumbnail, code, stock, status})
    req.io.emit("mensaje", "Hola")
    res.send("Producto Creado")
})

productRouter.put("/:id", async (req, res)=>{
    const id = req.params.id
    const {title, description, price, thumbnail, code, stock, status} = req.body

    const message = await productManager.updateProduct(id, {title, description, price, thumbnail, code, stock, status})
    res.send(message)
})

productRouter.delete("/:id", async (req, res)=>{
    const id = req.params.id
    const message = await productManager.deleteProduct(id)
    res.send(message)
 })

export default productRouter


