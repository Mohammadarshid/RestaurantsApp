//  create Resturant

const restourantModel = require("../models/restourantModel");

const resturantcontrollermodel = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // validations

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }

    const newResturant = new restourantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "New Returant Created Successfully",
      newResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Crate Resturant Api",
      error,
    });
  }
};

//  Get All Resturant

const getAllResturantController = async (req, res) => {
  try {
    const resturants = await restourantModel.find({});
    console.log(resturants);

    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturnat Available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      suucess: false,
      message: "Error in Get All Resturant API",
      error,
    });
  }
};

// get resturant  by id

const getResturantbyIdController = async (req, res) => {
  // console.log(getResturantbyIdController);

  try {
    const resturantsid = req.params.id;

    if (!resturantsid) {
      return res.status(404).send({
        success: false,
        message: "Please provide Resturant ID",
      });
    }
    // find resturant
    const resturant = await restourantModel.findById(resturantsid);

    console.log(resturant);

    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }

    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturant by id api",
      error,
    });
  }
};

// delete resturant ||detail
const deleteResturantController = async (req, res) => {
  try {
    const resturantid = req.params.id;

    if (!resturantid) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found or Provide Resturant id",
      });
    }
    await restourantModel.findByIdAndDelete(resturantid);

    res.status(200).send({
      success: true,
      message: "Resturant Deleted SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete resturant api",
    });
  }
};
module.exports = {
  resturantcontrollermodel,
  getAllResturantController,
  getResturantbyIdController,
  deleteResturantController,
};
