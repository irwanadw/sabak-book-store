const express = require("express");
const router = express.Router();
const {
    verifyToken, 
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("../middlewares/tokenMiddleware");

const CartController = require("../controllers/cart");

router.post("/cart", verifyToken, CartController.addCart);
router.get("/cart/:userId", verifyTokenAndAuthorization, CartController.getCart);
router.get("/cart", verifyTokenAndAdmin, CartController.getAllCart);
router.put("/cart/:cartId", verifyTokenAndAuthorization, CartController.editCart);

module.exports = router