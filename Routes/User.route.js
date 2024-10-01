const router = require("express").Router();

const authController = require("../controller/auth.Controller");
const tokenController = require("../controller/token.Controller");
const zaloPayment = require("../Services/zalopay.Payment");
const zalopayCallback = require("../Services/callback.Payment")
const zalopayOrderStatus = require("../Services/zalopay.OrderStatus");
const momoPayment = require("../Services/momo.Payment");

// authentication
router.post("/register", authController.registerUser);
router.get("/login", authController.authorizedUser);
router.post("/refresh-token", tokenController);

//payment zalopay
router.post("/paymentZalopay", zaloPayment);
router.post("/callback", zalopayCallback);
router.post("/order-status", zalopayOrderStatus);

//payment momo
router.post("/paymentMomo", momoPayment);

module.exports = router;
