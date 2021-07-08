import { client } from '../src/index.js'

contactForm.addEventListener('submit', (event) => {

  event.preventDefault();
  let info = {
    nombre: document.getElementById('nombre').value,
    correo: document.getElementById('correo').value,
    telefono: document.getElementById('telefono').value,
    mensaje: document.getElementById('mensaje').value
  };

  client.messages
  .create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5491136735184',
    body: `Mensaje de *${info.nombre}* - *${info.telefono}* : ${info.mensaje}`
  })
  .then(message => {
    console.log(message);
  })
  .catch(err => {
    console.error(err);
  });
});

