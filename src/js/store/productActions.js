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

export const updateProductoById = async (id, dataJson) => {
    const settings = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(dataJson)
    };

    let response = await fetch(BASE_URL_STORE + `api/Producto/${id}`, settings).catch(handleError)
    let data = await response.json()

    return data
}

export const deleteProductoById = async (id) => {
    const settings = {
        method: 'DELETE',
    };

    await fetch(BASE_URL_STORE + `api/Producto/${id}`, settings).catch(handleError)
    let data = {status: 200}

    return data
}
