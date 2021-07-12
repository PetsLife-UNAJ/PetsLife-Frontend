import {sesion, getPayload} from '../sesion.js';
import {URL_API_CLIENTE, URL_API_TURNO, URL_API_MASCOTA} from '../constants.js';

let user = undefined;

window.onload = () => {
  if (sesion) {
    const payload = getPayload(sesion.token);
    user = JSON.parse(payload.User);
    if (user.RolId === 3) {
      getClienteSesion();
      getTurnos();
      listarTurnos();
    }
  }
};

const getClienteSesion = async () => {
  if (sesion) {
    return await fetch(`${URL_API_CLIENTE}/${user.Id}`, {
      headers: {Authorization: ` Bearer  ${sesion.token}`}
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status != 404) {
          const place = document.getElementById('inputSelect');

          for (const mascota of res.mascotas) {
            let element = document.createElement('option');
            element.value = mascota.mascotaId;

            element.innerHTML = mascota.nombre;
            place.appendChild(element);
          }
        }
      })
      .catch((err) => console.log(err));
  }
};

const getTurnos = async () => {
  let fechaActual = new Date();
  let fechaQuery =
    fechaActual.getFullYear() +
    '-' +
    (fechaActual.getMonth() + 1) +
    '-' +
    fechaActual.getDate();
  if (sesion) {
    return await fetch(URL_API_TURNO + `?fecha=${fechaQuery}`, {
      headers: {Authorization: ` Bearer  ${sesion.token}`}
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.log(err));
  }
};

const createTurno = (data) => {
  let turnojson = JSON.stringify(data);

  fetch(URL_API_TURNO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: ` Bearer  ${sesion.token}`
    },
    body: turnojson
  })
    .then((response) => {
      response.json();

      if (response.status == 201) {
        formTurno.innerHTML = ` 
        <div class="card text-center p-0 my-2 ">
          <div class="card-header bg-transparent text-success border-0">
            <i class="far fa-check-circle display-4 d-block"></i>
            <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
          </div>
          <div class="card-body">
            <p class="card-text lead">El Turno se ha sido registrado con éxito.</p>
            <p class="card-text lead">Revise su casilla de email.</p>
            <a href="javascript:location.reload()" class="btn btn-primary m-auto">Ir al menu </a>
          </div>
        </div>`;

        let turnoMessage = {
          message: `
            <h1>Su turno ha sido confirmado.</h1>
            <p>Datos de su turno:</p>
            <h4>${data.fecha}</h4>
            <h4>${data.horaInicio}</h4>
            <p>Lo esperamos.</p>           
          `,
          email: user.Email
        };
        let turnoMessageJson = JSON.stringify(turnoMessage);

        fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: turnoMessageJson
        })
          .then((res) => res.json())
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      } else {
        formTurno.innerHTML = ` <div class="card text-center p-0 my-2 ">
        <div class="card-header bg-transparent text-danger border-0">
        <i class="fas fa-exclamation-triangle"></i>
          <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
        </div>
        <div class="card-body">
          <p class="card-text lead">El Turno no se ha sido registrado.</p>
          <a href="javascript:location.reload()" class="btn btn-danger m-auto">Ir al menu </a>
        </div>
      </div>`;
      }
    })

    .catch((err) => {
      console.log(err);
      formTurno.innerHTML = ` <div class="card text-center p-0 my-2 ">
      <div class="card-header bg-transparent text-danger border-0">
      <i class="fas fa-exclamation-triangle"></i>
        <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
      </div>
      <div class="card-body">
        <p class="card-text lead">El Turno no se ha sido registrado.</p>
        <a href="javascript:location.reload()" class="btn btn-danger m-auto">Ir al menu </a>
      </div>
    </div>`;
    });
};

const listarTurnos = () => {
  fetch(URL_API_TURNO, {
    headers: {Authorization: ` Bearer  ${sesion.token}`}
  })
    .then((res) => res.json())
    .then((res) => {
      if (sesion) {

        res.sort(function (a, b) {
          return new Date(a.horaInicio) - new Date(b.horaInicio);
        });


        for (const turno of res) {
          if (turno.clienteId == user.Id) {
            let horario = new Date(turno.horaInicio);
            let horaTurno = horario.getHours() + ':' + horario.getMinutes();
            if (horario.getMinutes() == 0) {
              horaTurno = horaTurno + '0';
            }
            turno.horaInicio = horaTurno;

            let fecha = new Date(turno.fecha);
            turno.fecha = `${fecha.getDate()}/${
              fecha.getMonth() + 1
            }/${fecha.getFullYear()}`;

            const place = document.getElementById('tabla-listado');
            const element = document.createElement('tr');
            element.classList = 'border';
            element.innerHTML = `
          <td>${turno.fecha}</td>
          <td>${turno.horaInicio}</td>
          <td>${turno.mascotaNombre}</td>
          <td>${turno.veterinarioNombre} ${turno.veterinarioApellido}</td>
          <td>${turno.consultorioNumero}</td>    
          `;
            place.appendChild(element);
          }
        }
      }
    })
    .catch((err) => console.log(err));
};

const formTurno = document.getElementById('formTurno');
formTurno.onsubmit = (e) => {
  e.preventDefault();

  let mascotaId = document.getElementById('inputSelect').value;
  let fecha = formTurno.elements.fecha.value;
  let hora = formTurno.elements.hora.value;

  let turno = {
    fecha: fecha,
    mascotaId: mascotaId,
    horaInicio: hora
  };

  createTurno(turno);
};

const createMascota = (datos) => {
  fetch(URL_API_MASCOTA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: ` Bearer  ${sesion.token}`
    },
    body: datos
  })
    .then((response) => {
      response.json();
      if (response.status == 201) {
        formMascota.innerHTML = ` <div class="card text-center p-0 my-2 ">
            <div class="card-header bg-transparent text-success border-0">
              <i class="far fa-check-circle display-4 d-block"></i>
              <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
            </div>
            <div class="card-body">
              <p class="card-text lead">La mascota se ha sido registrado con éxito.</p>
              <a href="javascript:location.reload()" class="btn btn-primary m-auto">Ir al menu </a>
            </div>
          </div>`;
      }
      if (response.status == 400) {
        formMascota.innerHTML = ` <div class="card text-center p-0 my-2 ">
          <div class="card-header bg-transparent text-danger border-0">
          <i class="fas fa-exclamation-triangle"></i>
            <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
          </div>
          <div class="card-body">
            <p class="card-text lead">La mascota no se ha registrado.</p>
            <a href="javascript:location.reload()" class="btn btn-danger m-auto">Ir al menu </a>
          </div>
        </div>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

var formMascota = document.getElementById('formMascota');

formMascota.onsubmit = (e) => {
  e.preventDefault();
  let nombre = document.getElementById('name').value;
  let edad = document.getElementById('edad').value;
  let peso = document.getElementById('peso').value;
  let cliente = user.Id;

  let mascota = {
    nombre: nombre,
    edad: edad,
    peso: peso,
    clienteId: cliente
  };

  let mascotajson = JSON.stringify(mascota);
  createMascota(mascotajson);
};
