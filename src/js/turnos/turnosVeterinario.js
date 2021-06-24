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
        <h5 class="modal-title">${turno.horaInicio}</h5>
      </div>
      <div class="modal-body">
        <div class="container">
          <div class="container-fluid">
            <div
              class="
                row
                justify-content-center
                row-cols-auto
                fw-bold
                mt-4
                text-center
                fs-6
              "
            >
              <div class="col-2 border border-dark p-1">Horario</div>
              <div class="col-2 border border-dark p-1">Mascota</div>
              <div class="col-2 border border-dark p-1">Veterinario</div>
              <div class="col-2 border border-dark p-1">Cliente</div>
              <div class="col-2 border border-dark p-1">Telefono</div>
              <div class="col-2 border border-dark p-1">Consultorio</div>
            </div>

            <section id="rows-turnos"></section>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            >Cerrar</button
          >
        </div>
      </div>
    </div>
  </div>   
  `;
  listaModal.appendChild(element);
};

window.onload = async () => {
  getTurnosVeterinario(1001);
};
