const express = require("express");
const router = express.Router();

const {verifyTokenAndAdmin} = require("../middlewares/tokenMiddleware");
const ProductController = require("../controllers/product");

router.post("/product", verifyTokenAndAdmin, ProductController.addProduct);
router.put("/product/:id", verifyTokenAndAdmin, ProductController.editProduct);
router.delete("/product/:id", verifyTokenAndAdmin, ProductController.deleteProduct);
router.get("/product/:id", ProductController.getProduct);
router.get("/product", ProductController.getAllProduct)
module.exports = router;