const userModel = require("../models/usermodels");

module.exports = async (req, res, next) => {
  try {
    // get token from header
    const user = await userModel.findById(req.body.id);
    if (!user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "only Admin access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-Authorized Access",
      error,
    });
  }
};
