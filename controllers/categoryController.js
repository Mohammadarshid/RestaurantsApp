const CategoaryModel = require("../models/CategoaryModel");
//  Create Cat
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validations
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
        categories
      });
    }
    const newCategory = new CategoaryModel({ title, imageUrl });
    console.log(newCategory);

    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Cat API",
      error,
    });
  }
};

//  GET ALL CAT
const getallController = async (req, res) => {
  try {
    const categories = await CategoaryModel.find({});
    console.log(categories);

    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in  get all Categoary Api",
      error,
    });
  }
};

//  Update Cate

const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatecate = await CategoaryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    console.log(updatecate);

    if (!updatecate) {
      return res.status(500).send({
        success: false,
        message: "No Categuary Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "categuary Updated Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

// delete Cate

const deleteCatContoller = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide Categoary id",
      });
    }

    const categuary = await CategoaryModel.findById(id);
    console.log(categuary);

    if (!categuary) {
      return res.status(500).send({
        success: false,
        message: "Error in Delete Cat Api",
        error,
      });
    }
    await CategoaryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "category Delete Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete Cat APi",
      error,
    });
  }
};

module.exports = {
  createCatController,
  getallController,
  updateCatController,
  deleteCatContoller,
};
