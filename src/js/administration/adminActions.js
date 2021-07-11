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
  let response = await fetch(URL_API_HISTORIA_BASE + '/turno', {
    headers: {Authorization: ` Bearer  ${sesion.token}`}
  }).catch(handleError);
  let data = await response.json();

  return data;
};
// ---------------------------------------------------------------------------------------------------

// ------------------------------------ ADOPTIONS ----------------------------------------------------
export const getAdoptables = async () => {
  let response = await fetch(BASE_URL_ADOPTIONS + '/Adoptables', {
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

  let response = await fetch(BASE_URL_ADOPTIONS + '/Mascota', settings).catch(handleError);
  let data = await response.json();

  return data;
};
// ---------------------------------------------------------------------------------------------------
