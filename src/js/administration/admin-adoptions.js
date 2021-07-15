import { getMascotas, getTiposMascota, addAdoptable, updateMascota, deleteMascota, getPosiblesAdoptantes } from "./adminActions.js"

var msBody              = document.getElementById("msBody")
var modalAdopciones     = document.getElementById("modal-content-adopciones")
var spinner             = document.getElementById("loadingSpinner")
var spinnerAdoptantes   = document.getElementById("spinnerAdoptantes")
var adopcionesTableBody = document.getElementById("adopcionesTableBody")
var adoptantesTableBody = document.getElementById("adoptantesTableBody")
var agregarAnimalBtn    = document.getElementById("agregarAnimalBtn")
var formActualizarAnimal    = document.getElementById('formActualizarAnimal');
var formActualizarAdoptante  = document.getElementById('formActualizarAdoptante');
var tiposMascotaJson

window.onload = async () => { adminAdoptions()}

const adminAdoptions = async () => {
    spinner.style.display = 'none'
    spinnerAdoptantes.style.display = 'none'
    adopcionesTableBody.innerHTML = ""
    adoptantesTableBody.innerHTML = ""
    tiposMascotaJson = await getTiposMascota()

    agregarAnimalBtn.onclick = () => {
        modalAdopciones.innerHTML = getModalAdopciones()
        // agrego tipo mascota al form-select
        var tipoMascotaElem = document.getElementById("adoptableTipoMascota")
        tiposMascotaJson.forEach((tipoMascotaJson) => {
            tipoMascotaElem.insertAdjacentHTML('beforeend', `<option>${tipoMascotaJson.tipoAnimal}</option>`)
        })

        // registro mascota
        var registrarMascotaBtn = document.getElementById("registrarMascotaBtn")
        registrarMascotaBtn.onclick = (e) => {
            e.preventDefault()
            registrarAdoptable()
        }
    }

    var adoptablesJson = await getMascotas()
    var posiblesAdoptantesJson = await getPosiblesAdoptantes()
    
    if (adoptablesJson.status === 400) {
        msBody.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener las mascotas de la base de datos</div>')
        return
    }
    if (posiblesAdoptantesJson.status === 400) {
        msBody.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los adoptantes de la base de datos</div>')
        return
    }

    adoptablesJson.forEach((adoptableJson) => {
        adopcionesTableBody.insertAdjacentHTML('beforeend', getAdoptableTable(adoptableJson))

        var deleteElem = document.getElementById(`delete-` + adoptableJson.mascotaId)
        deleteElem.onclick = () => {
            deleteAnimal(adoptableJson.mascotaId);
        };

        var editElement = document.getElementById('edit-' + adoptableJson.mascotaId);
        editElement.onclick = () => {
            editAnimal(adoptableJson);
        }
    })

    posiblesAdoptantesJson.forEach((adoptantesJson) => {
        adoptantesTableBody.insertAdjacentHTML('beforeend', getPosiblesAdoptantesTable(adoptantesJson))

        var editElement = document.getElementById('aceptar-' + adoptantesJson.adoptanteId);
        
        editElement.onclick = () => {
            editAdoptante(adoptantesJson);
        }
    })
}

const registrarAdoptable = async () => {
  var adoptableNombre = document.getElementById('adoptableNombre');
  var adoptableImagen = document.getElementById('adoptableImagen');
  var adoptableHistoria = document.getElementById('adoptableHistoria');
  var adoptablePeso = document.getElementById('adoptablePeso');
  var adoptableEdad = document.getElementById('adoptableEdad');

  let tipoMascotaId = await getTipoMascotaId(adoptableTipoMascota.value);

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
    location.href="/admin/adoptions"
};

const editAnimal = async (animalJson) => {
  formActualizarAnimal.innerHTML = getActualizarForm();

  let nombreAnimal = document.getElementById('nombreAnimal');
  let adoptadoAnimal = document.getElementById('adoptadoAnimal');
  let imagenAnimal = document.getElementById('imagenAnimal');
  let pesoAnimal = document.getElementById('pesoAnimal');
  let edadAnimal = document.getElementById('edadAnimal');
  let historiaAnimal = document.getElementById('historiaAnimal');

  // inserto tipo mascota en selects
  let tipoAnimalSelect = document.getElementById('tipoAnimal');
  tiposMascotaJson.forEach((tipo) => {
    tipoAnimalSelect.insertAdjacentHTML(
      'beforeend',
      `<option>${tipo.tipoAnimal}</option>`
    );
  });

  // Cargo valores de la mascota que se esta editando en el form
  nombreAnimal.value = animalJson.nombre;
  adoptadoAnimal.value = animalJson.adoptado ? 'Si' : 'No';
  imagenAnimal.value = animalJson.imagen;
  pesoAnimal.value = animalJson.peso;
  edadAnimal.value = animalJson.edad;
  historiaAnimal.value = animalJson.historia;
  tipoAnimalSelect.value = tiposMascotaJson[animalJson.tipoAnimalId - 1].tipoAnimal;

  document.getElementById('editSubmitBtn').onclick = async (e) => {
    e.preventDefault();
    let tipoMascotaId = await getTipoMascotaId(tipoAnimalSelect.value);

    let dataJson = {
      mascotaId: animalJson.mascotaId,
      tipoAnimal: document.getElementById('tipoAnimal').value,
      tipoAnimalId: tipoMascotaId,
      adoptado: adoptadoAnimal.value === 'Si' ? true : false,
      imagen: imagenAnimal.value,
      nombre: nombreAnimal.value,
      historia: historiaAnimal.value,
      edad: parseInt(edadAnimal.value),
      peso: parseInt(pesoAnimal.value)
    };

    var response = await updateMascota(dataJson);
    if (response.status == 400) {
      formActualizarAnimal.innerHTML = ` 
            <div class="card text-center p-0 my-2 ">
                <div class="card-header bg-transparent text-danger border-0">
                <i class="fas fa-exclamation-triangle"></i>
                    <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
                </div>
                <div class="card-body">
                    <p class="card-text lead">El Producto no se ha actualizado.</p>
                </div>
            </div>  
            `;
    }
    document.getElementById('actualizarAnimalCloseBtn').click();
    adminAdoptions();
  };
};

const deleteAnimal = async (id) => {
  var response = await deleteMascota(id);

  // todo: cambiar por mejor forma de mostrar los mensajes
  if (response.status === 400) {
    alert('No se pudo eliminar la mascota');
    adminAdoptions();
    return;
  }
  alert('Se elimino correctamente la mascota');
  adminAdoptions();
};

const getAdoptableTable = (adoptableJson) => {
  return `
        <tr>
            <th scope="row">${adoptableJson.mascotaId}</th>
            <td style="margin:10%">${adoptableJson.nombre}</td>
            <td>${adoptableJson.imagen.slice(0, 16)}</td>
            <td>${tiposMascotaJson[adoptableJson.tipoAnimalId - 1].tipoAnimal}</td>
            <td>${adoptableJson.peso}</td>
            <td>${adoptableJson.edad}</td>
            <td>${adoptableJson.adoptado ? 'Si' : 'No'}</td>
            <td>
                <div class="dropdown">
                    <div id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical d-pointer" id="tresPuntos"></i>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item d-pointer" id="edit-${
                      adoptableJson.mascotaId
                    }" data-bs-toggle="modal" href="#actualizarAnimal" aria-controls="actualizarAnimal"><i class="bi bi-pencil"></i> Editar</a></li>
                    <li><a class="dropdown-item text-danger bg-danger text-white d-pointer" id="delete-${
                      adoptableJson.mascotaId
                    }"><i class="bi bi-trash"></i> Eliminar</a></li>
                </ul>
                </div>
            </td>
        </tr>
        `;
};

const getPosiblesAdoptantesTable = (adoptantesJson) => {
    return (
        `
        <tr>
            <th scope="row">${adoptantesJson.adoptanteId}</th>
            <th>${adoptantesJson.nombre}&nbsp;${adoptantesJson.apellido}</th>
            <td>${adoptantesJson.dni}</td>
            <td>${adoptantesJson.direccion}</td>
            <td>${adoptantesJson.telefono}</td>
            <td>${adoptantesJson.email}</td>
            <td>${adoptantesJson.nombreAnimal}</td>
        </tr>
        `
    )
}


/* <td>
                <div class="dropdown">
                    <div id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical d-pointer" id="tresPuntos"></i>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item d-pointer" id="aceptar-${adoptantesJson.adoptanteId}" data-bs-toggle="modal" href="#actualizarAdoptante" aria-controls="actualizarAdoptante"><i class="bi bi-pencil"></i>Aceptar</a></li>
                </ul>
                </div>
            </td> */

const getTipoMascotaId = async (mascotaTipo) => {
  var tipoMascotaId = 1;
  tiposMascotaJson.forEach((tipoMascotaJson) => {
    if (tipoMascotaJson.tipoAnimal === mascotaTipo) {
      tipoMascotaId = tipoMascotaJson.tipoAnimalId;
    }
  });

  return tipoMascotaId;
};

const getModalAdopciones = () => {
  return `
        <div class="modal-header">
        <h5 class="modal-title">Registrar una animal para Adopcion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="row g-3" id="registro">
        <div class="col-md-6">
            <label for="adoptableNombre" class="form-label ">Nombre</label>
            <input type="text" class="form-control" id="adoptableNombre" required>
        </div>
        <div class="col-md-6">
            <label for="validationDefault02" class="form-label">Imagen</label>
            <input type="text" class="form-control" id="adoptableImagen"  required>
        </div>
        
        <div class="col-md-6">
            <label for="validationDefault03" class="form-label">Historia</label>
            <textarea class="form-control border rounded-3" id="adoptableHistoria" style="height: 200; margin-left:12px;" required></textarea>
            
        </div>
        <div class="col-md-2">
            <label for="validationDefault04" class="form-label">Tipo</label>
            <select class="form-select" id="adoptableTipoMascota" required>
            <option selected disabled value="">...</option>
            
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

const getActualizarForm = () => {
  return `
        <div class="form-floating">       
          <input type="text" class="form-control" id="nombreAnimal" name="nombre" placeholder="Nombre" required>
          <label for="nombreAnimal" class="label-floating-modal">Nombre</label> 
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese un Nombre.
          </div>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" id="imagenAnimal" name="imagen animal" placeholder="imagen" required>
          <label for="imagenAnimal" class="label-floating-modal">Imagen</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese una Imagen.
          </div>
        </div>

        <div class="form-floating">
            <select class="form-select" name="tipo animal" id="tipoAnimal" aria-label="Floating label select example" required>
                <option value="" disabled selected>Elija una opcion</option>
            </select>
            <label for="tipoAnimal" class="label-floating-modal">Tipo Animal</label>
            <div class="valid-feedback">
            Bien!
            </div>
            <div class="invalid-feedback">
            Por favor elija una opcion valida..
            </div>
        </div>

        <div class="form-floating">
        <div class="mb-3">
            <label for="historiaAnimal" class="form-label">Historia</label>
            <textarea class="form-control" id="historiaAnimal" rows="3"></textarea>
        </div>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingresa la historia de animal.
          </div>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control w-25" id="pesoAnimal" name="peso" placeholder="Peso animal" min="1" max="100" required>
          <label for="pesoAnimal" class="label-floating-modal">Peso</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese un peso valido mayor que cero.
          </div>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control  w-25" id="edadAnimal" name="edad" placeholder="Edad" min="0" max="50" required>
          <label for="edadAnimal" class="label-floating-modal">Edad</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese la edad del animal.
          </div>
        </div>

        <div class="form-floating">
        <select class="form-select w-25" name="adoptado" id="adoptadoAnimal" aria-label="Floating label select example" required>
          <option>Si</option>
          <option>No</option>
        </select>
        <label for="adoptadoAnimal" class="label-floating-modal">Adoptado</label>
        <div class="valid-feedback">
          Bien!
        </div>
        <div class="invalid-feedback">
          Por favor elija una opcion valida..
        </div>
      </div>

        <div class="form-floating">
          <button type="submit" class="btn btn-primary mx-3 my-3 w-100" id="editSubmitBtn">Actualizar</button>
        </div>  `
}

const editAdoptante = async (adoptanteJson) => {
    formActualizarAdoptante.innerHTML = getActualizarFormAdoptante()

    let adoptadoAnimal = document.getElementById('adoptadoAnimal')

    adoptadoAnimal.value = animalJson.adoptado ? "Si": "No"

    document.getElementById('editSubmitBtn').onclick = async (e) => {
        e.preventDefault()

        var response = await updateMascota(dataJson)
        if (response.status == 400) {
            formActualizarAnimal.innerHTML = 
            ` 
            <div class="card text-center p-0 my-2 ">
                <div class="card-header bg-transparent text-danger border-0">
                <i class="fas fa-exclamation-triangle"></i>
                    <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
                </div>
                <div class="card-body">
                    <p class="card-text lead">El Producto no se ha actualizado.</p>
                </div>
            </div>  
            `
        }
        document.getElementById("actualizarAdoptanteCloseBtn").click()
        adminAdoptions()
    }
}

const getActualizarFormAdoptante = () => {
    return (
        `
        <div class="form-floating">
        <select class="form-select" name="adoptado" id="adoptadoAnimal" aria-label="Floating label select example" required>
          <option>Si</option>
          <option>No</option>
        </select>
        <label for="adoptadoAnimal">¿Aceptar adopción?</label>
        <div class="valid-feedback">
          Bien!
        </div>
        <div class="invalid-feedback">
          Por favor elija una opcion valida..
        </div>
      </div>

        <div class="form-floating">
          <button type="submit" class="btn btn-primary mx-3 my-3 w-100" id="editSubmitBtn">Actualizar</button>
        </div>  `
    )
}
