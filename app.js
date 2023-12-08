const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// models
const User = require("./models/user.js");

// middleware
app.use(async (req, res, next) => {

  const user = await User.findById('6572930aacff9700317d66d4');
  req.user = new User(user.name, user.email, user.cart, user._id);
  next();
});

// database
const { mongoConnect } = require("./util/database.js");
(async () => {
  try {
    await mongoConnect();
    console.log("Connected!");
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
})();


// routes
const adminRoutes = require("./router/admin.js");
const shopRoutes = require('./router/shop.js');

// controller
const errorController = require("./controller/error.js");

// serve static file (.css)
app.use(express.static("public"));

// template engine
app.set("view engine", "ejs");
app.set("views", "views");

// route.prefix
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404
app.use(errorController.get404);
