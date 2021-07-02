import {URL_API_LOGIN} from '../constants.js';
const formLogin = document.getElementById('form-login');

formLogin.onsubmit = (e) => {
  e.preventDefault();

  let {correo, password} = formLogin.elements;

  let cuenta = {email: correo.value, password: password.value};

  let cuentajson = JSON.stringify(cuenta);

  fetch(URL_API_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: cuentajson
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem('usuario', JSON.stringify(response));
    })
    .catch((err) => console.log(err));
};
