import { sesion, getPayload, getUser } from './sesion.js';
import { changeIcon, checkLogin } from './login/login.js';
import { BASE_URL_HOME } from './constants.js';

let user;

const getAdminNavbar = () => {
    return (
        `
        <li class="nav-item bs-menu-close">
        <button
          type="button"
          class="bs-menu-lv1"
          data-toggle="collapse"
          data-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-arrow-alt-circle-left" aria-hidden="true"></i>
        </button>
        <div class="dropdown-divider"></div>
      </li>
      <li class="nav-item">
        <a
          class="bs-menu-lv1"
          style="text-decoration: none"
          href="/home"
          title="Inicio"
          role="menuitem"
        >
          Inicio
        </a>
      </li>
      <li class="nav-item">
        <a
          class="bs-menu-lv1"
          style="text-decoration: none"
          href="/admin/store"
          title="Destacados"
          role="menuitem"
        >
          Tienda
        </a>
      </li>
      <li class="nav-item">
        <a
          class="bs-menu-lv1"
          style="text-decoration: none"
          href="/admin/clinic"
          title="Veterinaria"
          role="menuitem"
          id="btn-veterinaria"
        >
          Veterinaria
        </a>
      </li>
      <li class="nav-item">
        <a
          class="bs-menu-lv1"
          style="text-decoration: none"
          href="/admin/adoptions"
          title="Adopciones"
          role="menuitem"
        >
          Adopciones
        </a>
      </li>
        `
    )
}

const navBarCheck = () => {
    var section = location.pathname.split('/')[1].toLowerCase();

    if (section === 'store' || section === 'producto') {
        // activo carro y barra de search
        document.getElementById('store-search').hidden = false;
        document.getElementById('store-cart').hidden = false;
    }

    if (sesion) {
        user = getUser()
    }

    // Cambio navbar por navbar admin
    if (sesion && user.RolId === 1) {
        document.getElementById('navBarMenu').innerHTML = getAdminNavbar()
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
    checkLogin();
    navBarCheck();
};

load();
