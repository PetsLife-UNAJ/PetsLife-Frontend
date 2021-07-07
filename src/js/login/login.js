import {login} from '../services/loginService.js';
import {logOut} from '../sesion.js';
const formLogin = document.getElementById('form-login');

formLogin.onsubmit = async (e) => {
  e.preventDefault();

  let {correo, password} = formLogin.elements;

  let cuenta = {email: correo.value, password: password.value};

  let response = await login(cuenta);
  if (response) {
    console.log(response);
    localStorage.setItem('usuario', JSON.stringify(response));

    const IconLog = document.getElementById('icon-login');
    IconLog.classList.replace('fa-user', 'fa-sign-out-alt');

    const btnLog = document.getElementById('btn-log');

    btnLog.removeAttribute('data-bs-target');
    btnLog.removeAttribute('data-bs-toggle');

    btnLog.onclick = () => {
      logOut();
    };
  } else {
    document.getElementById('estado-login').innerHTML = 'No se ha podido registrar.';
  }
};
