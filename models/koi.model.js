const { Schema, model } = require("mongoose");

const fishSchema = new Schema(
  {
    breed: { type: String, required: true },
    origin: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, require: true },
    size: { type: Number, required: true },
    description: { type: String, required: true },
    personality: { type: String, required: true },
    dailyFoodAmount: { type: String, required: true },
    filteringRadio: { type: String, required: true },
    certificate: { type: String },
    status: { type: Boolean, required: true, default: false },
    price: { type: Number, required: true },
  },
  {
    collection: "fishs",
    timestamps: true,
  }
);

module.exports = model("fishs", fishSchema);
