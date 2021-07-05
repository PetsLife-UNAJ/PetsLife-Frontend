const express = require('express');
const router = express.Router();

// routes
router.get('/', (req, res) => {
    res.render('home.html');
});

router.get('/adoptions',(req,res) => {
    res.render('adoption/adoptions.html');
});

router.get('/clinic-history',(req,res) => {
    res.render('clinic-history/clinic-history.html');
});

router.get('/store',(req,res) => {
    res.render('store/store.html');
});

module.exports = router;