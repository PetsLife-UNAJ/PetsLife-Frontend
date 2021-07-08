import {getAdoptables} from '../administration/adminActions.js'



$(document).ready(function () {


<<<<<<< HEAD
  function ListarAdoptables(response) {
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
                            <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal${element.mascotaId}">
                            Adoptame
                            </button>
                            
            
                        </div>
                        <!-- Button trigger modal -->
                        
                        
                        <!-- Modal -->
                        <div class="modal fade bd-example-modal-lg" id="exampleModal${element.mascotaId}" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="title" id="exampleModalLabel" style="font-size:35px; font-family= sans-serif;">Formulario de Adopcion</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    <form class="row g-3 needs-validation" novalidate>
                                      <div class="col-md-4">
                                        <label for="adop_name" class="form-label">Nombre/s</label>
                                        <input type="text" class="form-control" id="adop_name${element.mascotaId}" placeholder="Carlos Javier" required>
                                        <div class="valid-feedback">
                                          Looks good!
                                        </div>
                                        <div class="invalid-feedback">
                                          Please select a valid state.
                                        </div>
                                      </div>
                                      <div class="col-md-4">
                                        <label for="adop_apellido" class="form-label">Apellido/s</label>
                                        <input type="text" class="form-control" id="adop_apellido${element.mascotaId}" placeholder="Suarez" required>
                                        <div class="valid-feedback">
                                          Looks good!
                                        </div>
                                      </div>
                                      <p></p>
                                      <hr>
                                      <h5 class="modal-title" id="exampleModalLabel">Datos de contacto</h5>
                                      <div class="col-md-5">
                                        <label for="adop_dni" class="label">Nº Documento</label>
                                        <input type="number" class="form-control" id="adop_dni${element.mascotaId}"  placeholder="Solo numeros sin puntos" required>
                                        <div class="valid-feedback">
                                          Looks good!
                                        </div>
                                      </div>
                                      <div class="col-md-5">
                                        <label for="adop_tel" class="label">Nº Telefono</label>
                                        <input type="number" class="form-control" id="adop_tel${element.mascotaId}"  placeholder="Solo numeros sin espacios" required>
                                        <div class="invalid-feedback">
                                          Please choose a username.
                                        </div>
                                        
                                      </div>
                                      <div class="col-md-5">
                                        <label for="adop_correo" class="label">Correo</label>
                                        <input type="text" class="form-control" id="adop_correo${element.mascotaId}"  placeholder="example@gmail.com" required>
                                        <div class="valid-feedback">
                                          Looks good!
                                        </div>
                                      </div>
                                      <div class="col-md-5">
                                        <label for="adop_dir" class="label">Direccion</label>
                                        <input type="text" class="form-control" id="adop_dir${element.mascotaId}" placeholder="Localidad, barrio, calle y numero" required>
                                        <div class="valid-feedback">
                                          Looks good!
                                        </div>
=======
  ListarAdoptables();

});

async function ListarAdoptables() {
  var response = await getAdoptables()
  
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
                          <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal${element.mascotaId}">
                          Adoptame
                          </button>
                          
          
                      </div>
                      <!-- Button trigger modal -->
                      
                      
                      <!-- Modal -->
                      <div class="modal fade bd-example-modal-lg" id="exampleModal${element.mascotaId}" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg modal-dialog-centered">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h5 class="title" id="exampleModalLabel" style="font-size:35px; font-family= sans-serif;">Formulario de Adopcion</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                  <form class="row g-3 needs-validation" novalidate>
                                    <div class="col-md-4">
                                      <label for="adop_name" class="form-label">Nombre/s</label>
                                      <input type="text" class="form-control" id="adop_name" value="Carlos" placeholder="Carlos Javier" required>
                                      <div class="valid-feedback">
                                        Looks good!
                                      </div>
                                    </div>
                                    <div class="col-md-4">
                                      <label for="adop_apellido" class="form-label">Last name</label>
                                      <input type="text" class="form-control" id="adop_apellido" value="Suarez" placeholder="Suarez" required>
                                      <div class="valid-feedback">
                                        Looks good!
                                      </div>
                                    </div>
                                    <p></p>
                                    <hr>
                                    <h5 class="modal-title" id="exampleModalLabel">Datos de contacto</h5>
                                    <div class="col-md-5">
                                      <label for="adop_dni" class="label">Nº Documento</label>
                                      <input type="text" class="form-control" id="adop_dni" value="4154" placeholder="Solo numeros sin puntos" required>
                                      <div class="valid-feedback">
                                        Looks good!
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="adop_tel" class="label">Nº Telefono</label>
                                      <input type="text" class="form-control" id="adop_tel" value="1133" placeholder="Solo numeros sin espacios" required>
                                      <div class="valid-feedback">
                                        Looks good!
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="adop_correo" class="label">Correo</label>
                                      <input type="text" class="form-control" id="adop_correo" value="carlos" placeholder="example@gmail.com" required>
                                      <div class="valid-feedback">
                                        Looks good!
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="adop_dir" class="label">Direccion</label>
                                      <input type="text" class="form-control" id="adop_dir" value="Concordia" placeholder="Calle y numero" required>
                                      <div class="valid-feedback">
                                        Looks good!
>>>>>>> dev
                                      </div>
                                    </div>
                                    <p></p>
                                    <hr>
                                    
                                    <div class="col-md-5">
                                      <label for="validationCustom02" class="label">Informacion de la mascota:</label><p></p>
                                      <label for="validationCustom02" class="label">Nombre: ${element.nombre}</label><p></p>
                                      <label for="validationCustom02" class="label">Peso: ${element.peso}</label><p></p>
                                      <label for="validationCustom02" class="label">Edad: ${element.edad}</label><p></p>
                                      <label for="validationCustom02" class="label">Id de mascota: ${element.mascotaId}</label><p></p>
                                      <div class="valid-feedback">
                                        Looks good!
                                      </div>
                                    </div>
                                    <div class="col-md-5">
                                      <label for="validationCustom02" class="label"><img class="img-mascota rounded-3 border border-secondary shadow p-1 mb-2 bg-body rounded" src="${element.imagen}" alt=""></label>
                                      <div class="valid-feedback">
                                        Looks good!
                                      </div>
<<<<<<< HEAD
                                      <p>En caso de haber ingresado los datos correctamente recibirá una alerta por parte de su navegador en caso contrario intente nuevamente.</p>
                                      
                                      <div class="col-12">
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                          <label class="form-check-label" for="invalidCheck">
                                            Aceptar terminos y condiciones
                                          </label>
                                          <div class="invalid-feedback">
                                            You must agree before submitting.
                                          </div>
=======
                                    </div>
                                    <p></p>
                                    <div class="col-12">
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                        <label class="form-check-label" for="invalidCheck">
                                          Agree to terms and conditions
                                        </label>
                                        <div class="invalid-feedback">
                                          You must agree before submitting.
>>>>>>> dev
                                        </div>
                                      </div>
                                    </div>
<<<<<<< HEAD
                                    
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
        
      $(`#btn-actualizar${element.mascotaId}`).click(function () {

        console.log("Funciono");

        var tipo = element.mascotaId;
        var adopcion = {

          "nombre": $(`#adop_name${element.mascotaId}`).val(),
          "apellido": $(`#adop_apellido${element.mascotaId}`).val(),
          "dni": $(`#adop_dni${element.mascotaId}`).val(),
          "direccion": $(`#adop_dir${element.mascotaId}`).val(),
          "telefono": $(`#adop_tel${element.mascotaId}`).val(),
          "email": $(`#adop_correo${element.mascotaId}`).val(),
          "mascotaId": 1,
          "adoptanteId": 1

        };
        console.log(adopcion);

        $.ajax({
          type: 'POST',
          async: false,
          url: `https://localhost:44363/api/Adoptante/${tipo}`,
          data: JSON.stringify(adopcion),
          dataType: "json",
          contentType: "application/json",
          beforeSend: function () {
            console.log(this.data);
            
          },
          success: function (response) {
            console.log(response);
            alert("Creado con exito")
          },
          error: function (response) {
            console.log(response)
            alert("Error")
          }
        });

        /*
        $.ajax({
          async: false,
          url: `https://localhost:44363/api/Adoptante/${tipo}`,
          type: 'POST',
          dataType: "json",
          contentType: "application/json",
          adopcion: JSON.stringify(adopcion),
          success: function () {
            alert('Exitoso!');
          },
        });
          */

=======
                                    <div class="col-12">
                                      <button class="btn btn-primary" id="btn-actualizar${element.mascotaId}">Postularme</button>
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

    $(`#btn-actualizar${element.mascotaId}`).click(function () {

      console.log("Funciono");

      var tipo = element.mascotaId;
      var adopcion = {

        "nombre": $("#adop_name").val(),
        "apellido": $("#adop_apellido").val(),
        "dni": $("#adop_dni").val(),
        "direccion": $("#adop_dir").val(),
        "telefono": $("#adop_tel").val(),
        "email": $("#adop_correo").val(),
        "mascotaId": 1,
        "adoptanteId": 1

      };
      console.log(adopcion);

      $.ajax({
        type: 'POST',
        async: false,
        url: `https://localhost:44363/api/Adoptante/${tipo}`,
        data: JSON.stringify(adopcion),
        dataType: "json",
        contentType: "application/json",
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
>>>>>>> dev
      });

      /*
      $.ajax({
        async: false,
        url: `https://localhost:44363/api/Adoptante/${tipo}`,
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        adopcion: JSON.stringify(adopcion),
        success: function () {
          alert('Exitoso!');
        },
      });
        */

    });



  });

};
