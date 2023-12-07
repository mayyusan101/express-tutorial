const Product = require("../models/product.js");
const Cart = require("../models/cart.js");
const CartItem = require("../models/cart-item.js");


const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
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
    const products = await Product.findAll();
    res.render("shop/index", {
      products: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.log(err);
  }
};

const getCart = async(req, res, next) => {
    try{
        const cart = await req.user.getCart();
        let products = [];
        if(cart){
         products = await cart.getProducts();
        }

        res.render("shop/cart", {
        products: products,
        pageTitle: "Cart",
        path: "/cart",
    });
    }catch(err){
        console.log(err);
    }
};
const getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/checkout", {
      products,
      pageTitle: "Checkout",
      path: "/checkout",
    });
  });
};
const getOrders = async(req, res, next) => {

  const orders = await req.user.getOrders(
  {
    include:['Products']
  }
  );
  res.render("shop/orders", {
    orders,
    pageTitle: "Orders",
    path: "/orders",
  });
};

const postOrders = async(req, res, next) => {
  const cart = await req.user.getCart(); // user cart
  const products = await cart.getProducts();// all products in cart
  const order = await req.user.createOrder();// create order for user

  products.map(async product => {
    const productQty = product.CartItem.qty; // reterive qty from cart-item
    await order.addProducts(product, {through: {qty: productQty}}); // add product to order-item
  });
  await cart.removeProducts(products, {through: CartItem});
  await Cart.destroy({
    where:{
      UserId: req.user.id
    }
  });
  //req.user.setCarts([]); // remove user cart
  res.redirect("/cart");
}
const getProduct = async (req, res, next) => {
  const id = req.params.productId;
  try {
    const product = await Product.findByPk(id);
    res.render("shop/product-details", {
      product: product,
      pageTitle: "Details",
      path: "/details",
    });
  } catch (err) {
    console.log(err);
  }
};

// add product to cart item
const postCart = async(req, res, next) => {
  const productId = req.body.productId;

  const userCart = await req.user.getCart();
  if(!userCart){
    await req.user.createCart();
  }
  // if cart have product
  const productsForUserCart = await userCart.getProducts(
    {
      where:{
        id: productId
      }
    }
  );
  if(productsForUserCart.length > 0){
    const productInCart = productsForUserCart[0];
    const addedQuantity = productInCart.CartItem.qty + 1;
    await userCart.addProduct(productInCart,{through: { qty: addedQuantity}})
  }else{
    // create cart-item for cart
    let newQuantity = 1;
    const product = await Product.findByPk(productId);
    await userCart.addProduct(product, {through: { qty: newQuantity}});
  }

  res.redirect('/cart');
};

const postCartDeleteProduct = async(req, res, next) => {
  const productId = req.body.productId;
  const userCart = await req.user.getCart();
  await userCart.removeProducts(productId); // pass instance or primary key
  res.redirect('/cart');
  // req.user.getCart()
  // .then(cart => {
  //   return cart.getProducts({where:{id:productId}}) 
  // })
  // .then(products => {
  //   const product = products[0];
  //   return product.CartItem.destroy();
  // })
  // .then(result => {
  //   res.redirect("/cart");
  // })
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
  postOrders
};
