const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// models
const User = require("./models/user.js");

// middleware
app.use(async (req, res, next) => {
  const user = await User.findById("657579f0106d97be1c9fca6e");
  if(user){
    req.user = user;
  }else{
    await User.create({
      name:'mys',
      email:'mayyusan@gmail.com',
      cart:{
        items: []
      }
    });
  }
  next();
});

// database
const mongoose = require("mongoose");
const uri = 'mongodb+srv://mayyusan:kbODXCsIy6MSE6GH@cluster11.bqjomji.mongodb.net/shop';
(async() => {
  try{
    await mongoose.connect(uri, {
      dbName: 'shop',
    });
    console.log('Connected!');
    app.listen(3000);
  }catch(err){
    console.log(err);
  }
})()



// routes
const adminRoutes = require("./router/admin.js");
const shopRoutes = require('./router/shop.js');
// route.prefix
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// controller
const errorController = require("./controller/error.js");

// serve static file (.css)
app.use(express.static("public"));

// template engine
app.set("view engine", "ejs");
app.set("views", "views");



// 404
app.use(errorController.get404);

