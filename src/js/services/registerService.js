import {URL_API_REGISTER} from '../constants.js';

export const registerUser = ({
  nombre,
  apellido,
  dni,
  email,
  telefono,
  password,
  sexo,
  direccion
}) => {
  let userId;
  let userData = {
    nombre,
    apellido,
    dni,
    email,
    telefono,
    password,
    sexo
  };

  return fetch(URL_API_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(userData)
  })
    .then((res) => res.json())
    .then((res) => {
      let clientData = {
        nombre,
        apellido,
        dni,
        email,
        telefono,
        direccion
      };
      clientData.clienteId = res.id;
      console.log(clientData);
      fetch('https://localhost:44314/api/Cliente', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(clientData)
      })
        .then((res) => res.json())
        .then((res) => {
          const formRegister = document.getElementById('form-register');
          if (res) {
            formRegister.innerHTML = ` <div class="card text-center p-0 my-2 ">
          <div class="card-header bg-transparent text-success border-0">
            <i class="far fa-check-circle display-4 d-block"></i>
            <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
          </div>
          <div class="card-body">
            <a href="home" class="btn btn-primary m-auto">Ir al menu </a>
          </div>
        </div>`;
          }
        })
        .catch((err) => {
          formRegister.innerHTML = ` <div class="card text-center p-0 my-2 ">
          <div class="card-header bg-transparent text-danger border-0">
          <i class="fas fa-exclamation-triangle"></i>
            <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
          </div>
          <div class="card-body">
            <p class="card-text lead">No has sido registrado.</p>
            <a href="home" class="btn btn-danger m-auto">Ir al menu </a>
          </div>
        </div>`;
        });
    });
};
