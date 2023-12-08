const { getDB } = require("../util/database");
const { ObjectId } = require("mongodb");
class Product {
  constructor(title, price, imageUrl, desc, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.desc = desc;
    this._id = id || null;
    this.userId = userId;
  }
  async save() {
    const db = getDB();
    if (this._id) {
      //update the product
      try {
        await db
          .collection("products")
          .updateOne({ _id: new ObjectId(this._id) }, { $set: {...this, _id: new ObjectId(this._id)} });
      } catch (err) {
        console.log(err);
      }
    } else {
       //Create new one if not exits
       await db.collection("products").insertOne(this);
    }
  }

  static async fetchAll() {
    const db = getDB();
    const products = await db.collection("products").find().toArray();
    return products;
  }

  static async findById(id) {
    const db = getDB();
    try {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteById(id){
    const db = getDB();
    try {
      await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(id) }, { $set: this });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Product;
