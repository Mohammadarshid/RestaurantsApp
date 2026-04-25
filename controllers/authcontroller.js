const userModel = require("../models/usermodels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const registercontroller = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;
    // validation

    if (!userName || !email || !password || !address || !phone || !answer) {
      return res
        .status(400)
        .send({ success: false, message: "please Provide All Fields" });
    }
    // check user

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "Email already  register please  login",
      });
    }
    // hashing [password]

    var salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(password, salt);
    //  Create User
    const user = await userModel.create({
      userName,
      email,
      password: hashpassword,
      address,
      phone,
      answer,
    });
    res
      .status(200)
      .send({ success: true, message: "Sucessfully Registered", user });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Register API" });
  }
};
//  login Fuctionality

const loginController = async (req, res) => {
   console.log(loginController);

  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res
        .status(500)
        .send({ success: false, message: "please  provide all  fields", user });
    }
    // check user
    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found password Mismatch ",
      });
    }

    //  check user password  || compare Passsword
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .send({ success: false, message: "invalid Credentilas" });
    }

    //  JWT Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res
      .status(200)
      .send({ success: true, token, message: "login Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Register Api" });
    error;
  }
};

module.exports = { registercontroller, loginController };
