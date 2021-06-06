import { getProductos } from './productActions.js'
import ProductCard from './productCard.js'

window.onload = async () => {
    var productosDiv = document.getElementById("product-list")
    var loaderDiv = document.getElementById("loader")

    var productosJson = await getProductos()
    loaderDiv.remove()

    if (productosJson === null) {
        productosDiv.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>')
    }

    console.log(productosJson)

    productosJson.forEach((productoJson) => {
        productosDiv.insertAdjacentHTML('beforeend', ProductCard(productoJson))
    })
}