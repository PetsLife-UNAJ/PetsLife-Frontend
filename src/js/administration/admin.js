import {sesion, getPayload} from '../sesion.js';

// Chequear logeo como admin
// if (sesion) {
//   const payload = getPayload(sesion.token);
//   const user = JSON.parse(payload.User);
//   if (user.RolId != 1) {
//     location.href = '/home';
//   }
// } else {
//   location.href = '/home';
// }
