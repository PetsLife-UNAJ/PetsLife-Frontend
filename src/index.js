var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const indexRoute = require('./routes/index');
const nodeMailer = require('nodemailer');

// app.use(express.static(__dirname + '/src'));
// app.use('js', express.static(path.join(__dirname + 'js')));

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

// routes
app.use(indexRoute);

// static files
app.use(express.static(path.join(__dirname, 'assets')));

//listening the server
app.listen(app.get('port'));




//RUTAS VIEJAS REVISAR
// app.use('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/home.html'));
// });




// app.use('/add-client', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/clinic-history/add-client.html'));
// });
// app.use('/add-mascota', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/clinic-history/add-mascota.html'));
// });

// app.use('/veterinaria', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '/src/pages/clinic-history/clinic-history.html')
//   );
// });


// // ---------------------------- STORE ----------------------------
// app.use('/add-producto', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/store/add-producto.html'));
// });

// app.use('/producto/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/store/producto.html'));
// });

// app.use('/store', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/store/store.html'));
// });

// app.use("/cart", (req, res) => {
//   res.sendFile(
//       path.join(__dirname, "/src/pages/store/carrito.html")
//   );
// });

// // ------------------------ ADMINISTRATION ------------------------

// app.use('/administracion', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/administration.html'));
// });

// app.use('/usuarios', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/prueba.html'));
// });

// // ------------------------ USUARIO ------------------------

// app.use('/users', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/pages/users/users-home.html'));
// });

// // ----------------------------Adoptions----------------------------
// app.use("/add-Adoptable", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/src/pages/adoption/addAdoptable.html")
//   );
// });

// app.use("/adoptions", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/src/pages/adoption/adoptions.html")
//   );
// });

// app.use("/lista-Adopciones", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/src/pages/adoption/adopciones.html")
//   );
// });

// app.use("/mis-turnos", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/src/pages/mis-turnos/mis-turnos.html")
//   );
// });

// ---------------------------------------------------------------
