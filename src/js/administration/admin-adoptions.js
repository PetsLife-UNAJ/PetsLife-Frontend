import { getAdoptables, getTiposMascota, addAdoptable } from "./adminActions.js"

var msBody              = document.getElementById("msBody")
var modalAdopciones     = document.getElementById("modal-content-adopciones")
var spinner             = document.getElementById("loadingSpinner")
var adopcionesTableBody = document.getElementById("adopcionesTableBody")
var agregarAnimalBtn    = document.getElementById("agregarAnimalBtn")


window.onload = async () => {
    var tiposMascotaJson = await getTiposMascota()
    spinner.remove()

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
            registrarAdoptable(tiposMascotaJson)
        }
    }

    var adoptablesJson = await getAdoptables()
    if (adoptablesJson.status === 400) {
        msBody.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los adoptantes de la base de datos</div>')
        return
    }

    adoptablesJson.forEach((adoptableJson) => {
        adopcionesTableBody.insertAdjacentHTML('beforeend', getAdoptableTable(adoptableJson))
    })
}

const registrarAdoptable = async (tiposMascotaJson) => {
    var adoptableNombre         = document.getElementById("adoptableNombre")
    var adoptableImagen         = document.getElementById("adoptableImagen")
    var adoptableHistoria       = document.getElementById("adoptableHistoria")
    var adoptableTipoMascota    = document.getElementById("adoptableTipoMascota")
    var adoptablePeso           = document.getElementById("adoptablePeso")
    var adoptableEdad           = document.getElementById("adoptableEdad")

    var tipoMascotaId = 1
    tiposMascotaJson.forEach((tipoMascotaJson) => {
        if (tipoMascotaJson.tipoAnimal === adoptableTipoMascota.value) {
            tipoMascotaId = tipoMascotaJson.tipoAnimalId
        }
    })

    var data = {
        TipoAnimalId : tipoMascotaId,
        adoptado: false,
        edad: parseInt(adoptableEdad.value),
        historia: adoptableHistoria.value,
        imagen: adoptableImagen.value,
        nombre: adoptableNombre.value,
        peso: parseInt(adoptablePeso.value)
    }

    var response = await addAdoptable(data)
    if (response.status === 400) {
        // modal error
        modalAdopciones.innerHTML = 
        `
        <div class="card text-center p-0 my-2 ">
            <div class="card-header bg-transparent text-danger border-0">
                <i class="far fa-check-circle display-4 d-block"></i>
                <h5 class="card-title text-danger display-4 d-block">Registro fallido</h5>
            </div>
            <div class="card-body">
                <p class="card-text lead">Hubo un error al agregar la mascota como adoptable.</p>
            </div>
        </div>
        `
        return
    }
    
    // modal exito
    modalAdopciones.innerHTML = 
    `
    <div class="card text-center p-0 my-2 ">
        <div class="card-header bg-transparent text-success border-0">
            <i class="far fa-check-circle display-4 d-block"></i>
            <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
        </div>
        <div class="card-body">
            <p class="card-text lead">La mascota adoptable fue agregada con exito.</p>
        </div>
    </div>
    `
}

const getAdoptableTable = (adoptableJson) => {
    return (
        `
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
                        <li><a class="dropdown-item d-pointer" id="edit-${adoptableJson.mascotaId}"><i class="bi bi-pencil"></i> Editar</a></li>
                        <li><a class="dropdown-item text-danger bg-danger text-white d-pointer" id="${adoptableJson.mascotaId}"><i class="bi bi-trash"></i> Eliminar</a></li>
                    </ul>
                </div>
            </td>
        </tr>
        `
    )
}

const getModalAdopciones = () => {
    return (
        `
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
        `
    )
}
