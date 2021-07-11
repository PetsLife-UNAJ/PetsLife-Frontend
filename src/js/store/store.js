// import {sesion, getPayload} from '../sesion.js';
import { getProductos } from "./productActions.js"
import {
	getProductosPorCategoria,
	getProductosPorBuscador,
} from "./productActions.js"
import { changeIcon, checkLogin } from "../login/login.js"
import {LoadCarrito} from './carrito.js'

window.onload = async () => {
	changeIcon()
	checkLogin();
	
	// activo carro y barra de search
	document.getElementById("store-search").hidden = false
	document.getElementById("store-cart").hidden = false
	document.getElementById("cartIcon").onclick = () => {LoadCarrito()}
	var productosJson = await getProductos()
	renderProductos(productosJson)

	// eventos boton para buscar por el buscador
	var buscador = document.getElementById("buscador")
	buscador.addEventListener("submit", (event) => {
		event.preventDefault()
		let buscar = buscador.elements.buscar.value

		buscarProducto(buscar)
	})

	// eventos boton para buscar por categoria
	var bntCategoria = document.querySelectorAll(".categoria")
	bntCategoria.forEach((btn) => {
		btn.addEventListener("click", () => {
			let categoria = btn.value

			buscarCategoria(categoria)
		})
	})
}

const buscarProducto = async (buscar) => {
	var productoJson = await getProductosPorBuscador(buscar)
	renderProductos(productoJson)
}

const buscarCategoria = async (categoria) => {
	var productoJson = await getProductosPorCategoria(categoria)
	renderProductos(productoJson)
}

const renderProductos = (productosJson) => {
	var productosDiv = document.getElementById("product-list")
	productosDiv.innerHTML = ""
	var loaderDiv = document.getElementById("loader")

	if (loaderDiv != undefined) {
		loaderDiv.remove()
	}

	if (productosJson.status === 400) {
		productosDiv.insertAdjacentHTML(
			"beforeend",
			'<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>'
		)
	}

	if (productosJson.length === 0) {
		productosDiv.innerHTML = `<div class="alert alert-danger">No hay productos disponibles de esta categoria</div>`
	}

	//console.log(productosJson);

	productosJson.forEach((productoJson) => {
		productosDiv.insertAdjacentHTML("beforeend", ProductCard(productoJson))
	})
}

const ProductCard = (data) => {
	return `
        <div class="card rounded-0" style="min-height: 160px; border-top: none;">
            <div class="row g-0">
            <div class="col-2 m-3">
                <a href="producto/${data.productoId}">
                    <img style="height: 160px; width: 160px" src=${data.imagen} alt=${data.nombre}>
                </a>
            </div>
            <div class="col">
                <div class="card-body">
                <a class="text-decoration-none" style="color: #333" href="producto/${data.productoId}">
                    <p class="card-title fs-4">${data.nombre}</p>
                </a>
                
                <p class="card-text fw-bold">$ ${data.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                </div>
            </div>
            </div>
        </div>
		`
}
