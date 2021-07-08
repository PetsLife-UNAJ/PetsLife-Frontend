var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const indexRoute = require('./routes/index');
const nodeMailer = require('nodemailer');
require('dotenv').config();
const TWILIO_ACCOUNT_SID = 'AC9b98ce652e60c2b92cf3c1f5e50c2be0'
const TWILIO_AUTH_TOKEN = 'bdda36a89d40767f75307359eb91c3ec'

const twilio = require('twilio');
export const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);
// app.use(express.static(__dirname + '/src'));
// app.use('js', express.static(path.join(__dirname + 'js')));

app.use(express.static(__dirname));
//app.use('js', express.static(path.join(__dirname + 'js')));


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
// console.log(path.join(__dirname, 'js'))
app.use(express.static(path.join(__dirname, 'js')));
//app.use(express.static(__dirname));

//listening the server
app.listen(app.get('port'), () => {
  console.log(`Example app listening at http://localhost:${app.get('port')}/home`);
});





// client.messages
//   .create({
//     from: 'whatsapp:+14155238886',
//     to: 'whatsapp:+5491136735184',
//     body: 'Bienvenido a PetsLife 🎶I am _not_ ~pushing~ throwing away my *shot*!'
//   })
//   .then(message => {
//     console.log(message);
//   })
//   .catch(err => {
//     console.error(err);
//   });


