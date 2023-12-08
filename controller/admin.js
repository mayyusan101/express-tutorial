const Product = require("../models/product.js");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add-Product",
    path: "/admin/add-product",
    editing: false,
  });
};
const postAddProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const desc = req.body.desc;

    const product = new Product(title, price, imageUrl, desc, null, req.user._id);
    const result = await product.save();
    console.log('Add result', result);
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("admin/products", {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    console.log(err);
  }
};
const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  const productId = req.params.productId;
  if (!editMode) {
    return res.redirect("/");
  }
  try {
    const product = await Product.findById(productId);
    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
    });
  } catch (err) {
    console.log(err);
  } 
};
const postEditProduct = async (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const desc = req.body.desc;

  const product = new Product(title, price, imageUrl, desc, productId, req.user._id);
  await product.save();
  res.redirect("/admin/products");
};
const getDeleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    await Product.deleteById(productId);
    res.redirect("/admin/products");
  } catch (er) {
    console.log(err);
  }
};
module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  getDeleteProduct,
};

