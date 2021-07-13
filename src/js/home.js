import {changeIcon, checkLogin} from '../login/login.js';

window.onload = () => {

  // changeIcon();
  // checkLogin();
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

