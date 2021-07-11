import {sesion} from './sesion.js'
import { changeIcon } from "../js/login/login.js"

const navBarCheck = () => {
    var section = location.pathname.split('/')[1].toLowerCase()

    if(section === 'store' || section === 'producto') {
        	// activo carro y barra de search
        document.getElementById("store-search").hidden = false
        document.getElementById("store-cart").hidden = false
    }

    if (sesion && sesion.usuario.rolId === 1 && section !== 'admin') {
        // Lo inserto dinamicamente para que no aparezca en el html el boton hidden si no sos admin
        document.getElementById("navBarMenu").insertAdjacentHTML(
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
        )
    }
}

const load = () => {
    changeIcon()

    navBarCheck()
}

load()