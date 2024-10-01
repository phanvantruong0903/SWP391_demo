const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
  {
    email: String,
    otp: String,
    create: {
      type: Date,
      default: Date.now,
      index: { expireAfterSeconds: 60 }, // hết hạn sau 60s
    },
  },
  {
    collection: "otp",
  }
);

module.exports = model("otp", otpSchema);
