import {registerUser} from '../services/registerService.js';

const formRegister = document.getElementById('form-register');

formRegister.onsubmit = async (e) => {
  e.preventDefault();

  let nombres = formRegister.elements.nombre.value;
  let apellidos = formRegister.elements.apellido.value;
  let dni = formRegister.elements.dni.value;
  let email = formRegister.elements.email.value;
  let telefono = formRegister.elements.telefono.value;
  let password = formRegister.elements.contraseña.value;
  let sexo = formRegister.elements.sexo.value;

  let registro = {nombres, apellidos, dni, email, telefono, password, sexo};

  const response = await registerUser(registro);

  if (response) {
    formRegister.innerHTML = ` <div class="card text-center p-0 my-2 ">
    <div class="card-header bg-transparent text-success border-0">
      <i class="far fa-check-circle display-4 d-block"></i>
      <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
    </div>
    <div class="card-body">
      <a href="home" class="btn btn-primary m-auto">Ir al menu </a>
    </div>
  </div>`;
  } else {
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
  }
};
