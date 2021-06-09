$(document).ready(function () {
    var adoptables;
    $.get("https://localhost:44363/PosiblesAdoptantes", function (response) {
        console.log(response);
        ListarAdopciones(response);
    });

    function ListarAdopciones(response) {
        let i = 0
        let url = "../../assets/images/cobayo_1.jpg"
        response.forEach(element => {
            var id_masc = element.mascotaId
            i++;
            $.get(`https://localhost:44363/api/Mascota/${id_masc}`, function (mascota) {
                console.log(mascota)
                $("#ListaAdoptables").append(
                    `<hr class="featurette-divider">
                            <div class="row featurette ">
                                <div class="col-md-7 order-md-2">
                                <div class="d-flex bd-highlight">
                                    <div class="p-2 flex-shrink-1 bd-highlight"><h2 class="text-muted">Datos Adoptante</h2></div>
                                    
                                    
                                    
                                </div>
                                <div>
                                    <p class="p-2 flex-shrink-1 bd-highlight">Nombre y apellido: ${element.nombre} ${element.apellido}</p>
                                    <p class="p-2 flex-shrink-1 bd-highlight">DNI              : ${element.dni}</p>
                                    <p class="p-2 flex-shrink-1 bd-highlight">Contacto         : ${element.telefono} // ${element.email}</p>
                                    <p class="p-2 flex-shrink-1 bd-highlight">ID de la mascota : ${element.mascotaId}</p>
                                </div>
                                    
                                
                                <div class="ps-1 mt-3 mb-3  justify-content">
                                    <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#info-masc-${element.mascotaId}">
                                    Datos Mascota
                                    </button>
                                    <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#aceptar-adop-${element.mascotaId}">
                                    Aceptar adopcion
                                    </button>
                                </div>
                                
                                <!-- Button trigger modal -->
                                
                                
                                <!-- Modal -->
                                <div class="modal fade" id="info-masc-${element.mascotaId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title" id="exampleModalLabel">Datos Mascota</h4>
                                                
                                                
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                
                                            </div>
                                            <div class="modal-body">
                                                    <div class="col-md-10">
                                                        <p class="p-2 flex-shrink-1 bd-highlight">Nombre      : ${mascota.nombre} </p>
                                                        <p class="p-2 flex-shrink-1 bd-highlight">Historia    : ${mascota.historia} </p>
                                                        <p class="p-2 flex-shrink-1 bd-highlight">Tipo animal : ${mascota.tipoAnimal} </p>
                                                        <p class="p-2 flex-shrink-1 bd-highlight">Edad        : ${mascota.edad} </p>
                                                        <p class="p-2 flex-shrink-1 bd-highlight">Peso        : ${mascota.peso} </p>
                                                        <p class="p-2 flex-shrink-1 bd-highlight">Estado      : ${mascota.adoptado} </p>
                                                    </div>     
                                                </div>
                                            <div class="modal-body">
                                            
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="aceptar-adop-${element.mascotaId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title" id="exampleModalLabel"> Actualizar mascota</h4>
                                                
                                                
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                
                                            </div>
                                            <div class="modal-body">
                                            <form class="row g-3 needs-validation" novalidate>
                                            <div class="col-md-3">
                                                <label for="mascota_adoptado" class="form-label">Estado adopcion</label>
                                                <input type="text" class="form-control" id="mascota_adoptado" value="false" required>
                                                <div class="invalid-feedback">
                                                Please provide a valid zip.
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="mascotass" class="form-label">Id Mascota</label>
                                                <input type="text" class="form-control" id="mascota_id" value="${element.mascotaId}" required>
                                                <div class="invalid-feedback">
                                                Please provide a valid zip.
                                                </div>
                                            </div>
                                            <div class="col-12">
                                            <button class="btn btn-primary" id="btn-actualizar${element.adoptanteId}">Actualizar</button>
                                            </div>
                                            </form>    
                                                </div>
                                            <div class="modal-body">
                                            
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                                </div>
        
                                <div class="col-md-5 d-flex justify-content-center align-items-center">
                                <img class="img-mascota rounded-3 border border-secondary shadow p-1 mb-5 bg-body rounded" src="${mascota.imagen}"">
                                
                                </div>
                            </div>
                            </div>
                        `
                )

                $(`#btn-actualizar${element.adoptanteId}`).click(function () {

                    console.log("Funciono");
                    
                    if ($(mascota_adoptado).val() == "true") {
                        x = Boolean(true);
                    }
                    else {
                        x = Boolean(false);
                    }

                    
                    var data = {
                        "tipoAnimal": "Default",
                        "tipoAnimalId": mascota.tipoAnimalId,
                        "adoptado": x,
                        "imagen": mascota.imagen,
                        "nombre": mascota.nombre,
                        "historia": mascota.historia,
                        "edad": parseInt(mascota.edad),
                        "peso": parseFloat(mascota.peso)
                    }
                    console.log(data);

                    var tipo = $("#mascota_id").val();
                    console.log(tipo);
                    
                    $.ajax({
                        async:false,
                        url: `https://localhost:44363/api/Mascota/${tipo}`,
                        type: 'PUT',
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: function () {
                            alert('Exitoso!');
                        },
                    });
                    
                    
                });




            })

        });



    };
});

