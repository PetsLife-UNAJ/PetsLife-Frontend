const express = require('express');
const router = express.Router();

// Rutas iniciales
router.get('/', (req, res) => {
  res.render('home.html');
});
router.get('/home', (req, res) => {
  res.render('home.html');
});

router.get('/adoptions', (req, res) => {
  res.render('adoption/adoptions.html');
});

router.get('/clinic-history', (req, res) => {
  res.render('clinic-history/clinic-history.html');
});

router.get('/store', (req, res) => {
  res.render('store/store.html');
});

// Historia Clinica routes
router.get('/add-client', (req, res) => {
  res.render('clinic-history/add-cliente.html');
});

router.get('/add-mascota', (req, res) => {
  res.render('clinic-history/add-mascota.html');
});

router.get('/mis-turnos', (req, res) => {
  res.render('mis-turnos/mis-turnos.html');
});

//Adopciones routes
router.get('/add-Adoptable', (req, res) => {
  res.render('adoption/addAdoptable.html');
});

router.get('/lista-Adopciones', (req, res) => {
  res.render('adoption/adopciones.html');
});

//Store routes
router.get('/add-producto', (req, res) => {
  res.render('store/add-producto.html');
});

router.get('/producto/:id', (req, res) => {
  res.render('store/producto.html');
});

router.get('/cart', (req, res) => {
  res.render('store/carrito.html');
});

router.get('/lista-Adopciones', (req, res) => {
  res.render('adoption/adopciones.html');
});


// ------------------------ ADMINISTRATION ------------------------
router.get('/admin', (req, res) => {
  res.render('administration/admin.html');
});

router.get('/admin/clinic', (req, res) => {
  res.render('administration/admin-clinic.html');
});

router.get('/admin/store', (req, res) => {
  res.render('administration/admin-store.html');
});

router.get('/admin/adoptions', (req, res) => {
  res.render('administration/admin-adoptions.html');
});





module.exports = router;
