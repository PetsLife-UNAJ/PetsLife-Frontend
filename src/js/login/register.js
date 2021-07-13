import {registerUser} from '../services/registerService.js';

const formRegister = document.getElementById('form-register');

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