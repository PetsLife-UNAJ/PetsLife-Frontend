import { getProductos, getCategorias, updateProductoById, deleteProductoById} from '../store/productActions.js'

var msBody              = document.getElementById("msBody")
var tiendaTableBody     = document.getElementById("tiendaTableBody")
var spinner             = document.getElementById("loadingSpinner")
var formActualizar      = document.getElementById('formActualizar-producto');

window.onload = async () => {
    var productosJson = await getProductos()
    spinner.remove()

    if (productosJson.status === 400) {
        msBody.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>')
        return
    }

    productosJson.forEach((productoJson) => {
        tiendaTableBody.insertAdjacentHTML('beforeend', GetProductoTable(productoJson));

        var deleteElem = document.getElementById(productoJson.productoId)
        deleteElem.onclick = () => {
            eliminarProducto(deleteElem.id);
        };

        var editElement = document.getElementById('edit-'+productoJson.productoId);
        editElement.onclick = () => {
            editarProducto(productoJson.productoId);
        }
    });
}


const GetProductoTable = (productoJson) => {
    return (
        `
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
        `
    )
}

const mostrarCategoria = async () => {
    const data = await getCategorias()

    data.forEach(opciones => {
        var categoria = document.getElementById('categoria');
        let element = document.createElement('option');
        element.value = opciones.categoriaId;
        element.innerHTML = opciones.descripcion;
        categoria.appendChild(element);
    });
}

const editarProducto = async (id) => {
    formActualizar.innerHTML = getActualizarForm()

    await mostrarCategoria()

    formActualizar.addEventListener('submit', (e) => {
        e.preventDefault();
        actualizarProducto(id)
      
    })
}

const actualizarProducto = async (id) => {
    var btnSubmit = document.getElementById('btn-submit');

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

    let datosJson = {
        nombre: nombre,
        categoria: categoria,
        imagen: imagen,
        descripcion: descripcion,
        rating: rating,
        cantidadStock: stock,
        precio: precio,
    }
    var updatedProducto = await updateProductoById(id, datosJson)

    if (updatedProducto.status === 400) {
        // fail update
        formActualizar.innerHTML = 
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
        return
    }

    // success update
    formActualizar.innerHTML = 
    `   
    <div class="card text-center p-0 my-2 ">
        <div class="card-header bg-transparent text-success border-0">
            <i class="far fa-check-circle display-4 d-block"></i>
            <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
        </div>
        <div class="card-body">
            <p class="card-text lead">El Producto se ha actualizado con éxito.</p>
        </div>
    </div> 
    `
}

const eliminarProducto = async (id) => {

    var response = await deleteProductoById(id)

    // todo: cambiar por mejor forma de mostrar los mensajes
    if (response.status === 400) {
        alert('No se pudo eliminar el producto')
        return
    }
    alert('Se elimino correctamente el producto');
}

const getActualizarForm = () => {
    return (
        `
        <div class="form-floating">         
                  <input type="text" class="form-control" id="nom" name="nombre" placeholder="Nombre">
                  <label for="nom"><p id="nombrep">Nombre</p></label>   
                </div>
      
                <div class="form-floating">
                  <select class="form-select" name="categoria" id="categoria" aria-label="Floating label select example">
                    <option value="" disabled selected>Elija una opcion</option>
                  </select>
                  <label for="categoria">Categoria</label>
                </div>
      
                <div class="form-floating">
                  <input type="text" class="form-control" id="imagen" name="imagen" placeholder="imagen" >
                  <label for="imagen">Imagen</label>
                </div>
      
                <div class="form-floating">
                  <input type="text" class="form-control" id="descripcion" name="descripcion" placeholder="descripcion">
                  <label for="descripcion">Descripcion</label>
                </div>
      
                <div class="form-floating">
                  <input type="number" class="form-control" id="rating" name="rating" placeholder="Rating" >
                  <label for="rating">Rating</label>
                </div>
      
                <div class="form-floating">
                  <input type="number" class="form-control" id="stock" name="cantidadStock" placeholder="Stock" >
                  <label for="stock">Stock</label>
                </div>
      
                <div class="form-floating">
                  <input type="number" class="form-control" id="precio" name="precio" placeholder="Precio" >
                  <label for="precio">Precio</label>
                </div>

                <div class="form-floating">
                  <button type="submit" class="btn btn-primary mb-3" id="btn-submit">Actualizar</button>
                </div>
                `
    )
}