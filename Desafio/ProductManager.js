import {promises as fs} from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path
        this.products = []
    }

    async addProducts(product) {
        // const adding = await fs.writeFile(this.path, JSON.stringify(this.products)) // Escribe los productos que contenga el array, si no existen, LOS CREA

        // if (this.products.find(producto => producto.code == product.code)){
        //     return "Producto Existente"
        // }else{
        //     const aux = JSON.parse(adding)
        //     aux.push(product) // Anade el producto que no exista aun 

        //     //Producto no existente con este codigo
        // }

        const adding = await fs.readFile(this.path, 'utf-8')
        const addingConst = JSON.parse(adding)

        // product.id = ProductManager.incrementarID() De querer hacer uso de un ID autoincrementable, seria mejor aplicar un reduce
        // o mover el static para la const de ProductManager?
        
        addingConst.push(product)
        await fs.writeFile(this.path, JSON.stringify(addingConst))
        return "Producto Creado"
    }

    async getProducts(){
        const products = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(products)
        console.log(prods)
    }

    
    async getProductsById(id){
        const product = await fs.readFile(this.path, 'utf-8')
        const prod = JSON.parse(product).find(producto => producto.id === parseInt(id))
        console.log(prod)
        
        if(prod){
            return prod
        }else{
            // const notFound = await fs.writeFile(this.path, "NOT FOUND") Seria redundante plantearlo de esta manera?
            console.log("Not Found")    
        }

    }

    async updateProduct(id, {title, description, price, thumbnail, code, stock}){
        const adding = await fs.readFile(this.path, 'utf-8')
        const addingConst = JSON.parse(adding)
        if(addingConst.some(prod => prod.id === parseInt(id))){
            let index = addingConst.findIndex(prod => prod.id === parseInt(id))
            addingConst[index].title = title,
            addingConst[index].description = description,
            addingConst[index].price = price,
            addingConst[index].thumbnail = thumbnail,
            addingConst[index].code = code,
            addingConst[index].stock = stock,
            await fs.writeFile(this.path, JSON.stringify(addingConst))
            return "Product Uptaded"
        }else{
            return "Not Found"
        }

    }

    async deleteProduct(id){
        const adding = await fs.readFile(this.path, 'utf-8')
        const addingConst = JSON.parse(adding)
        if(addingConst.some(prod => prod.id === parseInt(id))){
            const prodFiltered = addingConst.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodFiltered))
            return "Product Deleted"
        }else{
            return "Not Found"
        }

    }

}

class Product{
    constructor(title = "", description = "", price= "", thumbnail= "", code= "", stock= ""){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        this.id = Product.incrementarID()
    }

    static incrementarID(){
        if (this.idIncrement){
            this.idIncrement++
        }else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

// class muebleria extends Product{
//     constructor(title, description, price, thumbnail, code, stock, category){
//         super(title, description, price, thumbnail, code, stock)
//         this.category = category
//     }
//     static generalDescription = "Boost GOOD VIBES starting from where you belong. Your favorite Marketplace website to get along with ideas and inspirations for your home.";
//     caption = () =>{
//         console.log(`${this.title} let's start! ${muebleria.generalDescription}`)
//     }
// }


const furniture = new Product ("Furniture", "Sofas, Beds and Matresses, Game Stations, and more...", 300, "ruta-imagen", "US-356-1", 150, "Sofas")
console.log(furniture)
const storage = new Product("Storage and Organization", "TV & Media furniture, Shelves, Displays and cabinets...", 150, "ruta-imagen", "US-356-2", 600, "TV & Media")
const kitchen = new Product ("Kitchen and Appliances", "Appliances, Kitchen islands and Carts, Drawers...", 220, "ruta-imagen", "US-356-3", 550)
const kids = new Product ("Baby & Kids", "Take the next Step for your kids room", 125, "ruta-imagen", "US-356-4", 178)
const outdoor = new Product ("Outdoor Areas", "Flooring, plots and plants, Furniture, Lighting...", 257, "ruta-imagen", "US-356-5", 450)

const prod = new ProductManager ('./info.txt')
await prod.getProducts()

