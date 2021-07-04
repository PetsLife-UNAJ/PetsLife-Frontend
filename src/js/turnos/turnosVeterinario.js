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
    let historia = await fetch(
      `https://localhost:44314/api/HistoriaClinica/${turno.mascotaId}`
    )
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));

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
        <div class='container'>
        <div class="modal-body" id="modal-historia-${turno.turnoId}">
                
          <h2>Historia:</h2>
        
      </div>
      </div>
    </div>
    </div>   
  </div>   
  `;
  listaModal.appendChild(elementB);

  const place = document.getElementById(`modal-historia-${turno.turnoId}`);
  for (const registro of historia) {
    let element = document.createElement('div');

    if (registro.analisis == null) {
      element.innerHTML = `
        <h6 class="mt-2 text-muted">No posee historia clinica.</h6>
      `;
    } else {
      element.innerHTML = `
   <div class="border border-2 border-dark mb-1">
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
