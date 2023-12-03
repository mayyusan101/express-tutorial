const express = require("express");
const router = express.Router();

const path = require("path");
const rootDir = require('../util/path.js');

router.get((req, res, next) => {
    console.log('router(mini express app) validation for this instance');
    next();
});

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { pageTitle: 'Add-Product', path: '/admin/add-product' });
});

let products = []
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
    // res.render('shop');

});

module.exports.routes = router;
module.exports.products = products;