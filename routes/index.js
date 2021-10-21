const express = require("express");
const router = express.Router();

const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

router.use("/api", authRoute);
router.use("/api", userRoute);

module.exports = router;