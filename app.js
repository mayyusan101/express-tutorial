const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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


app.listen(3000)
