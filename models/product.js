const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "product name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not valid",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
