import {sesion, getPayload} from './sesion.js';
import {changeIcon} from './login/login.js';
import {BASE_URL_HOME} from './constants.js';
let user;
const navBarCheck = () => {
  var section = location.pathname.split('/')[1].toLowerCase();

  if (section === 'store' || section === 'producto') {
    // activo carro y barra de search
    document.getElementById('store-search').hidden = false;
    document.getElementById('store-cart').hidden = false;
  }

  if (sesion) {
    const payload = getPayload(sesion.token);
    user = JSON.parse(payload.User);
  }

  if (sesion && (user.RolId === 1 || user.RolId === 2) && section !== 'admin') {
    // Lo inserto dinamicamente para que no aparezca en el html el boton hidden si no sos admin
    document.getElementById('navBarMenu').insertAdjacentHTML(
      'beforeend',
      `
            <li class="nav-item">
                <a
                  class="bs-menu-lv1"
                  style="text-decoration: none"
                  href="/admin"
                  title="Admonistracion"
                  role="menuitem"
                >
                  Administracion
                </a>
              </li>
            `
    );
  }

  // redirecteo home si un usuario intenta acceder a admin sin privilegios
  if (section === 'admin') {
    if (!sesion || user.RolId === 3) {
      window.location.replace(BASE_URL_HOME);
    }
  }
};

const load = () => {
  changeIcon();

  navBarCheck();
};

load();
