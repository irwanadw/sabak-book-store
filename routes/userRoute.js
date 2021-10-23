const express = require("express");
const router = express.Router();
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("../middlewares/tokenMiddleware");

const userController = require("../controllers/user");

// router.get("/user/:id", verifyTokenAndAuthorization,userController.editUser)
router.put("/user/:id",verifyTokenAndAuthorization,userController.editUser);
router.delete("/user/:id",verifyTokenAndAdmin, userController.deleteUser);
router.get("/user/:id", verifyTokenAndAdmin, userController.getUser);
router.get("/user", verifyTokenAndAdmin, userController.getAllUser);
router.get("/user-status", verifyTokenAndAdmin, userController.getStatusUser);
module.exports = router;