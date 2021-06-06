const getCliente = () => {
    fetch(`https://localhost:44314/api/Cliente`)
      .then((response) => response.json())
      .then((clientes) => {

        const select = document.getElementById("cliente");

        for (const client of clientes) {
          let element = document.createElement("option");
          element.value = client.clienteId;
          element.innerHTML = client.nombre;
          select.appendChild(element);
        }
      });
  };

const createMascota = (datos) => {
    fetch("https://localhost:44314/api/Mascota", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: datos,
    })
      .then((response) => {
        response.json();
        if (response.status == 201) {
          formMascota.innerHTML = ` <div class="card text-center p-0 my-2 ">
            <div class="card-header bg-transparent text-success border-0">
              <i class="far fa-check-circle display-4 d-block"></i>
              <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
            </div>
            <div class="card-body">
              <p class="card-text lead">La mascota se ha sido registrado con éxito.</p>
              <a href="/home" class="btn btn-primary m-auto">Ir al menu </a>
            </div>
          </div>`;
        }
        if (response.status == 400) {
            formMascota.innerHTML = ` <div class="card text-center p-0 my-2 ">
          <div class="card-header bg-transparent text-danger border-0">
          <i class="fas fa-exclamation-triangle"></i>
            <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
          </div>
          <div class="card-body">
            <p class="card-text lead">La mascota no se ha sido registrado.</p>
            <a href="/home" class="btn btn-danger m-auto">Ir al menu </a>
          </div>
        </div>`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

window.onload = (e) => {
    getCliente();
};

var formMascota = document.getElementById("formMascota");

formMascota.onsubmit = (e) => {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let edad = document.getElementById("edad").value;
  let peso = document.getElementById("peso").value;
  let cliente = document.getElementById("cliente").value;

  let mascota = {
    nombre: nombre,
    edad: edad,
    peso: peso,
    clienteId: cliente
  };

  let mascotajson = JSON.stringify(mascota);
  createMascota(mascotajson);
  
};
