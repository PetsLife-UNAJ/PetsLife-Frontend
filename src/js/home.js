import {sesion, getPayload} from '../sesion.js';

window.onload = () => {

  if (sesion) {
    const payload = getPayload(sesion.token);
    let user = JSON.parse(payload.User);
    if (user.RolId==2) {
      location.href = '/admin/clinic';
    }
    
  }
 
};

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let info = {
    nombre: document.getElementById('nombre').value,
    correo: document.getElementById('correo').value,
    telefono: document.getElementById('telefono').value,
    mensaje: document.getElementById('mensaje').value
  };

  let message = {message: `Mensaje de *${info.nombre}* - *${info.telefono}* : ${info.mensaje}`}

  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  };

  var resp = fetch('/send-whatsapp', settings);
  document.getElementById('contactForm').reset();
});

