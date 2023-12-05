const Product = require('../models/product.js');

const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', 
    { 
        pageTitle: 'Add-Product', 
        path: '/admin/add-product',
        editing:false 
    });
}

const postAddProduct = (req, res, next) => {
    const data = {
        id: null, // for differentiate between edit & add
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        desc: req.body.desc,
    }
    const product = new Product(data);
    product.save();
    res.redirect('/');
}


const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', { 
            products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products', 
        });
    });
}

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const id = req.params.productId;
    if(!editMode) {
        return res.redirect('/');
    }
    Product.findProductByID(id, product => {
        if(!product) res.redirect('/');
        res.render('admin/edit-product', { 
            product, 
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product', 
            editing: editMode
        });
    });
}

const postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    console.log('id', id);
    const product = {
        id: id,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        desc: req.body.desc
    } 
    const updatedProduct = new Product(product);
    updatedProduct.save();
    res.redirect('/admin/products');
}

const getDeleteProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteProductByID(id);
    res.redirect('/admin/products');
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    getDeleteProduct
}