const Product = require("../models/product.js");

// all products
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/product-lists", {
      products,
      pageTitle: "Shop",
      path: "/products",
    });
  } catch (err) {
    console.log(err);
  }
};

const getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      products: products,
      pageTitle: "Shop",
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
    const products = await req.user.getCart();
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
  console.log('product id', productId);
  await req.user.deleteItemFromCart(productId);
  res.redirect("/cart");
};

// Orders
const getOrders = async (req, res, next) => {
  const orders = await req.user.getOrders();
  res.render("shop/orders", {
    orders,
    pageTitle: "Orders",
    path: "/orders",
  });
};

const postOrders = async (req, res, next) => {
  await req.user.addOrder();
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
