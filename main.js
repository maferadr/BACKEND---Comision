//E-commerce que arrojara productos de muebleria y bienes de Hogar

import {promises as fs} from 'fs'

const RUTA_ARCHIVO = './info.txt'
const productos = []
const producto1 = {title: "Home Decor"}


const promisesTXT = async (ruta) =>{
    try{
        await fs.writeFile(ruta, JSON.stringify(productos))
        const contenido = await fs.readFile(ruta, 'utf-8')

        const aux = JSON.parse(contenido)
        aux.push(producto1)

        await fs.writeFile(ruta, JSON.stringify(producto1))
        aux.push(producto1)
        await fs.writeFile(ruta, JSON.stringify(producto1))


    } catch (error){
        return error
    }
}

promisesTXT(RUTA_ARCHIVO)


// const getProducts = () =>{
//    return muebleria.map (product => product.title)
// }

// const getProductsById = () =>{
//     muebleria.filter (product => product.id)
//     if(id ==! id){
//         console.log ("Not Found")
//     }else{
//         console.log(product.id)
//     }
// }
