const express = require("express");
const {
  getuserController,
  updateuserController,
  resertpasswordcontroller,
  deleteProfileController,
  updatePasswordController,
} = require("../controllers/usercontroller");
const authmiddlewares = require("../middlewares/authmiddlewares");

const router = express.Router();

//  routes || GET USER
// get User||
router.get('/getuser', authmiddlewares, getuserController)


// router update Profile
router.put('/updateprofile', authmiddlewares, updateuserController)

// password update
router.post('/updatePassword',authmiddlewares,updatePasswordController)


// Reset Password
router.post('/resetpassword', resertpasswordcontroller)


// delete profile
router.delete("/delete/:id", authmiddlewares, deleteProfileController);

module.exports = router;
