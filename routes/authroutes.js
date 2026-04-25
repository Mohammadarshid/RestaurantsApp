const express = require("express");
const { registercontroller, loginController } = require("../controllers/authcontroller");
const router = express.Router();

//  routes || Post
router.post("/register", registercontroller);

// login|| post
router.post("/login", loginController);



module.exports = router