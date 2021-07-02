import {URL_API_REGISTER} from '../constants.js';
import {sesion} from '../sesion.js';

export const registerUser = (data) => {
  return fetch(URL_API_REGISTER, {
    method: 'POST',
    headers: {
      Authorization: ` Bearer  ${sesion.token}`,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
