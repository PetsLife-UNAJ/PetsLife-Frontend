import {sendWhatsapp} from '../../js/administration/adminActions.js'
import {getUser, sesion} from '../sesion.js'

var productListDiv  = document.getElementById("productoList")
var totalPriceDiv   = document.getElementById("totalPrice")
var comprarBtn      = document.getElementById("comprarBtn")
var totalTextElem   = document.getElementById("totalText")
var productoAlert   = document.getElementById("productoAlert")
var logginBtn       = document.getElementById("btn-log")

export const LoadCarrito = () => {
    resetCart()

    if (!localStorage.cart || localStorage.cart.length === 0) {
        showEmptyCart()
        return
    }

    var cart = JSON.parse(localStorage.cart)
    var totalPrice = 0

    cart.forEach((product) => {
        totalPrice += product.price
        var productCartHtml = productCartRow(product)
        productListDiv.insertAdjacentHTML('beforeend', productCartHtml)

        var deleteDiv = document.getElementById(`p-${product.id}`)
        deleteDiv.onclick = () => {
            removeFromCart(product)
        }
    })

    totalPriceDiv.innerHTML = `$ ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    comprarBtn.onclick = () => {
        if (sesion) {
            sendOrder()
        }
        else {
            logginBtn.click()
        }

    }
}

const addToCart = (product) => {
    let productoJson = {
        id: product.productoId,
        price: product.precio,
        name: product.nombre,
        image: product.imagen,
        quantity: 1
    }

    if (localStorage.cart && localStorage.cart.length > 0 ) {

        let cart = JSON.parse(localStorage.cart)
        var productExists = isProductInCart(product)

        if (!productExists) {
            cart.push(productoJson)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }
    else {
        localStorage.setItem("cart", JSON.stringify([productoJson]))
    }
}

const removeFromCart = (product) => {

    if (localStorage.cart && localStorage.cart.length > 0 ) {

        let cart = JSON.parse(localStorage.cart)

        cart.forEach((producto) => {
            if (producto.id === product.id) {
                cart.splice(cart.indexOf(producto), 1)

                localStorage.setItem("cart", JSON.stringify(cart))
            }
        })

        document.getElementById(`product-cart-${product.id}`).remove()

        if (cart.length === 0) {
            localStorage.removeItem("cart")
            showEmptyCart()            
        }
        // actualizo precio del carro al eliminar producto del carro.
        var currentPrice = parseFloat(totalPriceDiv.innerHTML.split("$").pop().trim().replace('.', ''))
        currentPrice -= parseFloat(product.price)
        totalPriceDiv.innerHTML = `$ ${currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`    
    }
}

const sendOrder = async () => {
    if (localStorage.cart && localStorage.cart.length > 0 ) {
        comprarBtn.disabled = true
        productoAlert.innerHTML = ""
        comprarBtn.innerHTML = ` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> `

        var user = getUser()
        var cart = JSON.parse(localStorage.cart)

        var pedido = ''
        var total = 0
        cart.forEach((producto) => {
            pedido += `${producto.name} - *$${producto.price}*\n`
            total += parseInt(producto.price)
        })

        var message = `
        Se registro nuevo pedido:\n 
        *Usuario:* ${user.Email} \n
        *Nombre:* ${user.Nombres} ${user.Apellidos}\n
        *Telefono:* ${user.Telefono} \n
        -------------------------------------
        *Pedido:*\n
        ${pedido}
        *Total pedido:* $${total}
        `

        //console.log(message)

        var response = await sendWhatsapp({message: message})
        if (response.status === 200) {
            productoAlert.innerHTML = `<div class="alert alert-success" role="alert">El pedido fue enviado a la veterinaria con exito!</a></div>`
            showEmptyCart()
            localStorage.removeItem("cart")
        }
        else {
            productoAlert.innerHTML = `<div class="alert alert-danger" role="alert">Hubo un error al enviar el pedido</a></div>`
            comprarBtn.disabled = false
            comprarBtn.innerHTML = 'Enviar Pedido'
        }
    }
}

const isProductInCart = (productJson) => {
   
    if (localStorage.cart && localStorage.cart.length > 0 ) {
        let cart = JSON.parse(localStorage.cart)

        for (let producto of cart) {
            if (producto.id === productJson.productoId) {
                return true
            }
        }
    }

    return false
}

const showEmptyCart = () => {
    productListDiv.innerHTML = `<div class="alert alert-info" role="alert">No hay productos agregados en el carrito. <a href="/store">Ver productos</a></div>`
    totalPriceDiv.hidden = true
    comprarBtn.hidden = true
    totalTextElem.hidden = true
}

const resetCart = () => {
    productListDiv.innerHTML = ''
    totalPriceDiv.hidden = false
    comprarBtn.hidden = false
    totalTextElem.hidden = false
}

const productCartRow = (data) => {
    return (
    `
    <div class="row border-bottom p-2" id="product-cart-${data.id}">
        <div class="col-2">
            <img class="w-100 h-100" src=${data.image} alt=${data.name}>
        </div>

        <div class="col">
            <div class="row">
                <div class="col h5 d-flex align-self-center">
                    ${data.name}
                </div>
            </div>
            <div class="row">

                <div class="col fw-bold d-flex">
                    $ ${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
                <div class="col fw-bold d-flex justify-content-center align-self-center" id="p-${data.id}">
                    <i class="fa fa-trash text-danger" style="cursor: pointer" aria-hidden="true"></i>

                </div>
            </div>
        </div>
    </div>
    `
    )
}

export {addToCart, isProductInCart}