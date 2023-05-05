import { Router } from "express";
import { CartManager } from "../CartManager.js";

const carritoRouter = Router()
const cartManager = new CartManager('./carrito.txt')

carritoRouter.get("/:cid", async (req, res)=>{
    try{
       const getCarrito = await cartManager.getCartByID(req.params.cid)
       res.send(JSON.stringify(getCarrito))
    }catch(error){
        res.send(error)
    }
})

carritoRouter.post("/:cid/product/:pid", async (req, res)=>{
    const{id, quantity} = req.body
    if(products => products.id === parseInt(id)){
        await cartManager.incrementarID() //Si el ID existe, se autoincrementa
    }else{
        await cartManager.addProductCart((id, quantity) =>{
            id = 1,
            quantity = 1
        })
    }
   
    res.send("Producto agregado al Carrito")
})

carritoRouter.post("/carts", async (req, res)=>{
    const{id, products} = req.body
    await cartManager.createCarrito((id, products) =>{
        id = 1,
        products = []
    })
    res.send(`El producto con el ID ${req.params.id} se ha creado`)
})

export default carritoRouter