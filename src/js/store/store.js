import {getProductos} from './productActions.js';
//import { getProductosPorCategoria} from './productActions.js'
// import {sesion, getPayload} from '../sesion.js';
import {changeIcon, checkLogin} from '../login/login.js';

window.onload = async () => {
  console.log("store")
  changeIcon();
  checkLogin();
  document.getElementById('store-search').hidden = false;
  var productosJson = await getProductos();
  renderProductos(productosJson);
};

var buscador = document.getElementById('buscador');
buscador.addEventListener('submit', (event) => {
  event.preventDefault();
  let buscar = buscador.elements.buscar.value;
  getProductosPorBuscador(buscar);
});

var bntCategoria = document.querySelectorAll('.categoria');
bntCategoria.forEach((btn) => {
  btn.addEventListener('click', () => {
    let categoria = btn.value;
    var productosJsonPorCategoria = getProductosPorCategoria(categoria);
    //renderProductos(productosJsonPorCategoria)
  });
});

const getProductosPorCategoria = async (categoria) => {
  let response = await fetch(
    'http://localhost:27459/api/Productos?categoria=' + categoria
  );
  let data = await response.json();

  //renderProductosPorCategoria(data , categoria);
  renderProductos(data);
};
const getProductosPorBuscador = async (producto) => {
  let response = await fetch(
    'http://localhost:27459/api/Productos?producto=' + producto
  );
  let data = await response.json();

  //renderProductosPorCategoria(data , categoria);
  renderProductos(data);
};
const renderProductos = (productosJson) => {
  var productosDiv = document.getElementById('product-list');
  productosDiv.innerHTML = '';
  var loaderDiv = document.getElementById('loader');

  if (loaderDiv != undefined) {
    loaderDiv.remove();
  }

  if (productosJson.status === 400) {
    productosDiv.insertAdjacentHTML(
      'beforeend',
      '<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>'
    );
  }

  if (productosJson.length === 0) {
    productosDiv.innerHTML = `<div class="alert alert-danger">No hay productos disponibles de esta categoria</div>`;
  }

  console.log(productosJson);

  productosJson.forEach((productoJson) => {
    productosDiv.insertAdjacentHTML('beforeend', ProductCard(productoJson));
  });
};

const renderProductosPorCategoria = (productosJsonPorCategoria, categoria) => {
  var productosDiv = document.getElementById('product-list');
  productosDiv.innerHTML = '';
  if (productosJsonPorCategoria.status === 400) {
    productosDiv.insertAdjacentHTML(
      'beforeend',
      '<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>'
    );
  }
  console.log(productosJsonPorCategoria.length);

  if (productosJsonPorCategoria.length === 0) {
    productosDiv.innerHTML = `<div class="alert alert-danger">No hay productos disponibles de esta categoria: ${categoria}</div>`;
  }

  productosJsonPorCategoria.forEach((productoJson) => {
    productosDiv.insertAdjacentHTML('beforeend', ProductCard(productoJson));
  });
};

const ProductCard = (data) => {
  return `
        <div class="card rounded-0" style="min-height: 160px; border-top: none;">
            <div class="row g-0">
            <div class="col-2 m-3">
                <a href="producto/${data.productoId}">
                    <img style="height: 160px; width: 160px" src=${
                      data.imagen
                    } alt=${data.nombre}>
                </a>
            </div>
            <div class="col">
                <div class="card-body">
                <a class="text-decoration-none" style="color: #333" href="producto/${
                  data.productoId
                }">
                    <p class="card-title fs-4">${data.nombre}</p>
                </a>
                
                <p class="card-text fw-bold">$ ${data.precio
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                </div>
            </div>
            </div>
        </div>
        `;
};
