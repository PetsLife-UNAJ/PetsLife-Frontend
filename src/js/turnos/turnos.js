const getMascotasByClienteId = (clienteId) => {
  fetch(`https://localhost:44314/api/Cliente/${clienteId}`)
    .then((response) => response.json())
    .then((data) => {
      const place = document.getElementById('inputSelect');

      for (const mascota of data.mascotas) {
        let element = document.createElement('option');
        element.value = mascota.mascotaId;

        element.innerHTML = mascota.nombre;
        place.appendChild(element);
      }
    });
};

const getTurnos = async () => {
  let fechaActual = new Date();
  let fechaQuery =
    fechaActual.getFullYear() +
    '-' +
    (fechaActual.getMonth() + 1) +
    '-' +
    fechaActual.getDate();

  return await fetch(`https://localhost:44314/api/Turno?fecha=${fechaQuery}`)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

const createTurno = (datos) => {
  fetch('https://localhost:44314/api/Turno', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    body: datos
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
            <a href="javascript:location.reload()" class="btn btn-primary m-auto">Ir al menu </a>
          </div>
        </div>`;
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

const listarTurnos = async () => {
  let listaTurnos = await getTurnos();

  const place = document.getElementById('rows-turnos');

  for (const turno of listaTurnos) {
    let element = document.createElement('div');
    element.className = 'row justify-content-center row-cols-auto  text-center   ';

    let hora = new Date(turno.horaInicio);
    let minutos = hora.getMinutes();
    if (hora.getMinutes() == 0) {
      minutos = '00';
    }

    let horario = hora.getHours() + ':' + minutos;

    element.innerHTML = `
    <div class="col-1 border border-dark p-2">${horario}</div>
    <div class="col-1 border border-dark p-2">${turno.mascotaNombre}</div>
    <div class="col-2 border border-dark p-2">${turno.veterinarioNombre} ${turno.veterinarioApellido}</div>
    <div class="col-1 border border-dark p-2">${turno.matricula}</div>
    <div class="col-2 border border-dark p-2">${turno.consultorioNumero}</div>
    <div class="col-2 border border-dark p-2">${turno.clienteNombre} ${turno.clienteApellido}</div>
    <div class="col-1 border border-dark p-0 "><div class="mt-2">${turno.clienteTelefono}</div></div>


`;

    place.appendChild(element);
  }
};

window.onload = (e) => {
  getMascotasByClienteId(3);
  listarTurnos();
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
  let turnojson = JSON.stringify(turno);
  createTurno(turnojson);
};
