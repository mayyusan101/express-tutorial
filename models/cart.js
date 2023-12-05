const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(__dirname), 'data', 'cart.json');


module.exports = class Cart {

    static addToCart (id, price) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[], totalPrice: 0};
            if(!err) {
                // if file have already JSON data
                if(fileContent.toString().trim()) {
                    cart = JSON.parse(fileContent.toString());
                }

                const productIndex = cart.products.findIndex(p => p.id == id);
                const existProduct = cart.products[productIndex];
                let updateProduct;
                if(existProduct) {
                    updateProduct = {...existProduct};
                    updateProduct.qty = updateProduct.qty + 1;
                    cart.products = [...cart.products];
                    cart.products[productIndex] = updateProduct;
                }else{
                    updateProduct = { id: id, qty: 1 };
                    cart.products = [...cart.products, updateProduct]
                }
            }
            cart.totalPrice += Number(price);
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteProduct (id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            // no error && file have already JSON data
            if(!err && fileContent.toString().trim()) {
                let updatedCart = {...JSON.parse(fileContent)};
                const product = updatedCart.products.find(p => p.id === id);
                // if there is no product in cart
                if(!product) return; 
                const productQty = product.qty;
                updatedCart.products = updatedCart.products.filter(p => p.id !== id);
                updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);
                fs.writeFile(p, JSON.stringify(updatedCart), err => {
                    console.log(err);
                })
            }   
        })
    }

    static getCart = (cb) => {
        fs.readFile(p, (err, fileContent) => {
            if(err || !fileContent.toString().trim()) return cb(null);
            cb(JSON.parse(fileContent));
        })
    }
}

