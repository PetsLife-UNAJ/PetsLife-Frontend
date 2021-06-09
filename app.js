var bodyParser = require('body-parser');
const express = require('express');
const port = 3000;
const path = require('path');

const nodeMailer = require('nodemailer');
const app = express();

app.use(express.static(__dirname + '/src'));
app.use('js', express.static(path.join(__dirname + 'js')));

var jsonParser = bodyParser.json();
//Ejemplo
app.use('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/home.html'));
});
//
app.use('/add-client', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/clinic-history/add-client.html'));
});
app.use('/add-mascota', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/clinic-history/add-mascota.html'));
});

app.use('/veterinaria', (req, res) => {
  res.sendFile(
    path.join(__dirname, '/src/pages/clinic-history/clinic-history.html')
  );
});

// ---------------------------- STORE ----------------------------
app.use('/add-producto', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/store/add-producto.html'));
});

app.use('/producto/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/store/producto.html'));
});

app.use('/store', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/store/store.html'));
});

// ---------------------------------------------------------------

//Email turno
app.post('/send-email', jsonParser, (req, res) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      //insertar cuenta gmail para enviar mensajes
      user: '',
      pass: ''
    }
  });

  let mailOptions = {
    from: 'Pets Life',
    to: req.body.email,
    subject: 'Mensaje enviado desde la veterinaria PetsLife',
    html: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) res.status(500).send(error.message);
    else {
      console.log('Email enviado');
    }
  });
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/home.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/home`);
});
