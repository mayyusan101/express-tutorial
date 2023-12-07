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
    // await Product.create(data);
    await req.user.createProduct({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      desc: req.body.desc,
    });
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
const getProducts = async (req, res, next) => {
  try {
    // const products = await Product.findAll();
    const products = await req.user.getProducts();
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
  const id = req.params.productId;
  if (!editMode) {
    return res.redirect("/");
  }
  try {
    // const product = await Product.findByPk(id);
    const products = await req.user.getProducts({ where: { id: id } }); // return collection array
    if (!products) res.redirect("/");
    res.render("admin/edit-product", {
      product: products[0],
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
    });
  } catch (err) {
    console.log(err);
  }
};
const postEditProduct = async (req, res, next) => {
  const id = req.body.productId;
  const updatedProduct = {
    id: id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    desc: req.body.desc,
  };
  await Product.update(updatedProduct, {
    where: {
      id: id,
    },
  });
  res.redirect("/admin/products");
};
const getDeleteProduct = async (req, res, next) => {
  const id = req.params.productId;
  try {
    await Product.destroy({ where: { id: id } });
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

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75ebrwvgVW5Ks_oLfCbG8Httf3_9g-Ynl_Q&usqp=CAU
