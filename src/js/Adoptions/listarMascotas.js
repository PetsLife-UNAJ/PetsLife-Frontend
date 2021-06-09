$(document).ready(function(){
    
    
    
    
    $.get("https://localhost:44363/Adoptables" , function(response){
        console.log(response);
        ListarAdoptables(response);
        
        
        });
   
    

    function ListarAdoptables(response){
        response.forEach(element => {
            
            $("#ListaAdoptables").append(
                `<hr class="featurette-divider">
                    <div class="row featurette ">
                        <div class = " d-flex justify-content-end"><p>Mascota id:</p><p id = "${element.mascotaId}" class = "ps-1"> ${element.mascotaId}</p></div>
                        <div class="col-md-7 order-md-2">
                        <div class="d-flex bd-highlight">
                            
                            <div class="p-2 w-25 bd-highlight" ><h2 class="featurette-heading">${element.nombre}</h2></div>
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
                                    <form class="row g-3">
                                    <div class="col-md-4">
                                      <label for="validationDefault01" class="form-label">First name</label>
                                      <input type="text" class="form-control" id="validationDefault01" value="Mark" required>
                                    </div>
                                    <div class="col-md-4">
                                      <label for="validationDefault02" class="form-label">Last name</label>
                                      <input type="text" class="form-control" id="validationDefault02" value="Otto" required>
                                    </div>
                                    <div class="col-md-4">
                                      <label for="validationDefaultUsername" class="form-label">Username</label>
                                      <div class="input-group">
                                        <span class="input-group-text" id="inputGroupPrepend2">@</span>
                                        <input type="text" class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required>
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <label for="validationDefault03" class="form-label">City</label>
                                      <input type="text" class="form-control" id="validationDefault03" required>
                                    </div>
                                    <div class="col-md-3">
                                      <label for="validationDefault04" class="form-label">State</label>
                                      <select class="form-select" id="validationDefault04" required>
                                        <option selected disabled value="">Choose...</option>
                                        <option>...</option>
                                      </select>
                                    </div>
                                    <div class="col-md-3">
                                      <label for="validationDefault05" class="form-label">Zip</label>
                                      <input type="text" class="form-control" id="validationDefault05" required>
                                    </div>
                                    <div class="col-12">
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
                                        <label class="form-check-label" for="invalidCheck2">
                                          Agree to terms and conditions
                                        </label>
                                      </div>
                                    </div>
                                    <div class="col-12">
                                        <button id = "btn_registrar${element.mascotaId}"class="btn btn-primary" }">Registrarme</button>
                                        
                                    </div>
                                  </form>
                                  
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-5 d-flex justify-content-center align-items-center">
                        <img class="img-mascota rounded-3 border border-secondary shadow p-1 mb-2 bg-body rounded" src="${element.imagen}" alt="">
                        
                        </div>
                       
                        
                    </div>
                    </div>

                `
                
               
            );
            
            var gg = $(`#${element.mascotaId}`).text();
            console.log(gg);
            
            
            
            
        });

    };
    
   

});