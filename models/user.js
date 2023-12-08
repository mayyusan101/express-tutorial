const { ObjectId } = require("mongodb");
const { getDB } = require("../util/database");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  async save() {
    try {
      const db = getDB();
      const user = db.collection("users").insertOne(this);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  static async findById(userId) {
    const db = getDB();
    try {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  // Cart
  async getCart() {
    const productIdsInCart = this.cart.items.map((item) => item.productId);
    const db = getDB();
    const allProducts = await db
      .collection("products")
      .find({ _id: { $in: productIdsInCart } })
      .toArray();
    const allCartItems = allProducts.map((product) => {
      const cartItem = this.cart.items.find(
        (item) => item.productId.toString() === product._id.toString() // .toString() must
      );
      return { ...product, quantity: cartItem.quantity };
    });
    return allCartItems;
  }
  async addToCart(productId) {
    const updatedCartItem = [...this.cart.items];
    const existProductIndex = updatedCartItem.findIndex(
      (p) => p.productId.toString() === productId.toString()
    );
    if (existProductIndex >= 0) {
      updatedCartItem[existProductIndex].quantity =
        this.cart.items[existProductIndex].quantity + 1;
    } else {
      updatedCartItem.push({ productId: new ObjectId(productId), quantity: 1 });
    }
    const updatedCart = {
      items: updatedCartItem,
    };
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  async deleteItemFromCart(productId){
    const db = getDB();
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
    const updatedCart = {
      items: updatedCartItems,
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  // Orders
   getOrders(){
    const db = getDB();
    try{
      return db.collection("orders").find({'user._id': new ObjectId(this._id)}).toArray();
    }catch(err){
      console.log(err);
    }
  }
  async addOrder(){
    const db = getDB();
    try{
      const productsInCart = await this.getCart();
      const orders = {
        items: productsInCart,
        user: {
          _id: new ObjectId(this._id),
          name: this.name
        }
      }
      await db.collection("orders").insertOne(orders);
      // clear the cart
      const updatedCart = {
        items:[]
      }
      return await db.collection("users").updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
    }catch(err){
      console.log(err);
    }
  }
}

module.exports = User;
