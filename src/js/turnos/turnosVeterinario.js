const getTurnosVeterinario = async (id) => {
  await fetch(`https://localhost:44314/api/Turno/${id}`)
    .then((response) => response.json())
    .then((res) => {
      listarTurnos(res);
    })
    .catch((err) => console.log(err));
};

const listarTurnos = async (turnos) => {
  const place = document.getElementById('turnos-list');

  for (const turno of turnos) {
    let fecha = new Date(turno.horaInicio);

    let fechaTurno = fecha.getHours() + ':' + fecha.getMinutes();

    if (fecha.getMinutes() == 0) {
      fechaTurno = fechaTurno + '0';
    }
    turno.horaInicio = fechaTurno;
    const element = document.createElement('tr');
    element.classList = 'border';
    element.innerHTML = `
    <td>${turno.horaInicio}</td>
    <td>${turno.mascotaNombre}</td>
    <td>${turno.veterinarioNombre} ${turno.veterinarioApellido}</td>
    <td >${turno.clienteNombre} ${turno.clienteApellido}</td>
    <td>${turno.clienteTelefono}</td>
    <td>${turno.consultorioNumero}</td>
    <td> <button  data-bs-toggle="modal" data-bs-target="#modal-${turno.turnoId}" class="btn btn-primary btn-sm p-1">Atender</button> </td>
    <td></td>
    `;

    place.appendChild(element);
    crearModal(turno);
  }
};

const crearModal = (turno) => {
  const listaModal = document.getElementById('modal-list');

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
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
          >Cancelar</button
        >
        </form>
        </div>
      </div>
    </div>
  </div>   
  `;
  listaModal.appendChild(element);
  const btnTurno = document.getElementById(`btn-turno-${turno.turnoId}`);
  btnTurno.onclick = () => {
    const tratamiento = document.getElementById(
      `tratamiento-input-${turno.turnoId}`
    ).value;
    const registro = document.getElementById(
      `registro-input-${turno.turnoId}`
    ).value;
    const mascotaId = turno.mascotaId;
    const turnoId = turno.turnoId;

    let data = {tratamiento, registro, mascotaId, turnoId};
    agregarRegistro(data);
  };
};

const agregarRegistro = async (data) => {
  const historiaClinica = await fetch(
    `https://localhost:44314/api/HistoriaClinica/${data.mascotaId}`
  )
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  let registro = {
    analisis: data.registro,
    historiaClinicaId: historiaClinica[0].historiaClinicaId
  };

  let registroJson = JSON.stringify(registro);

  const registroResponse = await fetch(`https://localhost:44314/api/Registros`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    body: registroJson
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  let tratamiento = {
    registroId: registroResponse.registroId,
    descripcion: data.tratamiento
  };

  let tratamientoJson = JSON.stringify(tratamiento);
  fetch(`https://localhost:44314/api/Tratamiento`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    body: tratamientoJson
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status == 201) {
        console.log('Tratamiento registrado con exito');
      }
    })
    .catch((err) => console.log(err));

  fetch(`https://localhost:44314/api/Turno/${data.turnoId}`, {
    method: 'DELETE'
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  location.reload();
};

window.onload = () => {
  getTurnosVeterinario(1001);
};
