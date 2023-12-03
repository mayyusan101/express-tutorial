const express = require("express");
const router = express.Router();

const path = require("path");
const rootDir = require('../util/path.js');

const { products } = require('./admin.js');

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'admin.html'))
    console.log('products', products);
    res.render('shop', { products, pageTitle: 'Shop', path: '/' });
});

module.exports = router;