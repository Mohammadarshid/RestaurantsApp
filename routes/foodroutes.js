const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const {
  createfoodController,
  getallfoodController,
  getSingleFoodController,
  getFoodByResturantController,
  updatefoodController,
  deletefoodController,
  placeordercontroller,
  orderStatusController,
} = require("../controllers/foodController");
const Adminmiddleware = require("../middlewares/Adminmiddleware");

const router = express.Router();

//  routes ||  resturant route in all

// Create Resturant || POST

router.post("/create", authmiddlewares, createfoodController);

// get all food

router.get("/getall", getallfoodController);

// get Single Foods
router.get("/get/:id", authmiddlewares, getSingleFoodController);

// GEt resturant BY RESt
router.get(
  "/getbyResturant/:id",
  authmiddlewares,
  getFoodByResturantController
);

// update Food
router.put("/update/:id", authmiddlewares, updatefoodController);

// delete Food
router.delete("/delete/:id", authmiddlewares, deletefoodController);



// Place Order

router.post('/placeorder', authmiddlewares, placeordercontroller)


// order pattern
router.post('/orderStatus/:id', authmiddlewares, Adminmiddleware, orderStatusController)
module.exports = router;
