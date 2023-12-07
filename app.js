const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// middleware
app.use(async(req, res, next) => {
    try{
        const user = await User.findByPk(1);
        req.user = user;
        next();
    }catch(err){
        console.log(err);
    }
});

// database
const sequlize = require('./util/database.js');
const Product = require("./models/product.js");
const User = require('./models/user.js');
const Cart = require('./models/cart.js');
const CartItem = require('./models/cart-item.js');
const Order = require('./models/order.js');
const OrderItem = require('./models/order-item.js');

// relationship
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, {through: CartItem});
Cart.belongsToMany(Product, {through: CartItem});
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

(async() => {
    await sequlize.sync();
    try{
        const user = await User.findByPk(1);
        if(!user){
            const user = await User.create({name:'mys', email: 'tes@gmail.com'});
            await user.createCart();
        }
        app.listen(3000); // start the server
    }catch(err){
        console.log(err);
    }
})();
// routes
const adminRoutes = require('./router/admin.js');
const shopRoutes = require('./router/shop.js');

// controller
const errorController = require('./controller/error.js');

// serve static file (.css)
app.use(express.static("public"));

// template engine
app.set("view engine", "ejs");
app.set("views", "views");

// route.prefix
app.use('/admin',adminRoutes);
app.use(shopRoutes);

// 404
app.use(errorController.get404);



