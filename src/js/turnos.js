const getMascotasByClienteId = (clienteId) => {
  fetch(`https://localhost:44314/api/Cliente/${clienteId}`)
    .then((response) => response.json())
    .then((data) => {
      const place = document.getElementById("inputSelect");

      for (const mascota of data.mascotas) {
        let element = document.createElement("option");
        element.value = mascota.mascotaId;

        element.innerHTML = mascota.nombre;
        place.appendChild(element);
      }
    });
};

const createTurno = (datos) => {
  fetch("https://localhost:44314/api/Turno", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: datos,
  })
    .then((response) => {
      response.json();
      if (response.status == 201) {
        formTurno.innerHTML = ` <div class="card text-center p-0 my-2 ">
          <div class="card-header bg-transparent text-success border-0">
            <i class="far fa-check-circle display-4 d-block"></i>
            <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
          </div>
          <div class="card-body">
            <p class="card-text lead">El Turno se ha sido registrado con éxito.</p>
            <a href="/home" class="btn btn-primary m-auto">Ir al menu </a>
          </div>
        </div>`;
      }
      if (response.status == 400) {
        formTurno.innerHTML = ` <div class="card text-center p-0 my-2 ">
        <div class="card-header bg-transparent text-danger border-0">
        <i class="fas fa-exclamation-triangle"></i>
          <h5 class="card-title text-danger display-4 d-block">Registro Fallido</h5>
        </div>
        <div class="card-body">
          <p class="card-text lead">El Turno no se ha sido registrado.</p>
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
  getMascotasByClienteId(3);
};

const formTurno = document.getElementById("formTurno");
formTurno.onsubmit = (e) => {
  e.preventDefault();

  let mascotaId = document.getElementById("inputSelect").value;
  let fecha = formTurno.elements.fecha.value;
  let hora = formTurno.elements.hora.value;

  let turno = {
    fecha: fecha,
    mascotaId: mascotaId,
  };

  let validationHour = hora.substring(3, 5);

  if (validationHour == "00" || validationHour == "30") {
    console.log(validationHour);
    turno.horaInicio = hora;
  }

  let turnojson = JSON.stringify(turno);
    createTurno(turnojson);
  
};
