const backendUrl = "http://localhost:27459/"


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
    let response = await fetch(backendUrl + `api/productos`).catch(handleError)
    let data = await response.json()

    return data
}

export const getProductoById = async (id) => {
    let response = await fetch(backendUrl + `api/producto/${id}`).catch(handleError)
    let data = await response.json()

    return data
}

export const getCategorias = async () => {
    const response = await fetch(backendUrl + 'api/Categoria').catch(handleError)
    const data = await response.json()
    
    return data
}