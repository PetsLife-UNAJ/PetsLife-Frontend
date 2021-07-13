import {registerUser} from '../services/registerService.js';

const formRegister = document.getElementById('form-register');
const btnRegistrar = document.getElementById('btn-registrar');

const checkForm = (form) => {
  form.addEventListener("submit", (event) => {
    console.log(form.checkValidity());
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } 
      else {
          event.preventDefault();
          enviarFormRegister(form);
      }

    form.classList.add("was-validated");
    }, false
  );
};


checkForm(formRegister);
/*
formRegister.onsubmit = async (e) => {
  e.preventDefault();

  let nombre = formRegister.elements.nombre.value;
  let apellido = formRegister.elements.apellido.value;
  let dni = formRegister.elements.dni.value;
  let email = formRegister.elements.email.value;
  let telefono = formRegister.elements.telefono.value;
  let password = formRegister.elements.contraseña.value;
  let sexo = formRegister.elements.sexo.value;
  let direccion = formRegister.elements.direccion.value;

  let registro = {
    nombre,
    apellido,
    dni,
    email,
    telefono,
    password,
    sexo,
    direccion
  };

  registerUser(registro);
};
*/



const enviarFormRegister = (formRegister) => {
  btnRegistrar.innerHTML = `<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Registrando...
  </button>`;
  let nombre = formRegister.elements.nombres.value;
  let apellido = formRegister.elements.apellidos.value;
  let dni = formRegister.elements.dni.value;
  let email = formRegister.elements.email.value;
  let telefono = formRegister.elements.telefono.value;
  let password = formRegister.elements.contraseña.value;
  let sexo = formRegister.elements.sexo.value;
  let direccion = formRegister.elements.direccion.value;

  let registro = {
    nombre,
    apellido,
    dni,
    email,
    telefono,
    password,
    sexo,
    direccion
  };

  registerUser(registro);
};