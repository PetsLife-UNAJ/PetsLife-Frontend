import {login} from '../services/loginService.js';
import {sesion, logOut, getPayload} from '../sesion.js';

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
    !(location.pathname == '/adoptions') &&
    !(location.pathname == '/store') &&
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
    localStorage.setItem('usuario', JSON.stringify(response));

    let lsUser = JSON.parse(localStorage.getItem('usuario'));

    const payload = getPayload(lsUser.token);
    let user = JSON.parse(payload.User);

    if (user.RolId === 1) {
      location.href = '/home';
    } else if (user.RolId === 2) {
      location.href = '/lista-turnos';
    } else {
      location.reload();
    }
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
