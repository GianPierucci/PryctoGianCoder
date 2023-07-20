import express from "express"
import {productsRouter} from "./routes/products.js"
import {cartRouter} from "./routes/cart.js"

const PORT = 8080
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/products", productsRouter)
app.use("/cart", cartRouter)


app.listen(PORT, () => console.log("Escuchando en puerto 8080")) 