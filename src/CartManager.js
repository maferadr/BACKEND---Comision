import {promises as fs} from 'fs'

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
            cantidad: []
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

    async addProductCart(id, quantity, idCart){
        const carritoJSON = await fs.readFile(this.path, 'utf-8')
        const cart = JSON.parse(carritoJSON)
        const carrito = cart.find( carro => carro.id === parseInt(idCart))
        if(carrito.cantidad.some(product => product.id === parseInt(id))){
            let carritoAdded = cart.findIndex(prod = prod.stock === parseInt(quantity))
            carrito.push(carritoAdded) //La const carrito vendria haciendo referencia al ID autoincrementable
            carritoAdded[index].stock = quantity,
            await fs.writeFile(this.path, JSON.stringify(carritoAdded))
            return "Product Added"
            //Se modifica la cantidad
        }else{
            const create = await fs.writeFile(this.path, JSON.stringify(cart), () =>{
                this.id = id,
                this.quantity = quantity
            })
            return "Product Created"
            create.push()
        }
        //Crear nuevo objeto con id y quantity y guardarlo en el carrito
    }
}

