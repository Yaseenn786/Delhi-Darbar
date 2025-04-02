const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  items: [
    {
      name: String,
      price: Number,
    },
  ],
  total: Number,
  deliveryDate: String,
  deliveryTime: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
