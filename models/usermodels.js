const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://storage.googleapis.com/msgsndr/Poa647Oe1YUX8DVrwFdy/media/6790d56fe54e4a6481443c7c.webp",
    },
    answer: {
      type: String,
      required:[true,"answer is required"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
