import { getTurnos } from "./administrationActions.js"
import { getProductos } from '../store/productActions.js'

var msBody = document.getElementById("msBody")
var msVeterinaria = document.getElementById("msVeterinaria")
var msTienda = document.getElementById("msTienda")
var msAdopciones = document.getElementById("msAdopciones")
var msName = document.getElementById("msName")

window.onload = async() => {
    msVeterinaria.onclick = ()  => {EnableVeterinaria()}
    msTienda.onclick = ()       => {EnableTienda()}
    msAdopciones.onclick = ()   => {EnableAdopciones()}

    msBody.innerHTML = 
    `
        <div class="h1 text-center"><i class="bi bi-arrow-left"></i> Selecciona un microservicio</div>
    `
}

// ----------------------------------- Veterinaria ---------------------------------------
const EnableVeterinaria = async () => {
    ResetMs()
    msVeterinaria.classList.add("active")
    msName.innerHTML = "Veterinaria"
    msBody.innerHTML = `
        <button class="btn btn-light"><i class="bi bi-plus-lg text-primary"></i> Agregar Cliente</button>
        <button class="btn btn-light"><i class="bi bi-plus-lg text-primary"></i> Agregar Mascota</button>
        <button class="btn btn-light"><i class="bi bi-plus-lg text-primary"></i> Solicitar Turno</button>
        
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
    `
    var turnosTableBody = document.getElementById("turnosTableBody")
    var spinner = document.getElementById("loadingSpinner")

    var turnosJson = await getTurnos()
    spinner.remove()

    if (turnosJson === null) {
        msBody.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los turnos de la base de datos</div>')
        return
    }

    turnosJson.forEach((turnoJson) => {
        turnosTableBody.insertAdjacentHTML('beforeend', GetTurnoTable(turnoJson))
    })
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

// ----------------------------------------------------------------------------------

// ----------------------------------- Tienda ---------------------------------------
const EnableTienda = async () => {
    ResetMs()
    msTienda.classList.add("active")
    msName.innerHTML = "Tienda"

    msBody.innerHTML = `
    <div>
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
    `
    var tiendaTableBody = document.getElementById("tiendaTableBody")
    var spinner = document.getElementById("loadingSpinner")

    var productosJson = await getProductos()
    spinner.remove()

    if (productosJson === null) {
        msBody.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>')
        return
    }

    productosJson.forEach((productoJson) => {
        tiendaTableBody.insertAdjacentHTML('beforeend', GetProductoTable(productoJson))
    })
}


const GetProductoTable = (productoJson) => {
    return (
        `
        <tr>
            <th scope="row">${productoJson.productoId}</th>
            <td>${productoJson.nombre}</td>
            <td>${productoJson.categoria}</td>
            <td>${productoJson.imagen}</td>
            <td>${productoJson.descripcion}</td>
            <td>${productoJson.rating}</td>
            <td>${productoJson.cantidadStock}</td>
            <td>${productoJson.precio}</td>
            <td>
                <div class="dropdown">
                    <div id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical d-pointer"></i>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item d-pointer" id="${productoJson.productoId}" data-bs-toggle="modal" href="#actualizarProducto" aria-controls="actualizarProducto"><i class="bi bi-pencil"></i> Editar</a></li>
                        <li><a class="dropdown-item text-danger bg-danger text-white d-pointer" id="${productoJson.productoId}"><i class="bi bi-trash"></i> Eliminar</a></li>
                    </ul>
                </div>
            </td>
        </tr>
        `
    )
}
// Cargo las categorias al form
document.addEventListener('DOMContentLoaded', () => {
    mostrarCategoria();
  });
  
  const mostrarCategoria = async () => {
    try {
      const res = await fetch('http://localhost:27459/api/Categoria');
      const data = await res.json();
      console.log(data);
      selectCategoria(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const selectCategoria = data => {
    data.forEach(opciones => {
      var categoria = document.getElementById('categoria');
      let element = document.createElement('option');
      element.value = opciones.categoriaId;
      element.innerHTML = opciones.descripcion;
      categoria.appendChild(element);
    });
  }
  //Envio el form
    var formActualizar = document.getElementById('formActualizar-producto');


    formActualizar.addEventListener('submit', function(e){
        e.preventDefault(); 

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
            precio: precio,
        }
        
        let datosJson = JSON.stringify(datos)
        console.log(datosJson)
        
        try {
            fetch('http://localhost:27459/api/Producto', {
                method: 'PUT',
                body: datosJson,
                
                headers:{
                    'Content-Type': 'application/json;charset=UTF-8'
                    }
            }).then((response) => {
                response.json();
                console.log(response)
                if(response.status === 204){
                    formulario.innerHTML = `   <div class="card text-center p-0 my-2 ">
                    <div class="card-header bg-transparent text-success border-0">
                      <i class="far fa-check-circle display-4 d-block"></i>
                      <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
                    </div>
                    <div class="card-body">
                      <p class="card-text lead">El Producto se ha registrado con éxito.</p>
                      <a href="/home" class="btn btn-primary m-auto">Ir al menu </a>
                      <a href="/add-producto" class="btn btn-primary m-auto">Cargar otro Producto </a>
                    </div>
                  </div> `;
                }
                if (response.status == 400) {
                    formulario.innerHTML = ` <div class="card text-center p-0 my-2 ">
                    <div class="card-header bg-transparent text-danger border-0">
                    <i class="fas fa-exclamation-triangle"></i>
                      <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
                    </div>
                    <div class="card-body">
                      <p class="card-text lead">El Producto no se ha registrado.</p>
                      <a href="/home" class="btn btn-danger m-auto">Ir al menu </a>
                      <a href="/add-producto" class="btn btn-danger m-auto">Cargar otro Producto </a>
                    </div>
                  </div>  `;
                  }
            }).then(data => console.log(data))
            
        } catch (error) {
            console.log(error)
        }
    });


// ----------------------------------------------------------------------------------


// ----------------------------------- Adopciones ---------------------------------------
const EnableAdopciones = () => {
    ResetMs()
    msAdopciones.classList.add("active")
    msName.innerHTML = "Adopciones"

}

// ----------------------------------------------------------------------------------


// ----------------------------------- Otro ---------------------------------------
const ResetMs = () => {
    msVeterinaria.classList.remove("active")
    msTienda.classList.remove("active")
    msAdopciones.classList.remove("active")
    msBody.innerHTML = ""
}


// ----------------------------------------------------------------------------------
