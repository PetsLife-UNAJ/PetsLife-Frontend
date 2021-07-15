import {URL_API_LOGIN} from '../constants.js';

export const login = (cuenta) => {
  return fetch(URL_API_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(cuenta)
  })
    .then((res) => res.json())
    .catch((err) => err);
};
