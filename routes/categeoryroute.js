const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const { createCatController, getallController, updateCatController, deleteCatContoller } = require("../controllers/categoryController");

const router = express.Router();

//  routes ||  resturant route in all

// Create Resturant || POST
router.post("/create", authmiddlewares, createCatController);


// get ALL CAT
router.get("/getAll", getallController);


// update Cat
router.put("/update/:id", authmiddlewares, updateCatController);

// delete cate

router.delete('/delete/:id', authmiddlewares,deleteCatContoller)

module.exports = router;
