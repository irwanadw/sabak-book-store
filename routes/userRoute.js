const express = require("express");
const router = express.Router();
const {verifyTokenAndAuthorization} = require("../helpers/tokenHelpers");

const userController = require("../controllers/user");

// router.get("/user/:id", verifyTokenAndAuthorization,userController.editUser)
router.put("/user/:id",verifyTokenAndAuthorization,userController.editUser);
module.exports = router;