import {getTurnos} from './adminActions.js';

var msBody = document.getElementById('msBody');
var turnosTableBody = document.getElementById('turnosTableBody');
var spinner = document.getElementById('loadingSpinner');
var modalVeterinaria = document.getElementById('modal-content-veterinaria');
var agregarClienteBtn = document.getElementById('agregarClienteBtn');
var agregarMascotaBtn = document.getElementById('agregarMascotaBtn');

window.onload = async () => {
  agregarClienteBtn.onclick = () => {
    modalVeterinaria.innerHTML = GetModalCliente();
  };
  agregarMascotaBtn.onclick = () => {
    modalVeterinaria.innerHTML = GetModalMascota();
  };

  var turnosJson = await getTurnos();
  spinner.remove();

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

const GetModalMascota = () => {
  return `
        <div class="modal-header">
        <h5 class="modal-title">Ingresar mascota</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="formMascota">
          <div class="container w-75">
            <div class="row form-group input-group m-0 mt-3">
              <label class="fw-bold">Nombre</label>
              <input type="text" class="form-control" maxlength="50" id="name" required/>
            </div>
            <div class="row">
              <div class="col">
                <label class="fw-bold">Edad</label>
                <input type="number" class="form-control" maxlength="2" id="edad" required/>
              </div>
              <div class="col">
                <label class="fw-bold">Peso</label>
                <input type="number" class="form-control" maxlength="2" id="peso" required/>
              </div>
            </div>
            <div class="form-group m-0 row">
              <label class="fw-bold">Cliente</label>
              <select class="custom-select form-control" id="cliente" required>
                <option selected disabled>Seleccione un cliente</option>
              </select>
            </div>
          </div>

          <div class="modal-footer justify-content-center">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
        `;
};

const GetModalCliente = () => {
  return `
        <div class="modal-header">
        <h5 class="modal-title">Ingresar cliente</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form id="formCliente">
          <div class="container">
            <div class="row input-group mt-3">
              <div class="col">
                <label class="fw-bold">Nombre</label>
                <input type="text" class="form-control" maxlength="50" id="nombre" required/>
              </div>
              <div class="col">
                <label class="fw-bold">Apellido</label>
                <input type="text" class="form-control" maxlength="50" id="apellido" required/>
              </div>
            </div>
            <div class="row form-group input-group m-0 mt-3">
              <label class="fw-bold">Email</label>
              <input type="email" class="form-control" maxlength="50" id="email" required/>
            </div>
            <div class="row form-group input-group mt-3">
              <div class="col">
                <label class="fw-bold">Dni</label>
                <input type="number" class="form-control" maxlength="8" id="dni" required
                oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" 
                />
              </div>
              <div class="col">
                <label class="fw-bold">Telefono</label>
                <input type="number" class="form-control"  maxlength="12" id="telefono" required />
              </div>
            </div>
            <div class="row form-group input-group m-0 mt-3">
              <label class="fw-bold">Dirección</label>
              <input type="text" class="form-control" maxlength="50" id="direccion" required />
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
        </div>
        `;
};

const GetTurnoTable = (turnoJson) => {
  let horario = new Date(turnoJson.horaInicio);
  let horaTurno = horario.getHours() + ':' + horario.getMinutes();
  if (horario.getMinutes() == 0) {
    horaTurno = horaTurno + '0';
  }
  turnoJson.horaInicio = horaTurno;

  return `
        <tr>
            <th scope="row">${turnoJson.turnoId}</th>
            <td>${turnoJson.horaInicio}</td>
            <td>${turnoJson.mascotaNombre}</td>
            <td>${turnoJson.veterinarioNombre} ${turnoJson.veterinarioApellido}</td>
            <td>${turnoJson.clienteNombre} ${turnoJson.clienteApellido}</td>
            <td>${turnoJson.clienteTelefono}</td>
            <td>${turnoJson.consultorioNumero}</td>
           
        </tr>
        `;
};
