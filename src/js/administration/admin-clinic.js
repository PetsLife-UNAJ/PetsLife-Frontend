import { getTurnos } from "./adminActions.js"

var msBody              = document.getElementById("msBody")
var turnosTableBody     = document.getElementById("turnosTableBody")
var spinner             = document.getElementById("loadingSpinner")
var modalVeterinaria    = document.getElementById("modal-content-veterinaria")
var agregarClienteBtn   = document.getElementById("agregarClienteBtn")
var agregarMascotaBtn   = document.getElementById("agregarMascotaBtn")
var solicitarTurnoBtn   = document.getElementById("solicitarTurnoBtn")


window.onload = async () => {
    agregarClienteBtn.onclick = () => { modalVeterinaria.innerHTML = GetModalCliente()  }
    agregarMascotaBtn.onclick = () => { modalVeterinaria.innerHTML = GetModalMascota()  }
    solicitarTurnoBtn.onclick = () => { modalVeterinaria.innerHTML = GetModalTurno()    }

    var turnosJson = await getTurnos()
    spinner.remove()

    if (turnosJson.status === 400) {
        msBody.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los turnos de la base de datos</div>')
        return
    }

    turnosJson.forEach((turnoJson) => {
        turnosTableBody.insertAdjacentHTML('beforeend', GetTurnoTable(turnoJson))
    })
}

const GetModalMascota = () => {
    return (
        `
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
        `
    )
}

const GetModalCliente = () => {
    return (
        `
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
        `
    )
}

const GetModalTurno = () => {
    return (
        `
        <div class="modal-header">
        <h5 class="modal-title">Solicitar turno</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="formTurno">
          <div class="container w-75">
            <div class="row form-group input-group m-0 mt-3">
              <label class="fw-bold">Seleccione su mascota</label>
              <select class="custom-select form-control" id="inputSelect" name="selectMascota" required>
                <option selected disabled>Seleccionar</option>
              </select>
            </div>
      
            <div class="form-group row mt-3 m-0 mb-3 fw-bold">
              <label for="date-input">Fecha</label>
      
              <input class="form-control" name="fecha" type="date" id="date-input" required />
            </div>
      
            <div class="form-group m-0 row">
              <label for="time-input" class="fw-bold">Horario</label>
      
              <select class="form-control" name="hora" id="input-hour" required>
                <option disabled selected>Seleccione</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
              </select>
      
              <small class="small p-0 text-start">
                <span style="color: red">*</span>
                Horario de 9hs a 18hs.
              </small>
            </div>
          </div>
      
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary" id="btn-form-turno">
              Solicitar
            </button>
          </div>
        </form>
      </div>
        `
        )
}

const GetTurnoTable = (turnoJson) => {
    return (
        `
        <tr>
            <th scope="row">?</th>
            <td>${turnoJson.fecha}</td>
            <td>${turnoJson.mascotaNombre}</td>
            <td>${turnoJson.veterinarioNombre} ${turnoJson.veterinarioApellido}</td>
            <td>${turnoJson.clienteNombre} ${turnoJson.clienteApellido}</td>
            <td>${turnoJson.clienteTelefono}</td>
            <td>${turnoJson.consultorioNumero}</td>
            <td>
            <div class="dropdown">
                <div id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical d-pointer"></i>
                </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item d-pointer"><i class="bi bi-pencil"></i> Editar</a></li>
                        <li><a class="dropdown-item text-danger bg-danger text-white d-pointer"><i class="bi bi-trash"></i> Eliminar</a></li>
                    </ul>
                </div>
            </td>
        </tr>
        `
    )
}
