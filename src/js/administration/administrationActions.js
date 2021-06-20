const backendUrl = "https://localhost:44314/"

export const getTurnos = async () => {
    try {
        let response = await fetch(backendUrl + `api/turno`)
        let turnos = await response.json()

        return turnos
    }
    catch (e) {
        console.error(e)
    }

    return null
}
