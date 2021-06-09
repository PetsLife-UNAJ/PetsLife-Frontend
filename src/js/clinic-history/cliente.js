const createClient = (datos) => {
    fetch("https://localhost:44314/api/Cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: datos,
    })
      .then((response) => {
        response.json();
        if (response.status == 201) {
          formCliente.innerHTML = ` <div class="card text-center p-0 my-2 ">
            <div class="card-header bg-transparent text-success border-0">
              <i class="far fa-check-circle display-4 d-block"></i>
              <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
            </div>
            <div class="card-body">
              <p class="card-text lead">El cliente se ha sido registrado con éxito.</p>
              <a href="/veterinaria" class="btn btn-primary m-auto">Ir al menu </a>
            </div>
          </div>`;
        }
        if (response.status == 400) {
          formCliente.innerHTML = ` <div class="card text-center p-0 my-2 ">
          <div class="card-header bg-transparent text-danger border-0">
          <i class="fas fa-exclamation-triangle"></i>
            <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
          </div>
          <div class="card-body">
            <p class="card-text lead">El cliente no se ha registrado.</p>
            <a href="/veterinaria" class="btn btn-danger m-auto">Ir al menu </a>
          </div>
        </div>`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

var formCliente = document.getElementById("formCliente");

formCliente.onsubmit = (e) => {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("email").value;
  let dni = document.getElementById("dni").value;
  let direccion = document.getElementById("direccion").value;
  let telefono = document.getElementById("telefono").value;

  let cliente = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    dni: dni,
    direccion: direccion,
    telefono: telefono
  };

  let clientejson = JSON.stringify(cliente);
  createClient(clientejson);
  
};

function limpiarFormulario() {
  document.getElementById("formCliente").reset();
}