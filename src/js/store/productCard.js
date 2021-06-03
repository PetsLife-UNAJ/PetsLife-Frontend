
const ProductCard = (data) => {
    return (
        `
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
    )
}

export default ProductCard