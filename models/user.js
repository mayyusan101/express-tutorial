const mongoose = require("mongoose");
const { Schema } = mongoose;
const Order = require("./order");

const item = {
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
};

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  cart: {
    items: [item],
  },
});

// not arrow function
const addToCart = function (productId) {
  const updatedCartItem = [...this.cart.items];
  const existProductIndex = updatedCartItem.findIndex(
    (p) => p.productId.toString() === productId.toString()
  );
  if (existProductIndex >= 0) {
    updatedCartItem[existProductIndex].quantity =
      this.cart.items[existProductIndex].quantity + 1;
  } else {
    updatedCartItem.push({ productId: productId, quantity: 1 });
  }
  const updatedCart = {
    items: updatedCartItem,
  };
  this.cart = updatedCart;
  return this.save();
};

// delete cart item
const deleteItemFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

// add order
const addOrder = async function () {
  try {
    const user = await this.populate({ path: "cart.items.productId" });
    const cartItems = user.cart.items; // all product data in item
    const ordersArray = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        product: { ...item.productId._doc }, // transform productId to product bez it was populate
      };
    });
    const order = {
      products: ordersArray,
      user: {
        name: this.name,
        userId: this._id,
      },
    };
    return await Order.create(order);
  } catch (err) {
    console.log(err);
  }
};

const clearCart = function () {
  const updatedCart = {
    items: [],
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.method({
  addToCart,
  deleteItemFromCart,
  addOrder,
  clearCart,
});
module.exports = mongoose.model("User", userSchema);
