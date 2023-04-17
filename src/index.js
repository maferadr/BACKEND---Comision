// import http from 'http'

// const PORT = 4000
// const server = http.createServer((request, response) => {
//     response.end("Hola este es mi primer servidor con Node")
// })

// server.listen(PORT, () =>{
//     console.log(`Server on port ${PORT}`)
// })

import express from 'express';
import {ProductManager } from '../Desafio/ProductManager.js';
import { parse } from 'path';

const productManager = new ProductManager('info.txt')

const app = express()
const PORT = 4000

const muebles = [
    {
        id: 1,
        nombre: "Sofa cama",
        categoria: "Habitaciones"
    },
    {
        id: 2,
        nombre: "Mueble Individual",
        categoria: "Studio"
    },
    {
        id: 3,
        nombre: "Muebles Familiares",
        categoria: "Living room"
    }
]


app.use(express.urlencoded({ extended: true}))

app.get('/mueble', (req, res)=>{
    let {nombre, categoria} = req.query
    const furniture = muebles.filter(mueble => mueble.nombre === nombre)
    res.send(JSON.stringify(furniture))
})

app.get('/mueble/:id', (req, res)=>{
    const mueble = muebles.find(sofa => sofa.id === parseInt(req.params.id))
    if(mueble){
        res.send(`El producto ${mueble.nombre} con el ID ${req.params.id} pertenece a la categoria de ${mueble.categoria}`)
    }else{
        res.send(`El producto con el ID ${req.params.id} no se encuentra`)
    }
})

app.get('/', (req, res)=>{
    res.send("Mi primer servidor con Express")
})


app.get('/product', async (req, res)=>{
    let {limit} = req.query
    const products = await productManager.getProducts()
    res.send(JSON.stringify(products))
})

app.listen(PORT, ()=>{
    console.log (`Server on Port ${PORT}`)
})


