const backendUrl = "http://localhost:27459/"

export const getProductos = async () => {
    try {
        let response = await fetch(backendUrl + `api/productos`)
        let productos = await response.json()

        return productos
    }
    catch (e) {
        console.error(e)
    }

    return null
}

export const getProductoById = async (id) => {
    try {
        let response = await fetch(backendUrl + `api/producto/${id}`)
        let producto = await response.json()

        return producto
    }
    catch (e) {
        console.error(e)
    }

    return null
}