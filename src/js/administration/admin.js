import {sesion} from '../sesion.js';

if (sesion.usuario.rolId != 1) {
  location.href = '/home';
}
