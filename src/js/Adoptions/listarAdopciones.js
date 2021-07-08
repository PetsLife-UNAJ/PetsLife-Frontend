$(document).ready(function () {
    var adoptables;
    var Lista_masc = [];
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
                Lista_masc.push(mascota);
                console.log(Lista_masc);
                $("#ListaAdoptables").append(
                    `<hr class="featurette-divider">
                            <div class="row featurette ">
                            <div class = " d-flex justify-content-end"><p>Mascota id:</p><p id = "${element.mascotaId}" class = "ps-1"> ${element.mascotaId}</p></div>
                                <div class="col-md-7 order-md-2">
                                <div class="d-flex bd-highlight">
                                
                                    <div class="p-2 flex-shrink-1 bd-highlight"><h2 class="text-muted">Datos Adoptante</h2></div>
                                    
                                    
                                    
                                </div>
                                <div>
                                    
                                    <p class="p-2 flex-shrink-1 bd-highlight">Nombre y apellido: ${element.nombre} ${element.apellido}</p>
                                    <p class="p-2 flex-shrink-1 bd-highlight">DNI              : ${element.dni}</p>
                                    <p class="p-2 flex-shrink-1 bd-highlight">Telefono         : ${element.telefono}</p>
                                    <p class="p-2 flex-shrink-1 bd-highlight">Correo           : ${element.email}</p>
                                    <p class="p-2 flex-shrink-1 bd-highlight">Direccion        : ${element.direccion}</p>
                                </div>
                                    
                                
                                <div class="ps-1 mt-2 mb-4">
                                    <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#info-masc-${element.mascotaId}">
                                    Datos Mascota
                                    </button>
                                    <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#aceptar-adop-${element.mascotaId}">
                                    Aceptar adopcion
                                    </button>
                                </div>
                                
                                <!-- Button trigger modal -->
                                
                                <!-- Modal -->
                                <div class="modal fade bd-example-modal-lg" id="info-masc-${element.mascotaId}" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="title" id="exampleModalLabel" style="font-size:35px; font-family= sans-serif;">Datos de ${mascota.nombre}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                            <form class="row g-3 needs-validation" novalidate>
                                            <div class="col-md-4">
                                                <label for="adop_name" class="form-label">Id de mascota</label>
                                                <input type="text" class="form-control" id="info-masc-id${element.mascotaId}"  value="${id_masc}" readonly>
                                                <div class="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-4">
                                                <label for="adop_apellido" class="form-label">Tipo animal</label>
                                                <input type="text" class="form-control" id="info-masc-tipo${element.mascotaId}" value="${mascota.tipoAnimal}" readonly>
                                                <div class="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            <div class="col-md-10"  >
                                            
                                                <label for="adop_dni" class="label" style="font-size:18px">Historia de ${mascota.nombre} </label>
                                                <p class="lead ps-2" id="info-masc-hist${element.mascotaId}">${mascota.historia}</p>
                                                
                                                <div class="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            <p></p>
                                            <div class="col-md-5">
                                                <img class="img-mascota rounded-3 border border-secondary shadow p-1 mb-5 bg-body rounded" src="${mascota.imagen}"">
                                            </div>
                                            </form> 
                                        
                                            </div>
                                            
                                        
                                    </div>
                                </div>
                                </div>
                                <div class="modal fade" id="aceptar-adop-${element.mascotaId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title" id="exampleModalLabel"> Actualizar mascota</h4>
                                                
                                                
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                
                                            </div>
                                            <div class="modal-body">
                                            <form class="row g-3 needs-validation" novalidate>
                                            <div class="col-md-5">
                                                <label for="mascota_adoptado" class="form-label">Estado adopcion</label>
                                                <input type="text" class="form-control" id="mascota_adoptado${element.mascotaId}" placeholder="Escriba aprobado para aprobar" required>
                                                <div class="invalid-feedback">
                                                Please provide a valid zip.
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="mascotass" class="form-label">Id Mascota</label>
                                                <input type="text" class="form-control" id="mascota_id${element.mascotaId}" value="${element.mascotaId}" readonly>
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
                    debugger
                    console.log("Funciono");
                    
                    if ($(`#mascota_adoptado${element.mascotaId}`).val() === "aprobado") {
                        x = Boolean(true);
                    }
                    else {
                        x = Boolean(false);
                    }
                    var data;
                    
                    Lista_masc.forEach(elemento => {
                        if (parseInt($(`#mascota_id${element.mascotaId}`).val()) === elemento.mascotaId){
                            data = {
                                "tipoAnimal": "Default",
                                "tipoAnimalId": elemento.tipoAnimalId,
                                "adoptado": x,
                                "imagen": elemento.imagen,
                                "nombre": elemento.nombre,
                                "historia": elemento.historia,
                                "edad": parseInt(elemento.edad),
                                "peso": parseFloat(elemento.peso)
                            }
                        }
                        
                    });
                    
                    console.log(data);

                    var tipo = $(`#info-masc-id${element.mascotaId}`).val();
                    console.log(tipo);
                    
                    $.ajax({
                        async:false,
                        url: `https://localhost:44363/api/Mascota/${tipo}`,
                        type: 'PUT',
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        beforeSend: function () {
                            console.log(this.data);
                            console.log("enviando...");
                          },
                          success: function (response) {
                            console.log(response);
                            alert("Creado con exito")
                          },
                          error: function (response) {
                            console.log(response)
                          }
                    });
                    
                    
                });




            })

        });



    };
});

