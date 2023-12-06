const db = require('../util/database.js');
const Cart = require('./cart.js');

const getProductsFromFile = cb => {
    
}
module.exports =  class Product {
    constructor({id, title, imageUrl, price, desc}) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = desc;
    }
    save() {
        return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.description, this.imageUrl]);
    }
    static fetchAll () {
        return db.execute('SELECT * FROM products')
    }
    static findProductByID (id) {
        return db.execute('SELECT * FROM products where id = ?', [id]);
    }
    static deleteProductByID (id) {
    }
}