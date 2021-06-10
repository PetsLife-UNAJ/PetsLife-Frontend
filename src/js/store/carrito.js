var productCartListDiv = document.getElementById("product-cart-list")

window.onload = () => {
    var totalPricediv = document.getElementById("totalPrice")

    if (localStorage.length === 0) {
        productCartListDiv.innerHTML = `<div class="alert alert-info" role="alert"> El carrito esta vacio </div>`
        return
    }

    var cart = JSON.parse(localStorage.cart)
    var totalPrice = 0

    cart.forEach((product) => {
        totalPrice += product.price
        var productCartHtml = ProductCartRow(product)
        productCartListDiv.insertAdjacentHTML('beforeend', productCartHtml)

        var deleteDiv = document.getElementById(`p-${product.id}`)
        deleteDiv.onclick = () => {
            RemoveFromCart(product.id)
        }
    })

    totalPricediv.innerHTML = `$ ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`

}


const ProductCartRow = (data) => {
    return (
    `
    <div class="row border-bottom p-2" id="product-cart-${data.id}">
        <div class="col-1">
            <img style="height: 50px; width: 50px" src=${data.image} alt=${data.name}>
        </div>

        <div class="col-6 h5 d-flex ps-4 align-self-center">
            ${data.name}
        </div>

        <div class="col-2 fw-bold d-flex justify-content-center align-self-center">
            $ ${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </div>
        <div class="col-2 fw-bold d-flex justify-content-center align-self-center" id="p-${data.id}">
           <i class="bi bi-x text-danger fw-bold h5" style="cursor: pointer; font-size: 30px"></i>
        </div>
    </div>
    `
    )
}

const RemoveFromCart = (productId, parentDiv) => {

    if (localStorage.length !== 0) {

        let cart = JSON.parse(localStorage.cart)

        cart.forEach((producto) => {
            if (producto.id === productId) {
                cart.splice(cart.indexOf(producto), 1)

                localStorage.setItem("cart", JSON.stringify(cart))
            }
        })

        if (cart.length === 0) {
            localStorage.clear()
        }

        document.getElementById(`product-cart-${productId}`).remove()

        location.reload();
    }
}