var formulario = document.getElementById('formulario-mercaderia');

formulario.addEventListener('submit', function(e){
    e.preventDefault(); 
    /*
    var datos = new FormData(formulario);
    console.log(datos)
    console.log(datos.get('nombre'))
    console.log(datos.get('categoria'))
    console.log(datos.get('imagen'))
    console.log(datos.get('descripcion'))
    console.log(datos.get('rating'))
    console.log(datos.get('cantidadStock'))
*/
    let nombre = formulario.elements.nombre.value;
    let categoria = formulario.elements.categoria.value;
    let imagen = formulario.elements.imagen.value;
    let descripcion = formulario.elements.descripcion.value;
    let rating = formulario.elements.rating.value;
    let stock = formulario.elements.cantidadStock.value;
    let precio = formulario.elements.precio.value;
    let tienda = formulario.elements.tiendaId.value;

    console.log(categoria)
    console.log(stock)
    let datos = {
        nombre: nombre,
        categoria: categoria,
        imagen: imagen,
        descripcion: descripcion,
        rating: rating,
        cantidadStock: stock,
        precio: precio,
        tiendaId: tienda
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
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            })
    } catch (error) {
        console.log(error)
    }
})







    /*

*/