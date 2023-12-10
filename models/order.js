const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItem = {
  product: {
    type: Object,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
};

const orderSchema = new Schema({
  products: [orderItem],
  user: {
    name: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
