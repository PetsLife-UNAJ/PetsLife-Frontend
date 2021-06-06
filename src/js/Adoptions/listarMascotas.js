$(document).ready(function(){
    var adoptables;
    $.get("https://localhost:44363/Adoptables" , function(response){
        console.log(response);
        ListarAdoptables(response);

    });

    function ListarAdoptables(response){
        response.forEach(element => {
            $("#ListaAdoptables").append(
                `<hr class="featurette-divider">
                    <div class="row featurette ">
                        <div class="col-md-7 order-md-2">
                        <div class="d-flex bd-highlight">
                            <div class="p-2 w-25 bd-highlight"><h2 class="featurette-heading">${element.nombre}</h2></div>
                            <div class="p-2 flex-shrink-1 bd-highlight"><h2 class="text-muted">Su Historia:</h2></div>
                            
                        </div>
                        
                        <p class="lead ps-2">${element.historia}</p>
                        <div class="ps-1 mt-3 mb-3 d-flex justify-content-center">
                            <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Adoptame
                            </button>
            
                        </div>
                        <!-- Button trigger modal -->
                        
                        
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Formulario de Adopcion</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form class="row g-3 needs-validation" novalidate>
                                            <div class="col-md-4">
                                                <label for="validationCustom01" class="form-label">Nombre</label>
                                                <input type="text" class="form-control" id="validationCustom01" value="Mark" required>
                                                <div class="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="validationCustom02" class="form-label">Apellido</label>
                                                <input type="text" class="form-control" id="validationCustom02" value="Otto" required>
                                                <div class="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="validationCustomUsername" class="form-label">Dni</label>
                                                <div class="input-group has-validation">
                                                
                                                <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
                                                <div class="invalid-feedback">
                                                    Please choose a username.
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="validationCustom03" class="form-label">Localidad</label>
                                                <input type="text" class="form-control" id="validationCustom03" required>
                                                <div class="invalid-feedback">
                                                Please provide a valid city.
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="validationCustom04" class="form-label">Provincia</label>
                                                <select class="form-select" id="validationCustom04" required>
                                                <option selected disabled value="">Choose...</option>
                                                <option>...</option>
                                                </select>
                                                <div class="invalid-feedback">
                                                Please select a valid state.
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="validationCustom05" class="form-label">Codigo Postal</label>
                                                <input type="text" class="form-control" id="validationCustom05" required>
                                                <div class="invalid-feedback">
                                                Please provide a valid zip.
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                                <label class="form-check-label" for="invalidCheck">
                                                    Agree to terms and conditions
                                                </label>
                                                <div class="invalid-feedback">
                                                    You must agree before submitting.
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <button class="btn btn-primary" type="submit">Registrarme</button>
                                            </div>
                                            </form>
                                    
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-5 d-flex justify-content-center align-items-center">
                        <img class="img-mascota rounded-3 border border-secondary shadow p-1 mb-5 bg-body rounded" src="${element.imagen}" alt="">
                        </div>
                    </div>
                    </div>

                `
            );
            
        });

    };

});