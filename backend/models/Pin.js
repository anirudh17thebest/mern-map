const mongoose = require("mongoose");

const PinSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    description: {
      type: String,
      require: true,
      min: 3,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      require: true,
    },
    lon: {
      type: Number,
      require: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Pin", PinSchema);
