var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const indexRoute = require('./routes/index');
const nodeMailer = require('nodemailer');
require('dotenv').config();

// app.use(express.static(__dirname + '/src'));
// app.use('js', express.static(path.join(__dirname + 'js')));

app.use(express.static(__dirname));

var jsonParser = bodyParser.json();

//settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Email turno
app.post('/send-email', jsonParser, (req, res) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      //insertar cuenta gmail para enviar mensajes
      user: process.env.EMAIL || '',
      pass: process.env.PASSWORD || ''
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

// routes
app.use(indexRoute);

// static files
app.use(express.static(path.join(__dirname, 'assets')));

// static js
console.log(path.join(__dirname, 'js'))
app.use(express.static(path.join(__dirname, 'js')));

//listening the server
app.listen(app.get('port'), () => {
  console.log(`Example app listening at http://localhost:${app.get('port')}`);
});
