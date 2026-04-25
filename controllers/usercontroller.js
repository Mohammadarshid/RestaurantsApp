// get user info
const userModel = require("../models/usermodels");
const bcrypt = require("bcryptjs");

const getuserController = async (req, res) => {
   console.log(getuserController);
  
  
  try {
    // find user
    const user = await userModel.findById(req.body.id);
    console.log(req.body.user);
    
    //    validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user not found",
      });
    }
    // hide passsword
    user.password = undefined;
    // response
    res.status(200).send({
      status: true,
      message: "user  retrived  successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error inn get user",
      error,
    });
    res.status(200).send("user data");
    console.log(req.body.id);
  }
};

//  update User

const updateuserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
          console.log(user);
          
    //  validation

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //  get data_from user

    // //update user

    const { userName, email, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // Save User

    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    rea.status(500).send({
      success: false,
      message: "Error in update user API",
      error,
    });
  }
};

//  Reset Passsword
const resertpasswordcontroller = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "please  provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
      console.log(user);
      
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found invalid Answer",
      });
    }
    // hashing [password]

    var salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(newPassword, salt);
    user.password = hashpassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in password reset API",
      error,
    });
  }
};

// update User Password

const updatePasswordController = async (req, res) => {

  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    console.log(user, "user");

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    //  get data fron user
    const { oldPassword, newPassword } = req.body;
    // check old password
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "please  provide  old or new password ",
      });
    }
    
    //  check user password | compare Password

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .send({ success: false, message: "invalid old  Password" });
    }

    // hashing [password]
    var salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(newPassword, salt);
    console.log("New Hashed Password:", hashpassword);

    user.password = hashpassword;
    // await user.save();
    //     console.log("Stored Hashed Password After Update:", user.password);

    await userModel.findByIdAndUpdate(user._id, { password: hashpassword });

    res.status(200).send({
      success: true,
      message: "Password Updated succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password Api",
    });
  }
};

//  delete profile Controller
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    console.log();

    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Profile API",
      error,
    });
  }
  console.log(deleteProfileController);
};

module.exports = {
  getuserController,
  updateuserController,
  resertpasswordcontroller,
  updatePasswordController,
  deleteProfileController,
};
