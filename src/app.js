import express from "express"
import productManager from "./ProdManager.js"

const PORT = 8080
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
    const {limit} = req.query
    try {
        const productos = await productManager.getProducts()
    if (limit) {
            let limited = productos.filter((data, index) => index < limit)
            res.json(limited)
        }else{
            res.send(productos)
        }}
    catch (error) {
            console.log(error);
        }
}) 

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params
    const producto = await productManager.getProductById(parseInt(pid))
    console.log(producto);
    if(producto){
        res.json({producto})
    }else{
        res.send("No se encontro el producto")
    }
})

app.listen(PORT, () => console.log("Escuchando en puerto 8080")) 