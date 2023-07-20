import productManager from "./ProdManager.js"
import utils from "./utils.js"

class CartManager {
    static id = 0
    static cantidad = 0
    constructor(path){
        this.cart = []
        this.path = path
        this.pathProds = "../products.json"
    }

    async newCarrito(product) {
        let data = await utils.readFile(this.path)
        this.products = data?.length > 0 ? data : []
        CartManager.id++
        const newcarrito = {
            id: CartManager.id,
            product: product,
            cantidad: CartManager.cantidad
        }
        this.cart.push(newcarrito)
        await utils.writeFile(this.path, this.cart)
    }


    async addtoCart(id) {
        let data = await utils.readFile(this.path)
        this.products = data?.length > 0 ? data : []
        let productJson = await utils.readFile(this.pathProds)
        const product = productJson.find((product) => product.id == id)
        if (!product) {
            console.log("No se encotro");
        } else {
            this.cart.push(product)
            await utils.writeFile(this.path, this.cart)
        }
    }



}
   

const cartManager = new CartManager("./carts.json")
await cartManager.addtoCart(1).then((data) => console.log(data))
export default cartManager