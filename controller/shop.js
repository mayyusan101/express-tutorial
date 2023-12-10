const Product = require("../models/product.js");
const Order = require("../models/order.js");

// all products
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .select("title price imageUrl description")
      .populate("userId", "name email -_id");
    res.render("shop/index", {
      products,
      pageTitle: "Products",
      path: "/products",
    });
  } catch (err) {
    console.log(err);
  }
};

const getIndex = async (req, res, next) => {
  try {
    const products = await Product.find()
      .select("title price imageUrl description")
      .populate("userId", "name email -_id");
    res.render("shop/index", {
      pageTitle: "Shop",
      products: products,
      path: "/",
    });
  } catch (err) {
    console.log(err);
  }
};
// single product
const getProduct = async (req, res, next) => {
  const id = req.params.productId;
  try {
    const product = await Product.findById(id);
    res.render("shop/product-details", {
      product: product,
      pageTitle: "Details",
      path: "/details",
    });
  } catch (err) {
    console.log(err);
  }
};

// Cart
const getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items;
    res.render("shop/cart", {
      products: products,
      pageTitle: "Cart",
      path: "/cart",
    });
  } catch (err) {
    console.log(err);
  }
};
// add cart item
const postCart = async (req, res, next) => {
  const productId = req.body.productId;
  await req.user.addToCart(productId);
  res.redirect("/cart");
};
// delete cart item
const postCartDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;
  await req.user.deleteItemFromCart(productId);
  res.redirect("/cart");
};

// Orders
const getOrders = async (req, res, next) => {
  const orders = await Order.find({ "user.userId": req.user._id });
  res.render("shop/orders", {
    orders,
    pageTitle: "Orders",
    path: "/orders",
  });
};

const postOrders = async (req, res, next) => {
  await req.user.addOrder();
  await req.user.clearCart();
  res.redirect("/cart");
};

// Checkout
const getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/checkout", {
      products,
      pageTitle: "Checkout",
      path: "/checkout",
    });
  });
};

module.exports = {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteProduct,
  postOrders,
};
