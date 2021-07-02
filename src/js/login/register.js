import {URL_API_REGISTER} from '../constants.js';
import {sesion} from '../sesion.js';

const formRegister = document.getElementById('form-register');

formRegister.onsubmit = (e) => {
  e.preventDefault();

  let nombres = formRegister.elements.nombre.value;
  let apellidos = formRegister.elements.apellido.value;
  let dni = formRegister.elements.dni.value;
  let email = formRegister.elements.email.value;
  let telefono = formRegister.elements.telefono.value;
  let password = formRegister.elements.contraseña.value;
  let sexo = formRegister.elements.sexo.value;

  let registro = {nombres, apellidos, dni, email, telefono, password, sexo};

  let registroJson = JSON.stringify(registro);

  fetch(URL_API_REGISTER, {
    method: 'POST',
    headers: {
      Authorization: ` Bearer  ${sesion.token}`,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: registroJson
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
