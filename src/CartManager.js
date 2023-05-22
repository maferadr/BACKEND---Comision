import {promises as fs, writeFile} from 'fs'
import { parse } from 'path'

export class CartManager {
    constructor(path){
        this.path = path
    }

    static incrementarID(){
        if(this.idIncrement){
            this.idIncrement ++
        }else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async createCarrito(){
        const carritoJSON = await fs.readFile(this.path, 'utf-8')
        const cart = JSON.parse(carritoJSON)
        const carrito = {
            id: CartManager.incrementarID(),
            products: []
        }

        cart.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(cart))
        return "Carrito Creado"
    }

    async getCartByID(id){
        const carritoJSON = await fs.readFile(this.path, 'utf-8')
        const cart = JSON.parse(carritoJSON)
        if(cart.some(carrito => carrito.id === parseInt(id))){
            return cart.find(carrito => carrito.id === parseInt(id))
        }else{
            return "Carrito no encontrado"
        }
    }

    async addProductCart(idCart, quantity, idProduct){
        const carritoJSON = await fs.readFile(this.path, 'utf-8')
        const cart = JSON.parse(carritoJSON)
        //Se busca el carrito especificado
        const carrito = cart.find( carro => carro.id === parseInt(idCart))

        if(carrito){
            //si existe, verifico si ya fue previamente agregado
            if(carrito.products.some(product => product.product === parseInt(idProduct))){
                //Se busca el indice del carrito para modificar su cantidad al agregarlo
                let carritoAdded = carrito.products.findIndex(product => product.product === parseInt(idProduct))

                carrito.products[index].product = parseInt(idProduct)
                carrito.products[index].quantity = carrito.products[index].quantity + parseInt(quantity)

                let indexCart = cart.findIndex( c => c.id === parseInt(idCart))
                cart[indexCart] = carrito

                //se reescriben los archivos txt con los datos obtenidos
                await fs.writeFile(this.path, JSON.stringify(cart))
                return true
            }else{
                const newproduct = {"product":parseInt(idProduct),"quantity":parseInt(quantity)}
                carrito.products.push(newproduct)

                //Se busca el indice del carrito para modificarlo
                let indexCart = carts.findIndex(c => c.id === parseInt(idCart))
                carts[indexCart]= carrito

                await fs.writeFile(this.path, JSON.stringify(carts))
                return true
            }
        
        }else{
            return false
        }
}
}

