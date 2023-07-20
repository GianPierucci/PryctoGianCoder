import { randomUUID } from "crypto"
import fs, { exists } from "fs"
import utils from "./utils.js"
import { error, log } from "console"

class ProductManager {
    products
    static id = 0
    static code = randomUUID()
    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProducts(title, description, price, id, thumbnail, stock) {
        try {
            let data = await utils.readFile(this.path)
            this.products = data?.length > 0 ? data : []
        } catch (error) {
            console.log(error);
        }

        let exists = this.products.find((file) => file.id == id)
        
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

    async getProductById(id) {
        let products = await utils.readFile(this.path)
        this.products = products?.length > 0 ? products : []
        const newProductoSearched = products.find((newProducto) => newProducto.id == id)
        if (newProductoSearched !== undefined) {
            return newProductoSearched
        } else {
            console.log("Product Not Found");
        }
    }

    async updateProduct(id,data) {
        try {
            let products = await utils.readFile(this.path)
            this.products = products?.length > 0 ? products : []

            let productIndex = this.products.findIndex((dato) => dato.id == id)
            if (productIndex !== -1) {
                this.products[productIndex] = { ...products[productIndex], ...data  }
                await utils.writeFile(this.path, products)
                return products[productIndex]
            } else {
                return "no existe el producto solicitado"
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProductById(id) {
        try {
            let data = await utils.readFile(this.path)
            this.products = data?.length > 0 ? products : []

            let productIndex = this.products.findIndex((dato) => dato.id == id)
            if (productIndex !== -1) {
                this.products.splice(productIndex, 1)
                await utils.writeFile(this.path, products)
                return "Producto eliminado"
            } else {
                return "no existe el producto solicitado"
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager("./products.json")
/* 
await productManager.getProductById(1).then((data)=>console.log(data))
console.log("hola"); */
export default productManager
//await productManager.deleteProducts()
