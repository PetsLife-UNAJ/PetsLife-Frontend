
const handleError = (err) => {
    console.warn(err);
    return new Response(JSON.stringify(
        {
            status: 400,
            message: err
        }
    ));
};

export const getTurnos = async () => {
    let response = await fetch('https://localhost:44314/api/turno').catch(handleError)
    let data = await response.json()

    return data
}

export const getAdoptables = async () => {
    let response = await fetch('https://localhost:44363/Adoptables').catch(handleError)
    let data = await response.json()

    return data
}

export const getTiposMascota = async () => {
    let response = await fetch('https://localhost:44363/Tipos').catch(handleError)
    let data = await response.json()

    return data
}

export const addAdoptable = async (dataJson) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(dataJson)
    };

    let response = await fetch('https://localhost:44363/api/Mascota', settings).catch(handleError)
    let data = await response.json()

    return data
}