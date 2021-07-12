import { getProductos, getCategorias, updateProductoById, deleteProductoById} from '../store/productActions.js'

var msBody              = document.getElementById("msBody")
var tiendaTableBody     = document.getElementById("tiendaTableBody")
var spinner             = document.getElementById("loadingSpinner")
//var formActualizar      = document.getElementById('formActualizar-producto');
var modales = document.getElementById('modales');

window.onload = async () => { adminStore() }

const adminStore = async () => {
  debugger;
  tiendaTableBody.innerHTML = " ";
  var productosJson = await getProductos()
  spinner.style.display = 'none'

    if (productosJson.status === 400) {
        msBody.innerHTML = `<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>`;
        return
    }

    productosJson.forEach( (productoJson) => { 
      tiendaTableBody.insertAdjacentHTML('beforeend', GetProductoTable(productoJson));

      modales.insertAdjacentHTML('beforeend', getModalProducto(productoJson)); 

        var deleteElem = document.getElementById(`delete-` + productoJson.productoId)
        deleteElem.onclick = () => {
            eliminarProducto(productoJson.productoId);
        };

        var editElement = document.getElementById('edit-' + productoJson.productoId);
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
                        <li><a class="dropdown-item d-pointer" id="edit-${productoJson.productoId}" data-bs-toggle="modal" href="#actualizarProducto-${productoJson.productoId}" aria-controls="actualizarProducto-${productoJson.productoId}"><i class="bi bi-pencil"></i> Editar</a></li>
                        <li><a class="dropdown-item text-danger bg-danger text-white d-pointer" id="delete-${productoJson.productoId}"><i class="bi bi-trash"></i> Eliminar</a></li>
                    </ul>
                </div>
            </td>
        </tr>
        `
    )
}

const getModalProducto = (product) => {
  return (
    `
    <div class="modal fade" id="actualizarProducto-${product.productoId}" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Actualizar Producto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form class="needs-validation" id="formActualizar-producto-${product.productoId}" novalidate>
            <div class="form-floating">       
            <input type="text" class="form-control" id="nom" name="nombre" placeholder="Nombre" value="${product.nombre}" required>
            <label for="nom">Nombre</label> 
            <div class="valid-feedback">
              Bien!
            </div>
            <div class="invalid-feedback">
              Ingrese un Nombre.
            </div>
          </div>
  
          <div class="form-floating">
            <select class="form-select" name="categoria" id="categoria" aria-label="Floating label select example" required>
              <option value="1" disabled selected>${product.categoria}</option>
            </select>
            <label for="categoria">Categoria</label>
            <div class="valid-feedback">
              Bien!
            </div>
            <div class="invalid-feedback">
              Por favor elija una opcion valida..
            </div>
          </div>
  
          <div class="form-floating">
            <input type="text" class="form-control" id="imagen" name="imagen" placeholder="imagen" value="${product.imagen}" required>
            <label for="imagen">Imagen</label>
            <div class="valid-feedback">
              Bien!
            </div>
            <div class="invalid-feedback">
              Ingrese una Imagen.
            </div>
          </div>
  
          <div class="form-floating">
            <input type="text" class="form-control" id="descripcion" name="descripcion" placeholder="descripcion" value="${product.descripcion}" required>
            <label for="descripcion">Descripcion</label>
            <div class="valid-feedback">
              Bien!
            </div>
            <div class="invalid-feedback">
              Ingrese una Descripcion.
            </div>
          </div>
  
          <div class="form-floating">
            <input type="number" class="form-control" id="rating" name="rating" placeholder="Rating" min="1" max="10" value="${product.rating}" required>
            <label for="rating">Rating</label>
            <div class="valid-feedback">
              Bien!
            </div>
            <div class="invalid-feedback">
              Ingrese un Rating valido, entre 1 y 10.
            </div>
          </div>
  
          <div class="form-floating">
            <input type="number" class="form-control" id="stock" name="cantidadStock" placeholder="Stock" min="1" value="${product.cantidadStock}" required>
            <label for="stock">Stock</label>
            <div class="valid-feedback">
              Bien!
            </div>
            <div class="invalid-feedback">
              Ingrese un Stock.
            </div>
          </div>
  
          <div class="form-floating">
            <input type="number" class="form-control" id="precio" name="precio" placeholder="Precio" min="1" value="${product.precio}" required>
            <label for="precio">Precio</label>
            <div class="valid-feedback">
              Bien!
            </div>
            <div class="invalid-feedback">
              Ingrese un Precio.
            </div>
          </div>
  
          <!--
          <div class="form-floating">
            <input type="number" class="form-control" id="tiendaId" name="tiendaId" placeholder="Id Tienda">
            <label for="tiendaId">Tienda Id</label>
          </div>
          -->
  
          <div class="form-floating">
            <button type="submit" class="btn btn-primary mb-3" id="btn-submit-${product.productoId}">Actualizar</button>
          </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btn-close" data-bs-dismiss="modal" onclick="location.reload()">Close</button>
        </div>
      </div>
    </div>
  </div>

  `)
}


const mostrarCategoria = async () => {
    const data = await getCategorias()

    data.forEach(opciones => {
        var categoria = modales.querySelector('#categoria');
        let element = document.createElement('option');
        element.value = opciones.categoriaId;
        element.innerHTML = opciones.descripcion;
        categoria.appendChild(element);
    });
}

const editarProducto = async (id) => {
  //formActualizar.innerHTML = " ";
 // formActualizar = document.getElementById("formActualizar-producto-${id}");
    //formActualizar.innerHTML = getActualizarForm(producto);
    formActualizar = modales.querySelector(`#formActualizar-producto-${id}`);
    console.log(id)
    await mostrarCategoria()
    checkForm(id, formActualizar);
}

const checkForm = (id, form) => {
  form.addEventListener("submit", (event) => {
    console.log(form.checkValidity());
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } 
      else {
          event.preventDefault();
          actualizarProducto(id);
      }

    form.classList.add("was-validated");
    }, false
  );
};

const actualizarProducto = async (id) => {
    var btnSubmit = document.getElementById(`btn-submit-${id}`);

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
        adminStore();
        return
        
    }
    else {
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
    adminStore();
    }
}

const eliminarProducto = async (id) => {

    var response = await deleteProductoById(id)

    // todo: cambiar por mejor forma de mostrar los mensajes
    if (response.status === 400) {
        alert('No se pudo eliminar el producto');
        adminStore();
        return
    }
    alert('Se elimino correctamente el producto');
    adminStore()
}
/*
const getActualizarForm = (product) => {
    return (
        `
        <div class="form-floating">       
          <input type="text" class="form-control" id="nom" name="nombre" placeholder="Nombre" value="${product.nombre}" required>
          <label for="nom">Nombre</label> 
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese un Nombre.
          </div>
        </div>

        <div class="form-floating">
          <select class="form-select" name="categoria" id="categoria" aria-label="Floating label select example" required>
            <option value="1" disabled selected>${product.categoria}</option>
          </select>
          <label for="categoria">Categoria</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Por favor elija una opcion valida..
          </div>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" id="imagen" name="imagen" placeholder="imagen" value="${product.imagen}" required>
          <label for="imagen">Imagen</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese una Imagen.
          </div>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" id="descripcion" name="descripcion" placeholder="descripcion" value="${product.descripcion}" required>
          <label for="descripcion">Descripcion</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese una Descripcion.
          </div>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control" id="rating" name="rating" placeholder="Rating" min="1" max="10" value="${product.rating}" required>
          <label for="rating">Rating</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese un Rating valido, entre 1 y 10.
          </div>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control" id="stock" name="cantidadStock" placeholder="Stock" min="1" value="${product.cantidadStock}" required>
          <label for="stock">Stock</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese un Stock.
          </div>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control" id="precio" name="precio" placeholder="Precio" min="1" value="${product.precio}" required>
          <label for="precio">Precio</label>
          <div class="valid-feedback">
            Bien!
          </div>
          <div class="invalid-feedback">
            Ingrese un Precio.
          </div>
        </div>

        <!--
        <div class="form-floating">
          <input type="number" class="form-control" id="tiendaId" name="tiendaId" placeholder="Id Tienda">
          <label for="tiendaId">Tienda Id</label>
        </div>
        -->

        <div class="form-floating">
          <button type="submit" class="btn btn-primary mb-3" id="btn-submit-${product.productoId}">Actualizar</button>
        </div>  `
    )
}
*/
