import {
  URL_API_TURNO,
  URL_API_HISTORIA_CLINICA,
  URL_API_REGISTROS,
  URL_API_TRATAMIENTO
} from '../constants.js';
import {sesion, getPayload} from '../sesion.js';

let user;
if (sesion) {
  const payload = getPayload(sesion.token);
  user = JSON.parse(payload.User);
}

const getTurnosVeterinario = async () => {
  await fetch(`${URL_API_TURNO}/${user.Id}`, {
    headers: {Authorization: ` Bearer  ${sesion.token}`}
  })
    .then((response) => response.json())
    .then((res) => {
      listarTurnos(res);
    })
    .catch((err) => console.log(err));
};

const listarTurnos = async (turnos) => {
  const place = document.getElementById('turnos-list');

  turnos.sort(function (a, b) {
    return new Date(a.horaInicio) - new Date(b.horaInicio);
  });

  for (let turno of turnos) {
    let historia = await fetch(`${URL_API_HISTORIA_CLINICA}/${turno.mascotaId}`, {
      headers: {Authorization: ` Bearer  ${sesion.token}`}
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
    let hora = new Date(turno.horaInicio);

    let horaTurno = hora.getHours() + ':' + hora.getMinutes();

    if (hora.getMinutes() == 0) {
      horaTurno = horaTurno + '0';
    }
    turno.horaInicio = horaTurno;
    let element = document.createElement('tr');
    element.classList = 'border';
    element.innerHTML = `
    <td>${turno.horaInicio}</td>
    <td>${turno.mascotaNombre}</td>
    <td>${turno.veterinarioNombre} ${turno.veterinarioApellido}</td>
    <td >${turno.clienteNombre} ${turno.clienteApellido}</td>
    <td>${turno.clienteTelefono}</td>
    <td>${turno.consultorioNumero}</td>
    <td> <button  data-bs-toggle="modal" data-bs-target="#modal-${turno.turnoId}" class="btn btn-primary btn-sm p-1">Atender</button> </td>
    <td><button class='btn btn-primary btn-sm' id="btn-historia-${turno.turnoId}" data-bs-toggle="modal" data-bs-target="#modal-hhcc-${turno.turnoId}">Ver Historia</button></td>
    `;

    place.appendChild(element);
    crearModal(turno, historia);
  }
};

const crearModal = (turno, historia) => {
  const listaModal = document.getElementById('modal-list');
  //Modal para atender
  const element = document.createElement('div');
  element.innerHTML = `
  <div class="modal fade" id="modal-${turno.turnoId}" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content modal-listado-content">
      <div class="modal-header">
        <h5 class="modal-title">Turno de ${turno.mascotaNombre}</h5>
      </div>
      <div class="modal-body">
        <div class="container-sm">
          
        <form>
            <div class="mb-3">
                <label for="registro-input" class="form-label fw-bold">Agregar un registro</label>
                <textarea type="email" class="form-control" id="registro-input-${turno.turnoId}" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="tratamiento-input" class="form-label fw-bold">Agregar un tratamiento</label>
                <textarea class="form-control" id="tratamiento-input-${turno.turnoId}" required ></textarea>
              </div>

        </div>

        <div class="modal-footer justify-content-center">          
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="btn-turno-${turno.turnoId}"
            >Terminar</button
          >
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          >Cancelar</button
        >
        </form>
        </div>
      </div>
    </div>
  </div>   
  `;
  listaModal.appendChild(element);
  let btnTurno = document.getElementById(`btn-turno-${turno.turnoId}`);
  btnTurno.onclick = () => {
    let tratamiento = document.getElementById(
      `tratamiento-input-${turno.turnoId}`
    ).value;
    let registro = document.getElementById(`registro-input-${turno.turnoId}`).value;
    let mascotaId = turno.mascotaId;

    let data = {...turno, tratamiento, registro, mascotaId};
    agregarRegistro(data);
  };

  //Modal para ver historia

  const elementB = document.createElement('div');
  elementB.innerHTML = `
  <div class="modal fade" id="modal-hhcc-${turno.turnoId}" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content modal-listado-content">
        <div class="modal-header">
        <h5 class="modal-title">Historia de ${turno.mascotaNombre}</h5>
        </div>
      
        <div class="modal-body" id="modal-historia-${turno.turnoId}">
        <div class='container'> 
          
        
      </div>
      </div>
    </div>
    </div>   
  </div>   
  `;
  listaModal.appendChild(elementB);

  const place = document.getElementById(`modal-historia-${turno.turnoId}`);

  historia.sort(function (a, b) {
    return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
  });

  for (let registro of historia) {
    let element = document.createElement('div');

    if (registro.analisis == null) {
      element.innerHTML = `
        <h6 class="mt-2 text-muted">No posee historia clinica.</h6>
      `;
    } else {
      let fecha = new Date(registro.fechaCreacion);
      registro.fechaCreacion = `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`;
      element.innerHTML = `
   <div class=" border-bottom border-1 border-dark mb-1">
      <div class="row">
          <h6><strong>Fecha:</strong> ${registro.fechaCreacion}</h6>
      </div>  
      <div class="row">
         <h6><strong>Registro:</strong> ${registro.analisis}</h6>
      </div>
      <div class="row">
          <h6><strong>Tratamiento:</strong> ${registro.tratamiento}</h6>
      </div>
    </div>
    `;
    }
    place.appendChild(element);
  }
};

const agregarRegistro = async (data) => {
  let registro = {
    analisis: data.registro,
    historiaClinicaId: data.historiaClinicaId
  };

  let registroJson = JSON.stringify(registro);

  const registroResponse = await fetch(URL_API_REGISTROS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: ` Bearer  ${sesion.token}`
    },

    body: registroJson
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);

  let tratamiento = {
    registroId: registroResponse.registroId,
    descripcion: data.tratamiento
  };

  let tratamientoJson = JSON.stringify(tratamiento);
  fetch(URL_API_TRATAMIENTO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: ` Bearer  ${sesion.token}`
    },
    body: tratamientoJson
  })
    .then((response) => response.json())
    .catch((err) => err);

  fetch(`${URL_API_TURNO}/${data.turnoId}`, {
    method: 'DELETE',
    headers: {Authorization: ` Bearer  ${sesion.token}`}
  })
    .then((res) => res.json())
    .catch((err) => err);

  location.reload();
};

window.onload = () => {
  getTurnosVeterinario();
};
