const FoodModels = require("../models/FoodModels");
const ordermodel = require("../models/ordermodel");

const createfoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      FoodTags,
      Cataguary,
      code,
      isAvailabe,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "pleas Provide all fields",
      });
    }
    //   ek variable mai store kr liya hai
    const newFood = new FoodModels({
      title,
      description,
      price,
      imageUrl,
      FoodTags,
      Cataguary,
      code,
      isAvailabe,
      resturant,
      rating,
    });

    console.log(newFood);

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food  api",
    });
  }
};
//  get all Foods
const getallfoodController = async (req, res) => {
  try {
    const foods = await FoodModels.find({});
    console.log(foods);

    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food itemv is not found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "Error in Get All Foods API",
    });
  }
};

// get singlefood by id

const getSingleFoodController = async (req, res) => {
  try {
    const foodid = req.params.id;
    if (!foodid) {
      return res.status(404).send({
        success: false,
        message: "please prvoide id",
      });
    }
    const food = await FoodModels.findById(foodid);
    console.log(food);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this  id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error IN get Single  Food API",
      error,
    });
  }
};

//  Get FOOD By Resturant
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantid = req.params.id;
    console.log(resturantid);

    if (!resturantid) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await FoodModels.find({ resturant: resturantid });
    console.log(food);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on resturant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

//  update Food item
const updatefoodController = async (req, res) => {
  try {
    const FOODID = req.params.id;
    console.log(FOODID);
    if (!FOODID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await FoodModels.findById(FOODID);
    console.log(food);
    if (!FOODID) {
      return res.status(404).send({
        success: false,
        message: "no food  found",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      FoodTags,
      Cataguary,
      code,
      isAvailabe,
      resturant,
      rating,
    } = req.body;

    const updatefood = await FoodModels.findByIdAndUpdate(
      FOODID,
      {
        title,
        description,
        price,
        imageUrl,
        FoodTags,
        Cataguary,
        code,
        isAvailabe,
        resturant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item Was Updated",
    });
    console.log(updatefood);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update Food API",
      error,
    });
  }
};

const deletefoodController = async (req, res) => {
  try {
    const foodid = req.params.id;
    console.log(foodid);
    if (!foodid) {
      return res.status(400).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await FoodModels.findById(foodid);
    console.log(food);
    if (!foodid) {
      return res.status(404).send({
        success: false,
        message: "No food Found with id",
      });
    }

    await FoodModels.findByIdAndDelete(foodid);
    res.status(200).send({
      success: true,
      message: "food item deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Food API",
      error,
    });
  }
};

// place order  controller.
const placeordercontroller = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(300).send({
        success: false,
        message: "please food cart or payment method",
      });
    }
    let total = 0;
    //  calculated
    cart.map((i) => {
      total += i.price;
    });
      console.log(total);
      
    const neworder = new ordermodel({
      foods: cart,
      payment:total,
      buyer: req.body.id,
    });
      console.log(neworder);
       await neworder.save()
      res.status(201).send({
        success: true,
        message: " order placed Successfully",
        neworder,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order",
      error,
    });
  }
};



// change Order Status

const orderStatusController =async (req,res) => {
      try {
          const orderid = req.params.id
          console.log(orderid);
          
          if (!orderid) {
              return res.status(400).send({
                success: false,
                message: "please provide valid  order id",
              });
          }
          const { status } = req.body
          const order =await orderModel .findByIdAndUpdate(orderid,{status},{new:true})
          console.log(order);
          res.status(200).send({
              success: true,
              message:"order Status  updated"
          })
            
      } catch (error) {
              console.log(error);
              res.status(500).send({
                success: false,
                message: "Error in Order Status API",
                error,
              });

        
      }
}
module.exports = {
  createfoodController,
  getallfoodController,
  getSingleFoodController,
  getFoodByResturantController,
  updatefoodController,
  deletefoodController,
    placeordercontroller,
  orderStatusController
};
