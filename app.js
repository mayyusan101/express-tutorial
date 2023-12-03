const path = require('path');

const express = require("express");
const app = express();
const { engine } = require('express-handlebars');

const rootDir = require('./util/path.js');


// routes
const adminData = require('./router/admin.js');
const shopRoutes = require('./router/shop.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static file (.css)
app.use(express.static("public"));

// template engine
app.engine('hbs', engine({ defaultLayout: 'main-layout', extname: 'hbs'}));

app.set("view engine", "hbs");
app.set("views", "views");


// route.prefix
app.use('/admin',adminData.routes);
app.use(shopRoutes);

// 404
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: '404', productCSS: true });
});


app.listen(3000)
// const server = http.createServer(app);
// server.listen(3000, () => console.log("server is running"));