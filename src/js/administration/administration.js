import {
  getTurnos,
  getAdoptables,
  getTiposMascota,
  addAdoptable
} from './administrationActions.js';
import {getProductos, getCategorias} from '../store/productActions.js';

var msBody = document.getElementById('msBody');
var msVeterinaria = document.getElementById('msVeterinaria');
var msTienda = document.getElementById('msTienda');
var msAdopciones = document.getElementById('msAdopciones');
var msName = document.getElementById('msName');
var modalAdopciones = document.getElementById('modal-content-adopciones');

window.onload = async () => {
  msVeterinaria.onclick = () => {
    EnableVeterinaria();
  };
  msTienda.onclick = () => {
    EnableTienda();
  };
  msAdopciones.onclick = () => {
    EnableAdopciones();
  };

  msBody.innerHTML = `
        <div class="h1 text-center"><i class="bi bi-arrow-left"></i> Selecciona un microservicio</div>
    `;
};

// ----------------------------------- Veterinaria ---------------------------------------
const EnableVeterinaria = async () => {
  ResetMs();
  msVeterinaria.classList.add('active');
  msName.innerHTML = 'Veterinaria';

  msBody.innerHTML = `
        <button class="btn btn-light" id="agregarClienteBtn" data-bs-toggle="modal" data-bs-target="#modal-veterinaria"><i class="bi bi-plus-lg text-primary"></i> Agregar Cliente</button>
        <button class="btn btn-light" id="agregarMascotaBtn" data-bs-toggle="modal" data-bs-target="#modal-veterinaria"><i class="bi bi-plus-lg text-primary"></i> Agregar Mascota</button>
        <button class="btn btn-light" id="solicitarTurnoBtn" data-bs-toggle="modal" data-bs-target="#modal-veterinaria"><i class="bi bi-plus-lg text-primary"></i> Solicitar Turno</button>
        <a href="/mis-turnos" class="btn btn-light"><i class="bi bi-plus-lg text-primary"></i> Atender mis turnos</a>
        <div>
            <table class="table table-hover table-borderless mt-4 caption-top">
                <caption>Listado de turnos</caption>
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Horario</th>
                    <th scope="col">Mascota</th>
                    <th scope="col">Veterinario</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Consultorio</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody id="turnosTableBody">

                </tbody>
            </table>
            <div class="spinner-border" role="status" id="loadingSpinner"></div>
        </div>
    `;
  var turnosTableBody = document.getElementById('turnosTableBody');
  var spinner = document.getElementById('loadingSpinner');
  var modalVeterinaria = document.getElementById('modal-content-veterinaria');
  var agregarClienteBtn = document.getElementById('agregarClienteBtn');
  var agregarMascotaBtn = document.getElementById('agregarMascotaBtn');
  var solicitarTurnoBtn = document.getElementById('solicitarTurnoBtn');

  agregarClienteBtn.onclick = () => {
    modalVeterinaria.innerHTML = GetModalCliente();
  };
  agregarMascotaBtn.onclick = () => {
    modalVeterinaria.innerHTML = GetModalMascota();
  };
  solicitarTurnoBtn.onclick = () => {
    modalVeterinaria.innerHTML = GetModalTurno();
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

const GetModalTurno = () => {
  return `
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
        `;
};

const GetTurnoTable = (turnoJson) => {
  return `
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
        `;
};
// --------------------------------------------------------------------------------------

// ------------------------------------- Tienda -----------------------------------------
const EnableTienda = async () => {
  ResetMs();
  msTienda.classList.add('active');
  msName.innerHTML = 'Tienda';

  msBody.innerHTML = `
    <div>
    <a href="/add-producto" class="btn btn-light"><i class="bi bi-plus-lg text-primary"></i> Agregar Producto</a>
        <table class="table table-hover table-borderless mt-4 caption-top">
        <caption>Listado de Productos</caption>
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoria</th>
                <th scope="col">Imagen</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Rating</th>
                <th scope="col">Stock</th>
                <th scope="col">Precio</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody id="tiendaTableBody">

            </tbody>
        </table>
        <div class="spinner-border" role="status" id="loadingSpinner"></div>
    </div>
    `;
  var tiendaTableBody = document.getElementById('tiendaTableBody');
  var spinner = document.getElementById('loadingSpinner');

  var productosJson = await getProductos();
  spinner.remove();

  if (productosJson.status === 400) {
    msBody.insertAdjacentHTML(
      'beforeend',
      '<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>'
    );
    return;
  }

  productosJson.forEach((productoJson) => {
    tiendaTableBody.insertAdjacentHTML('beforeend', GetProductoTable(productoJson));

    var deleteElem = document.getElementById(productoJson.productoId);
    deleteElem.onclick = () => {
      eliminarProducto(deleteElem.id);
    };

    var editElement = document.getElementById('edit-' + productoJson.productoId);
    editElement.onclick = () => {
      editarProducto(productoJson.productoId);
    };
  });
};

const GetProductoTable = (productoJson) => {
  return `
        <tr>
            <th scope="row">${productoJson.productoId}</th>
            <td style="margin:10%">${productoJson.nombre}</td>
            <td>${productoJson.categoria}</td>
            <td>${productoJson.imagen}</td>
            <td>${productoJson.descripcion}</td>
            <td>${productoJson.rating}</td>
            <td>${productoJson.cantidadStock}</td>
            <td>${productoJson.precio}</td>
            <td>
                <div class="dropdown">
                    <div id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical d-pointer" id="tresPuntos"></i>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item d-pointer" id="edit-${productoJson.productoId}" data-bs-toggle="modal" href="#actualizarProducto" aria-controls="actualizarProducto"><i class="bi bi-pencil"></i> Editar</a></li>
                        <li><a class="dropdown-item text-danger bg-danger text-white d-pointer" id="${productoJson.productoId}"><i class="bi bi-trash"></i> Eliminar</a></li>
                    </ul>
                </div>
            </td>
        </tr>
        `;
};
// Cargo las categorias al form
document.addEventListener('DOMContentLoaded', () => {
  mostrarCategoria();
});

const mostrarCategoria = async () => {
  const data = await getCategorias();
  console.log(data);
  selectCategoria(data);
};

const selectCategoria = (data) => {
  data.forEach((opciones) => {
    var categoria = document.getElementById('categoria');
    let element = document.createElement('option');
    element.value = opciones.categoriaId;
    element.innerHTML = opciones.descripcion;
    categoria.appendChild(element);
  });
};

const editarProducto = async (id) => {
  var formActualizar = document.getElementById('formActualizar-producto');
  var btnSubmit = document.getElementById('btn-submit');
  formActualizar.addEventListener('submit', function (e) {
    e.preventDefault();

    btnSubmit.innerHTML = `<button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Actualizando...
    </button>`;

    let nombre = formActualizar.elements.nombre.value;
    let categoria = formActualizar.elements.categoria.value;
    let imagen = formActualizar.elements.imagen.value;
    let descripcion = formActualizar.elements.descripcion.value;
    let rating = formActualizar.elements.rating.value;
    let stock = formActualizar.elements.cantidadStock.value;
    let precio = formActualizar.elements.precio.value;

    let datos = {
      nombre: nombre,
      categoria: categoria,
      imagen: imagen,
      descripcion: descripcion,
      rating: rating,
      cantidadStock: stock,
      precio: precio
    };

    let datosJson = JSON.stringify(datos);
    console.log(datosJson);

    try {
      fetch('http://localhost:27459/api/Producto/' + id, {
        method: 'PUT',
        body: datosJson,

        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
        .then((response) => {
          response.json();
          console.log(response);
          if (response.status === 204) {
            formActualizar.innerHTML = `   <div class="card text-center p-0 my-2 ">
                    <div class="card-header bg-transparent text-success border-0">
                        <i class="far fa-check-circle display-4 d-block"></i>
                        <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text lead">El Producto se ha actualizado con éxito.</p>
                    </div>
                </div> `;
            EnableTienda();
          }
          if (response.status == 400) {
            formActualizar.innerHTML = ` <div class="card text-center p-0 my-2 ">
                    <div class="card-header bg-transparent text-danger border-0">
                    <i class="fas fa-exclamation-triangle"></i>
                        <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text lead">El Producto no se ha actualizado.</p>
                    </div>
                </div>  `;
            EnableTienda();
          }
        })
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  });
};

const eliminarProducto = async (id) => {
  try {
    const response = await fetch('http://localhost:27459/api/Producto/' + id, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      alert('Se elimino correctamente el producto');
      EnableTienda();
    } else {
      alert('No se pudo eliminar el producto');
      EnableTienda();
    }
  } catch (error) {}
};

// ----------------------------------------------------------------------------------

// ----------------------------------- Adopciones ---------------------------------------
const EnableAdopciones = async () => {
  ResetMs();
  msAdopciones.classList.add('active');
  msName.innerHTML = 'Adopciones';
  msBody.innerHTML = `
    <button class="btn btn-light" id="agregarAnimalBtn" data-bs-toggle="modal" data-bs-target="#modal-adopciones"><i class="bi bi-plus-lg text-primary"></i> Agregar animal</button>
    <div>
        <table class="table table-hover table-borderless mt-4 caption-top">
            <caption>Listado de animales en adopcion</caption>
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Imagen</th>
                <th scope="col">Tipo Animal</th>
                <th scope="col">Peso</th>
                <th scope="col">Edad</th>
                <th scope="col">Adoptado</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody id="adopcionesTableBody">

            </tbody>
        </table>
        <div class="spinner-border" role="status" id="loadingSpinner"></div>
    </div>
    `;
  var spinner = document.getElementById('loadingSpinner');
  var adopcionesTableBody = document.getElementById('adopcionesTableBody');
  var agregarAnimalBtn = document.getElementById('agregarAnimalBtn');
  var adoptablesJson = await getAdoptables();
  var tiposMascotaJson = await getTiposMascota(); // sin validar
  spinner.remove();

  agregarAnimalBtn.onclick = () => {
    modalAdopciones.innerHTML = GetModalAdopciones();
    // agrego tipo mascota al form-select
    var tipoMascotaElem = document.getElementById('adoptableTipoMascota');
    tiposMascotaJson.forEach((tipoMascotaJson) => {
      tipoMascotaElem.insertAdjacentHTML(
        'beforeend',
        `<option>${tipoMascotaJson.tipoAnimal}</option>`
      );
    });

    // registro mascota
    var registrarMascotaBtn = document.getElementById('registrarMascotaBtn');
    registrarMascotaBtn.onclick = (e) => {
      e.preventDefault();
      registrarAdoptable(tiposMascotaJson);
    };
  };

  if (adoptablesJson.status === 400) {
    msBody.insertAdjacentHTML(
      'beforeend',
      '<div class="alert alert-danger">Error al obtener los adoptantes de la base de datos</div>'
    );
    return;
  }

  adoptablesJson.forEach((adoptableJson) => {
    adopcionesTableBody.insertAdjacentHTML(
      'beforeend',
      GetAdoptableTable(adoptableJson)
    );
  });
};

const registrarAdoptable = async (tiposMascotaJson) => {
  var adoptableNombre = document.getElementById('adoptableNombre');
  var adoptableImagen = document.getElementById('adoptableImagen');
  var adoptableHistoria = document.getElementById('adoptableHistoria');
  var adoptableTipoMascota = document.getElementById('adoptableTipoMascota');
  var adoptablePeso = document.getElementById('adoptablePeso');
  var adoptableEdad = document.getElementById('adoptableEdad');

  var tipoMascotaId = 1;
  tiposMascotaJson.forEach((tipoMascotaJson) => {
    if (tipoMascotaJson.tipoAnimal === adoptableTipoMascota.value) {
      tipoMascotaId = tipoMascotaJson.tipoAnimalId;
    }
  });

  var data = {
    TipoAnimalId: tipoMascotaId,
    adoptado: false,
    edad: parseInt(adoptableEdad.value),
    historia: adoptableHistoria.value,
    imagen: adoptableImagen.value,
    nombre: adoptableNombre.value,
    peso: parseInt(adoptablePeso.value)
  };

  var response = await addAdoptable(data);
  if (response.status === 400) {
    // modal error
    modalAdopciones.innerHTML = `
        <div class="card text-center p-0 my-2 ">
            <div class="card-header bg-transparent text-danger border-0">
                <i class="far fa-check-circle display-4 d-block"></i>
                <h5 class="card-title text-danger display-4 d-block">Registro fallido</h5>
            </div>
            <div class="card-body">
                <p class="card-text lead">Hubo un error al agregar la mascota como adoptable.</p>
            </div>
        </div>
        `;
    return;
  }

  // modal exito
  modalAdopciones.innerHTML = `
    <div class="card text-center p-0 my-2 ">
        <div class="card-header bg-transparent text-success border-0">
            <i class="far fa-check-circle display-4 d-block"></i>
            <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
        </div>
        <div class="card-body">
            <p class="card-text lead">La mascota adoptable fue agregada con exito.</p>
        </div>
    </div>
    `;
};

const GetAdoptableTable = (adoptableJson) => {
  return `
        <tr>
            <th scope="row">${adoptableJson.mascotaId}</th>
            <td style="margin:10%">${adoptableJson.nombre}</td>
            <td>${adoptableJson.imagen.slice(0, 16)}</td>
            <td>${adoptableJson.tipoAnimal}</td>
            <td>${adoptableJson.peso}</td>
            <td>${adoptableJson.edad}</td>
            <td>${adoptableJson.adoptado}</td>
            <td>
                <div class="dropdown">
                    <div id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical d-pointer" id="tresPuntos"></i>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item d-pointer" id="edit-${
                          adoptableJson.mascotaId
                        }"><i class="bi bi-pencil"></i> Editar</a></li>
                        <li><a class="dropdown-item text-danger bg-danger text-white d-pointer" id="${
                          adoptableJson.mascotaId
                        }"><i class="bi bi-trash"></i> Eliminar</a></li>
                    </ul>
                </div>
            </td>
        </tr>
        `;
};

const GetModalAdopciones = () => {
  return `
        <div class="modal-header">
        <h5 class="modal-title">Registrar una animal para Adopcion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="row g-3" id="registro">
        <div class="col-md-6">
            <label for="validationDefault01" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="adoptableNombre" required>
        </div>
        <div class="col-md-6">
            <label for="validationDefault02" class="form-label">Imagen</label>
            <input type="text" class="form-control" id="adoptableImagen"  required>
        </div>
        
        <div class="col-md-6">
            <label for="validationDefault03" class="form-label">Historia</label>
            <textarea class="form-control" id="adoptableHistoria" style="height: 200;" required></textarea>
            
        </div>
        <div class="col-md-2">
            <label for="validationDefault04" class="form-label">Tipo Animal</label>
            <select class="form-select" id="adoptableTipoMascota" required>
            <option selected disabled value="">Seleccione...</option>
            
            </select>
        </div>
        <div class="col-md-2">
            <label for="validationDefault05" class="form-label">Peso</label>
            <input type="number" class="form-control" id="adoptablePeso" required>
        </div>
        <div class="col-md-2">
            <label for="validationDefault06" class="form-label">Edad</label>
            <input type="number" class="form-control" id="adoptableEdad" required>
        </div>
        
        <div class="col-12">
            <button class="btn btn-primary" id="registrarMascotaBtn">Registrar</button>
        </div>
        </form>
      </div>
        `;
};

// ----------------------------------------------------------------------------------

// ----------------------------------- Otro ---------------------------------------
const ResetMs = () => {
  msVeterinaria.classList.remove('active');
  msTienda.classList.remove('active');
  msAdopciones.classList.remove('active');
  msBody.innerHTML = '';
};

// ----------------------------------------------------------------------------------
