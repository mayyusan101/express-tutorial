const express = require("express");
const router = express.Router();

const adminController = require('../controller/admin.js');

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/delete-product/:productId', adminController.getDeleteProduct);

// admin/products => GET
router.get('/products', adminController.getProducts);

module.exports = router;