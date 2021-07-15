import {sesion} from '../sesion.js';
import {URL_API_HISTORIA_BASE, BASE_URL_ADOPTIONS} from '../constants.js';

const handleError = (err) => {
  console.warn(err);
  return new Response(
    JSON.stringify({
      status: 400,
      message: err
    })
  );
};

// ------------------------------------- CLINIC -----------------------------------------------------
export const getTurnos = async () => {
  let response = await fetch(URL_API_HISTORIA_BASE + '/Turno', {
    headers: {Authorization: ` Bearer  ${sesion.token}`}
  }).catch(handleError);
  let data = await response.json();

  return data;
};
// ---------------------------------------------------------------------------------------------------

// ------------------------------------ ADOPTIONS ----------------------------------------------------
export const getAdoptables = async () => {
  let response = await fetch(BASE_URL_ADOPTIONS + '/Adoptables').catch(handleError);
  let data = await response.json();

  return data;
};

export const getMascotas = async () => {
  let response = await fetch(BASE_URL_ADOPTIONS + `/mascotas/all`, {
    headers: {Authorization: ` Bearer  ${sesion.token}`}
  }).catch(handleError);
  let data = await response.json();

  return data;
};

export const getTiposMascota = async () => {
  let response = await fetch(BASE_URL_ADOPTIONS + '/Tipos', {
    headers: {Authorization: ` Bearer  ${sesion.token}`}
  }).catch(handleError);

  let data = await response.json();

  return data;
};

export const addAdoptable = async (dataJson) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: ` Bearer  ${sesion.token}`
    },
    body: JSON.stringify(dataJson)
  };

  let response = await fetch(BASE_URL_ADOPTIONS + '/Mascota', settings).catch(
    handleError
  );
  let data = await response.json();

  return data;
};

export const updateMascota = async (dataJson) => {
  const settings = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: ` Bearer  ${sesion.token}`
    },
    body: JSON.stringify(dataJson)
  };

  let response = await fetch(
    BASE_URL_ADOPTIONS + `/Mascota/${dataJson.mascotaId}`,
    settings
  ).catch(handleError);
  let data = await response.json();

  return data;
};

export const deleteMascota = async (id) => {
  const settings = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: ` Bearer  ${sesion.token}`
    }
  };

  let response = await fetch(BASE_URL_ADOPTIONS + `/Mascota/${id}`, settings).catch(
    handleError
  );

  return response;
};

// ---------------------------------------------------------------------------------------------------

// ------------------------------------ OTRO ----------------------------------------------------
export const sendWhatsapp = async (dataJson) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataJson)
  };

  let response = await fetch('/send-whatsapp', settings).catch(handleError);
  let data = await response.json();

  return data;
};
