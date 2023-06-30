import { errorMonitor } from "events";
import fs from "fs"

const datos = {
    localizacion: "miami",
    calle: "71st"
}

const operacionAsync = async() => {
    await fs.promises.writeFile("datos.txt", JSON.stringify(datos))

    let resultado = await fs.promises.readFile("datos.txt", "utf-8")
    console.log(resultado);
    console.log(JSON.parse(resultado))
}

operacionAsync()
