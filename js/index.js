import { randomUUID } from "crypto"
import fs, { exists } from "fs"
import utils from "./utils.js"
import { error } from "console"

class ProductManager {
    products
    static id = 0
    static code = randomUUID()
    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProducts(title, description, price, thumbnail, stock) {
        let exists = this.products.some((file) => file.code == code)

        if (exists) {
            console.log("El archivo ya existe");
        } else {
            ProductManager.id++
            const newProducto = {
                title,
                description,
                price,
                thumbnail,
                code: ProductManager.code,
                stock,
                id: ProductManager.id
            }
            this.products.push(newProducto)
            await utils.writeFile(this.path, this.products)
        }
    }

    async getProducts() {
        try {
            let resultado = await utils.readFile(this.path)
            return resultado
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProducts() {
        await utils.deleteFile(this.path)
    }

    /* getProductById(id) {
        const newProductoSearched = this.products.find((newProducto) => newProducto.id == id)
        if(newProductoSearched) {
            console.log("Product Not Found");
        }else {
            return newProductoSearched
        }
    } */
}

const productManager = new ProductManager("./products.json")

await productManager.addProducts("BMW", "Sport car", 20000, "image/bmw", 5)
await productManager.addProducts("Mercedes Benz", "Sport car", 22000, "image/mb", 4)
await productManager.addProducts("Audi", "Sport car", 22000, "image/mb", 2)
await productManager.getProducts().then((data) => console.log(data))
await productManager.deleteProducts()
