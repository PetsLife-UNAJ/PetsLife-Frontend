const BASE_URL_ADOPTIONS = 'https://localhost:44363/'
const BASE_URL_CLINIC = 'https://localhost:44314/'
const BASE_URL_STORE = 'https://localhost:/'


const handleError = (err) => {
    console.warn(err);
    return new Response(JSON.stringify(
        {
            status: 400,
            message: err
        }
    ));
};

// ------------------------------------- CLINIC -----------------------------------------------------
export const getTurnos = async () => {
    let response = await fetch(BASE_URL_CLINIC + 'api/turno').catch(handleError)
    let data = await response.json()

    return data
}
// ---------------------------------------------------------------------------------------------------


// ------------------------------------ ADOPTIONS ----------------------------------------------------
export const getAdoptables = async () => {
    let response = await fetch(BASE_URL_ADOPTIONS + 'Adoptables').catch(handleError)
    let data = await response.json()

    return data
}

export const getTiposMascota = async () => {
    let response = await fetch(BASE_URL_ADOPTIONS + 'Tipos').catch(handleError)
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

    let response = await fetch(BASE_URL_ADOPTIONS + 'api/Mascota', settings).catch(handleError)
    let data = await response.json()

    return data
}
// ---------------------------------------------------------------------------------------------------
