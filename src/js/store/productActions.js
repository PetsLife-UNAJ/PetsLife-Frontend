const BASE_URL_STORE = "http://localhost:27459/"


const handleError = (err) => {
    console.warn(err);
    return new Response(JSON.stringify(
        {
            status: 400,
            message: err
        }
    ));
};

export const getProductos = async () => {
    let response = await fetch(BASE_URL_STORE + `api/productos`).catch(handleError)
    let data = await response.json()

    return data
}

export const getProductoById = async (id) => {
    let response = await fetch(BASE_URL_STORE + `api/producto/${id}`).catch(handleError)
    let data = await response.json()

    return data
}

export const getCategorias = async () => {
    const response = await fetch(BASE_URL_STORE + 'api/Categoria').catch(handleError)
    const data = await response.json()
    
    return data
}

export const getProductosPorCategoria = async (categoria) => {
    let response = await fetch(BASE_URL_STORE + `api/productos?categoria=${categoria}`).catch(handleError)
    let data = await response.json()

    return data
}

export const getProductosPorBuscador = async (producto) => {
    let response = await fetch(BASE_URL_STORE + `api/Productos?producto=${producto}`).catch(handleError)
    let data = await response.json()
  
    return data
}
  
export const updateProductoById = async (id, dataJson) => {
    const settings = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(dataJson)
    };

    let data = await fetch(BASE_URL_STORE + `api/Producto/${id}`, settings).catch(handleError)
    if (data.status === undefined) data.status = 200

    return data
}

export const deleteProductoById = async (id) => {
    const settings = {
        method: 'DELETE',
    };

    let data = await fetch(BASE_URL_STORE + `api/Producto/${id}`, settings).catch(handleError)
    if (data.status < 300) {
        return {status: 200}
    }

    return data
}
