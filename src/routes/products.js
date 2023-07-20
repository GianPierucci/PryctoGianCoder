import { Router } from "express"
import productManager from "../ProdManager.js"

export const productsRouter = Router()

productsRouter.get("/", async (req, res) => {
    const { limit } = req.query
    try {
        const productos = await productManager.getProducts()
        if (limit) {
            let limited = productos.filter((data, index) => index < limit)
            res.json(limited)
        } else {
            res.send(productos)
        }
    }
    catch (error) {
        console.log(error)
    }
})

productsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params
    const producto = await productManager.getProductById(parseInt(pid))
    console.log(producto)
    if (producto) {
        res.json({ producto })
    } else {
        res.send("Product not found")
    }
})

productsRouter.post("/", async (req, res) => {
    const { title, description, price, thumbnail } = req.body
    const product = {}

    if (!title || !description || !price || !thumbnail) {
        res.json({ message: "Missing data to enter" })
    } else {
        product.title = title
        product.description = description
        product.price = price
        product.thumbnail = thumbnail
    }

    try {
        const response = await productManager.addProducts(product)
        res.json({ message: "Product added", response })
    } catch (error) {
        console.log("error");
    }
})


productsRouter.put("/:pid", async (req, res) => {
    const {pid} = req.params        
    const { title, description, price, thumbnail } = req.body
    let product = await productManager.getProductById(parseInt(pid))
    if (!title || !description || !price || !thumbnail) {
        res.json({ message: "Missing data to enter" })
    } else {
        product.title = title
        product.description = description
        product.price = price
        product.thumbnail = thumbnail
    }

    let result = await productManager.updateProduct(parseInt(pid), product)
    res.json({ message: "Product changed", result })

})

productsRouter.delete("/:pid", async (req, res) => {
    const {pid} = req.params
    let product = await productManager.getProductById(parseInt(pid))
    if (!product) {
        res.json({message: "This product doesn't exists"})
    } else {
        
    }
    let result = await productManager.deleteProductById(product)
})