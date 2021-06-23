var formulario = document.getElementById('formulario-producto');


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

formulario.addEventListener('submit', function(e){
    e.preventDefault(); 

    let nombre = formulario.elements.nombre.value;
    let categoria = formulario.elements.categoria.value;
    let imagen = formulario.elements.imagen.value;
    let descripcion = formulario.elements.descripcion.value;
    let rating = formulario.elements.rating.value;
    let stock = formulario.elements.cantidadStock.value;
    let precio = formulario.elements.precio.value;

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
            method: 'POST',
            body: datosJson,
            
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
                }
        }).then((response) => {
            response.json();
            console.log(response)
            if(response.status === 201){
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
