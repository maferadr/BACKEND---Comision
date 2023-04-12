
class ProductManager{
    constructor(){
        this.products = []
    }

    addProducts(product){
        if(this.products.find(producto => producto.code === product.code)){
            return "Producto Existente"
        }else{
            this.products.push(product)
        }

    }

    getProducts(){
        return this.products
    }

    getProductsById(id){
        const product = this.products.find(producto => producto.id == product.id)

        if(product){
            return product
        }else{
            return "Not Found"
        }
    }

}

class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
    }

    static incrementarID(){
        if(this.IDincrement){
            this.IDincrement++
        }else{
            this.incrementarID = 1
        }

       return this.IDincrement 
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

console.log(furniture)
console.log(storage)
console.log(kitchen)
console.log(kids)
console.log(outdoor)