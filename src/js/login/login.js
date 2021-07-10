import {login} from '../services/loginService.js';
import {sesion, logOut, getPayload} from '../sesion.js';

// window.onload = () => {
//   checkLogin();
//   changeIcon();
//   console.log(sesion);
//   const payload = getPayload(sesion.token);
//   console.log(JSON.parse(payload.User));
// };

export const checkLogin = () => {
  document.getElementById('back-home').onclick = () => {
    location.href = '/home';
  };

  document.getElementById('btn-register').onclick = () => {
    location.href = '/register';
  };
  if (
    !(location.pathname == '/home') &&
    !(location.pathname == '/register') &&
    !sesion
  ) {
    document.getElementById('btn-log').click();
  }
};

const formLogin = document.getElementById('form-login');

formLogin.onsubmit = async (e) => {
  e.preventDefault();

  let {correo, password} = formLogin.elements;

  let cuenta = {email: correo.value, password: password.value};

  let response = await login(cuenta);
  if (response) {
    console.log(response);
    localStorage.setItem('usuario', JSON.stringify(response));

    location.reload();
  } else {
    document.getElementById('estado-login').innerHTML = 'No se ha podido registrar.';
  }
};

export const changeIcon = () => {
  const IconLog = document.getElementById('icon-login');
  const btnLog = document.getElementById('btn-log');
  if (sesion) {
    IconLog.classList.replace('fa-user', 'fa-sign-out-alt');
    btnLog.removeAttribute('data-bs-target');
    btnLog.removeAttribute('data-bs-toggle');
    btnLog.onclick = () => {
      logOut();
    };
  } else {
    IconLog.classList.replace('fa-sign-out-alt', 'fa-user');
  }
};
