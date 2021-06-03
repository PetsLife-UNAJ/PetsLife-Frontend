import { getProductoById } from './productActions.js'



window.onload = async () => {
    var productoDiv = document.getElementById("productDetail")
    var loaderDiv = document.getElementById("loader")

    // obtengo producto desde id de la url
    var productoId = location.pathname.slice(-1)
    var productoJson = await getProductoById(productoId)

    console.log(productoJson)
    loaderDiv.remove()
    if (productoJson === null) {
        productoDiv.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Error al obtener los productos de la base de datos</div>')
    }

    var productoHtml = ProductDetail(productoJson)

    productoDiv.insertAdjacentHTML('beforeend', productoHtml)

}

const ProductDetail = (data) => {

    var starHtml = Rating(data.rating)

    return (
        `

        <div class="row ">
            <div class="col-4 bg-light pt-4"><img style="height: 300px; width: 300px" src=${data.imagen} alt=${data.nombre}></div>
            <div class="col-6 bg-light pt-4">
                <div id="productTitle"><h3>${data.nombre}</h3></div>
                <div id="category"><strong>Categoria:</strong> ${data.categoria}</div>
                <div id="productStars">
                    ${starHtml}
                </div>
                <hr>
                <div id="price" style="color: #B12704!important"><span style="font-size: 26px; font-weight: 600;">$ ${data.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span></div>
                ${data.cantidadStock > 0 ? 
                    `<div id="stock" style="color: #007600!important"><span style="font-size: 18px;">Disponible</span></div>` : 
                    `<div id="stock" style="color: #ff3030!important"><span style="font-size: 18px;">Sin Stock</span></div>`
                }
                
                ${data.descripcion.length > 0 ? 
                `
                <div id="productDescription" class="mt-2"><strong>Descripcion del producto:</strong>
                    <div id="productDescription" class="mt-2 mb-5"><span>${data.descripcion}</span></div>
                </div>
                ` : ""
                }
                
                <div id="actionButtons" class="pb-4 text-center">
                    <button type="button" class="btn btn-primary btn" ${data.cantidadStock > 0 ? '' : 'disabled'}>Comprar ahora</button>
                    <button type="button" class="btn btn-secondary btn" ${data.cantidadStock > 0 ? '' : 'disabled'}>Agregar al carrito</button>
                </div>

            </div>
        </div>

        `
    )
}

const Rating = (ratingScore) => {
    var fullStar = Math.floor(ratingScore / 2)
    var halfStar = ratingScore % 2
    var emptyStar = 5 - fullStar - halfStar

    var fullStarHtml = fullStar > 0 ? `<i class="bi bi-star-fill text-warning"></i>`.repeat(fullStar) : ""
    var halfStarHtml = halfStar > 0 ? `<i class="bi bi-star-half text-warning"></i>`.repeat(halfStar) : ""
    var emptyStarHtml = emptyStar > 0 ? `<i class="bi bi-star text-warning"></i>`.repeat(emptyStar) : ""

    var finalHtml = fullStarHtml + halfStarHtml + emptyStarHtml
    return finalHtml
}