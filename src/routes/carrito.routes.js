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
    const{products, quantity} = req.body
    await cartManager.addProductCart((products, quantity) =>{
        this.products = cid,
        this.quantity = quantity
    })
    res.send("Producto agregado al Carrito")
})

carritoRouter.post("/carts", async (req, res)=>{
    const{id, products} = req.body
    if(products => products.id === parseInt(id)){
        await cartManager.incrementarID() //Si el ID existe, se autoincrementa
    }else{ //Si no, se crea
        await cartManager.createCarrito((id, products) =>{
            this.id = id,
            this.products = products
        })
    }
})

export default carritoRouter