
import express from 'express';
import productRouter from './routes/products.routes';
import carritoRouter from './routes/carrito.routes';
import { _dirname } from './path';

const app = express()
const PORT = 4000


//Middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Routes
app.use('/product', productRouter)
app.use('/static', express.static(_dirname + '/public'))
app.use('/carrito', carritoRouter)


    // const idProduct = await productManager.getProductsById() // Guardo en una constante los valores solicitados por getProductsById
    // const getIdProduct = await idProduct.find(prod => prod.id === parseInt(req.params.id)) 
    // if(getIdProduct){
    //     res.send(`El producto ${idProduct.nombre} con el ID ${req.params.id} pertenece a la categoria de ${idProduct.categoria}`)
    // }else{
    //     res.send(`El producto con el ID ${req.params.id} no se encuentra`)
    // }
    // console.log(getIdProduct)

app.listen(PORT, ()=>{
    console.log (`Server on Port ${PORT}`)
})


