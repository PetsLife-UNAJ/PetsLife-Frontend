import {getAdoptables} from '../administration/adminActions.js';

$(document).ready(function () {
  ListarAdoptables();
});

async function ListarAdoptables() {
  var response = await getAdoptables();

  response.forEach((element) => {
    $('#ListaAdoptables').append(
      `<hr class="featurette-divider">
                  <div class="row featurette ">
                      <div class = " d-flex justify-content-end"></div>
                      <div class="col-md-7 order-md-2">
                      <div class="d-flex bd-highlight">
                          <div class="p-2 w-25 bd-highlight" ><h3 class="featurette-heading">${element.nombre}</h3></div>
                          <div class="p-2 flex-shrink-1 bd-highlight"><h3 class="text-muted">Su Historia:</h3></div>
                          
                      </div>
                      
                      <p class="lead ps-2">${element.historia}</p>
                      <div class="ps-1 mt-3 mb-3 d-flex justify-content-center">
                          <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal${element.mascotaId}">
                          Adoptame
                          </button>
                          
          
                      </div>
                      <!-- Button trigger modal -->
                      
                      
                      <!-- Modal -->
                      <div class="modal fade bd-example-modal-lg" id="exampleModal${element.mascotaId}" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg modal-dialog-centered">
                              <div class="modal-content">
                                  <div id="modalHeader${element.mascotaId}" class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Formulario de Adopcion</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                  <form id="form${element.mascotaId}" class="row g-3 " >
                                    <div class="col-md-4">
                                      <label for="adop_name" class="form-label">Nombre/s</label>
                                      <input type="text" class="form-control" id="adop_name${element.mascotaId}"  required>
                                      <div >
                                       
                                      </div>
                                    </div>
                                    <div class="col-md-4">
                                      <label for="adop_apellido" class="form-label">Apellido</label>
                                      <input type="text" class="form-control" id="adop_apellido${element.mascotaId}" required>
                                      <div >
                                       
                                      </div>
                                    </div>
                                    <p></p>
                                    <hr>
                                    <h5 class="modal-title" id="exampleModalLabel">Datos de contacto</h5>
                                    <div class="col-md-5">
                                      <label for="adop_dni" class="label">Nº Documento</label>
                                      <input type="number" class="form-control" id="adop_dni${element.mascotaId}"  placeholder="Solo numeros sin puntos" required>
                                      <div >
                                        
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="adop_tel" class="label">Nº Telefono</label>
                                      <input type="number" class="form-control" id="adop_tel${element.mascotaId}"  placeholder="Solo numeros sin espacios" required>
                                      <div >
                                       
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="adop_correo" class="label">Correo</label>
                                      <input type="text" class="form-control" id="adop_correo${element.mascotaId}"  placeholder="example@gmail.com" required>
                                      <div >
                                        
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="adop_dir" class="label">Dirección</label>
                                      <input type="text" class="form-control" id="adop_dir${element.mascotaId}"  placeholder="Calle y numero" required>
                                      <div >
                                        
                                      </div>
                                    </div>
                                    <p></p>
                                    <hr>
                                    
                                    <div class="col-md-5">
                                      <label for="validationCustom02" class="label fs-5">Información de la mascota:</label><p></p>
                                      <label for="validationCustom02" class="label">Nombre: ${element.nombre}.</label><p></p>
                                      <label for="validationCustom02" class="label">Peso: ${element.peso} kg.</label><p></p>
                                      <label for="validationCustom02" class="label">Edad: ${element.edad} año.</label><p></p>
                                      <div >
                                        
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="validationCustom02" class="label"><img class="img-mascota rounded-3 border border-secondary shadow p-1 mb-2 bg-body rounded" src="${element.imagen}" alt=""></label>
                                      <div >
                                       
                                      </div>
                                    </div>
                                    <p></p>
                                   
                                    <div class="col-12">
                                      <button class="btn btn-primary" id="btn-actualizar${element.mascotaId}">Postularme</button>
                                    </div>
                                  </form>
                                  <div id="msgPost${element.mascotaId}"></div> 
                                
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

    $(`#form${element.mascotaId}`).bind('submit', (event) => {
      event.preventDefault();
      var tipo = element.mascotaId;
      var adopcion = {
        nombre: $(`#adop_name${element.mascotaId}`).val(),
        apellido: $(`#adop_apellido${element.mascotaId}`).val(),
        dni: $(`#adop_dni${element.mascotaId}`).val(),
        direccion: $(`#adop_dir${element.mascotaId}`).val(),
        telefono: $(`#adop_tel${element.mascotaId}`).val(),
        email: $(`#adop_correo${element.mascotaId}`).val(),
        mascotaId: 1,
        adoptanteId: 1
      };

      $.ajax({
        type: 'POST',
        async: false,
        url: `https://localhost:44363/api/Adoptante/${tipo}`,
        data: JSON.stringify(adopcion),
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
          $(`#modalHeader${element.mascotaId}`).hide();
          $(`#form${element.mascotaId}`).hide();
          $(`#msgPost${element.mascotaId}`).append(
            `
            <div class="card text-center p-0 my-2 ">
            <div class="card-header bg-transparent text-success border-0">
              <i class="far fa-check-circle display-4 d-block"></i>
              <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
            </div>
            <div class="card-body">
              <p class="card-text lead">Ha sido registrado como posible adoptante con éxito.</p>
              
              <a href="javascript:location.reload()" class="btn btn-primary m-auto">Volver al Foro </a>
            </div>
          </div>`
          );
        }
      });
    });
  });
}
