
//E-commerce que arrojara productos de muebleria y bienes de Hogar

class ProductManager {
    constructor(){
        this.products = []
    }

    addProducts(product) {
        if (this.products.find(producto => producto.code == product.code)){
            return "Producto Existente"
        }else{
            this.products.push(product)
            //Producto no existente con este codigo
        }
    }

    getProducts(){
        return this.products
    }
    
    getProductsById(id){
        const product = this.products.find(producto => producto.id == id)

        if(product){
            return product
        }else{
            return "NOT FOUND"
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

class muebleria extends Product{
    constructor(title, description, price, thumbnail, code, stock, category){
        super(title, description, price, thumbnail, code, stock)
        this.category = category
    }
    static generalDescription = "Boost GOOD VIBES starting from where you belong. Your favorite Marketplace website to get along with ideas and inspirations for your home.";
    caption = () =>{
        console.log(`${this.title} let's start! ${muebleria.generalDescription}`)
    }
}


const furniture = new muebleria ("1", "Furniture", "Sofas, Beds and Matresses, Game Stations, and more...", 300, "ruta-imagen", "US-356-1", 150, "Sofas")
console.log(furniture)
const storage = new muebleria("2", "Storage and Organization", "TV & Media furniture, Shelves, Displays and cabinets...", 150, "ruta-imagen", "US-356-2", 600, "TV & Media")
const kitchen = new muebleria ("3", "Kitchen and Appliances", "Appliances, Kitchen islands and Carts, Drawers...", 220, "ruta-imagen", "US-356-3", 550)
const kids = new muebleria ("4", "Baby & Kids", "Take the next Step for your kids room", 125, "ruta-imagen", "US-356-4", 178)
const outdoor = new muebleria ("5", "Outdoor Areas", "Flooring, plots and plants, Furniture, Lighting...", 257, "ruta-imagen", "US-356-5", 450)

furniture.caption()
storage.caption()
kitchen.caption()
kids.caption()
outdoor.caption()

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
