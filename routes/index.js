const express = require("express");
const router = express.Router();

const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");

router.use("/api", authRoute);
router.use("/api", userRoute);
router.use("/api", productRoute);
router.use("/api", cartRoute);

module.exports = router;