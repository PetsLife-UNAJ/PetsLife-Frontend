import {login} from '../services/loginService.js';
const formLogin = document.getElementById('form-login');

formLogin.onsubmit = async (e) => {
  e.preventDefault();

  let {correo, password} = formLogin.elements;

  let cuenta = {email: correo.value, password: password.value};

  let response = await login(cuenta);
  if (response) {
    console.log(response);
    localStorage.setItem('usuario', JSON.stringify(response));
    window.location.href = 'home';
  } else {
    document.getElementById('estado-login').innerHTML = 'No se ha podido registrar.';
  }
};
