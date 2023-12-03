const path = require('path');

const express = require("express");
const app = express();

const rootDir = require('./util/path.js');


// routes
const adminData = require('./router/admin.js');
const shopRoutes = require('./router/shop.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static file
app.use(express.static("public"));

// template engine

app.set("view engine", "pug");
app.set("views", "views");


// route.prefix
app.use('/admin',adminData.routes);
app.use(shopRoutes);

// 404
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: '404' });
});


app.listen(3000)
// const server = http.createServer(app);
// server.listen(3000, () => console.log("server is running"));