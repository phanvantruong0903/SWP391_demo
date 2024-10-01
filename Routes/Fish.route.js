const router = require("express").Router();

const fishController = require("../controller/fish.Controller");

router.post("/addFish", fishController.createKoi);

module.exports = router
