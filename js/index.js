import { randomUUID } from "crypto"
class ProductManager {
    products
    static id = 0
    static code = randomUUID()
    constructor() {
        this.products = []
    }

    addProducts(title, description, price, thumbnail, stock) {
        ProductManager.id++
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code: ProductManager.code,
            stock,
            id: ProductManager.id
        }
        this.products.push(producto)
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productoSearched = this.products.find((producto) => producto.id == id)
        if(productoSearched) {
            console.log("Product Not Found");
        }else {
            return productoSearched
        }
    }
}

const productManager = new ProductManager()

productManager.addProducts("BMW","Sport car", 20000,"image/bmw", 5)
productManager.addProducts("Mercedes Benz","Sport car", 22000,"image/mb", 4)
productManager.addProducts("Audi","Sport car", 22000,"image/mb", 2)

console.log(productManager.getProducts());
console.log(productManager.getProductById(2));