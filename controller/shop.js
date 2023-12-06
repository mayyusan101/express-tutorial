const Product = require('../models/product.js');
const Cart = require('../models/cart.js')

const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-lists', { 
            products, 
            pageTitle: 'Shop', 
            path: '/products', 
            hasProduct: products.length > 0, 
            activeShop: true, 
            productCSS: true 
        });
    });
}

const getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index', { 
            products: rows, 
            pageTitle: 'Shop', 
            path: '/', 
        });
    })
    .catch(err => console.log(err));
    
}
const getCart = (req, res, next) => {

        Cart.getCart(cart => {
            Product.fetchAll(products => {
            const cartProducts = [];
            for(let product of products) {
                const cartProductData = cart.products.find(p => p.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }
            res.render('shop/cart', {
                products: cartProducts,
                pageTitle: 'Cart',
                path: '/cart'
            });
        });
    });
}
const getCheckout = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/checkout', { 
            products, 
            pageTitle: 'Checkout', 
            path: '/checkout', 
        });
    });
}
const getOrders = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/orders', { 
            products, 
            pageTitle: 'Orders', 
            path: '/orders', 
        });
    });
}
const getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findProductByID(id)
    .then(([product]) => {
        res.render('shop/product-details', { 
            product: product[0],
            pageTitle: 'Details', 
            path: '/details', 
        });
    })
    .catch(err => console.log(err));
}

// add product to cart item
const postCart = (req, res, next) => {
    const id = req.body.productId;
    Product.findProductByID(id, product => {
        Cart.addToCart(id, product.price);
        res.redirect('/');
    })
}

const postCartDeleteProduct = (req, res, next) => {
    const id = req.body.productId;
    Product.findProductByID(id, product => {
        Cart.deleteProduct(id, product.price);
        res.redirect('/cart');
    })
}

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProduct,
    postCart,
    postCartDeleteProduct
}