
const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(__dirname), 'data', 'products.json');
const Cart = require('./cart.js');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);
        }else {
            try {// for empty file
                cb(JSON.parse(fileContent));
            }catch {
                cb([]);
            }
        }
    });
}
module.exports =  class Product {
    constructor({id, title, imageUrl, price, desc}) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.desc = desc;
    }
    save() {
        getProductsFromFile(products => {
        // for update
        if(this.id) {
            const existProductIndex = products.findIndex(p => p.id === this.id);
            let updatedProducts =[...products];
            updatedProducts[existProductIndex] = this; // main
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                console.log(err);
            });
        }else{
            this.id = Math.random().toString(); // manually define id
            products.push(this); // must be inside arrow fun
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        }
        })
    }
    static fetchAll (cb) {
        getProductsFromFile(cb);
    }
    static findProductByID (id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
    static deleteProductByID (id) {
        getProductsFromFile(products => {
            const deleteProduct = products.find(p => p.id == id);
            let updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                // if not err, delete from cart
                if(!err) {
                    Cart.deleteProduct(id, deleteProduct.price);
                }
            })
        })
    }
}