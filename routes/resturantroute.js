const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const {
  resturantcontrollermodel,
  getAllResturantController,
  getResturantbyIdController,
  deleteResturantController,
} = require("../controllers/resturantcontroller");

const router = express.Router();

//  routes ||  resturant route in all

// Create Resturant || POST


router.post('/create', authmiddlewares,resturantcontrollermodel )


//  GET ALL RESTURANT ||POST

router.get("/getall", getAllResturantController);


// get Resturant by id || GET

router.get("/get/:id", getResturantbyIdController);


// DELETE RESTURANT by id || DELETE

router.delete("/delete/:id", authmiddlewares, deleteResturantController);
module.exports = router;
