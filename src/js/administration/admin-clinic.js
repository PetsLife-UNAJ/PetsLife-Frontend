import {getTurnos} from './adminActions.js';
import {sesion, getPayload} from '../sesion.js';

var msBody = document.getElementById('msBody');
var turnosTableBody = document.getElementById('turnosTableBody');
var spinner = document.getElementById('loadingSpinner');
var modalVeterinaria = document.getElementById('modal-content-veterinaria');

window.onload = async () => {

  const payload = getPayload(sesion.token);
  let user = JSON.parse(payload.User);
  if (user.RolId == 1) {
    document.getElementById('nav-mis-turnos').hidden = true;
  }
  if (user.RolId == 2) {
    document.getElementById('menuPrincipal').innerHTML = '';
  }
 
  var turnosJson = await getTurnos();
  spinner.remove();

  //Ordenar por horario
  turnosJson.sort(function (a, b) {
    return new Date(a.horaInicio) - new Date(b.horaInicio);
  });

  if (turnosJson.status === 400) {
    msBody.insertAdjacentHTML(
      'beforeend',
      '<div class="alert alert-danger">Error al obtener los turnos de la base de datos</div>'
    );
    return;
  }

  turnosJson.forEach((turnoJson) => {
    turnosTableBody.insertAdjacentHTML('beforeend', GetTurnoTable(turnoJson));
  });
};



const GetTurnoTable = (turnoJson) => {
  let horario = new Date(turnoJson.horaInicio);
  let horaTurno = horario.getHours() + ':' + horario.getMinutes();
  if (horario.getMinutes() == 0) {
    horaTurno = horaTurno + '0';
  }
  turnoJson.horaInicio = horaTurno;

  let fecha = new Date(turnoJson.fecha);
  let fechaTurno =
    fecha.getFullYear() +
    '-' +
    (fecha.getMonth() + 1) +
    '-' +
    fecha.getDate();

  return `
        <tr>
            <th scope="row">${turnoJson.turnoId}</th>
            <td>${fechaTurno}</td>
            <td>${turnoJson.horaInicio}</td>
            <td>${turnoJson.mascotaNombre}</td>
            <td>${turnoJson.veterinarioNombre} ${turnoJson.veterinarioApellido}</td>
            <td>${turnoJson.clienteNombre} ${turnoJson.clienteApellido}</td>
            <td>${turnoJson.clienteTelefono}</td>
            <td>${turnoJson.consultorioNumero}</td>
           
        </tr>
        `;
};
