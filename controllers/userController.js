const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//GET USER INFO
const getUserController = async (req, res) => {
  try {
    //find user
    console.log(req.body.id);
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //hide Password
    user.password = undefined;
    //resp
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

//UPDATE USER
const updateUserController = async (req, res) => {
  try {
    //find user
    console.log(req.body.id);
    const user = await userModel.findById({ _id: req.body.id }).exec();

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) {
      user.userName = userName;
    }
    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }
    await user.save();
    res.status(200).send({
      success: true,
      message: "user Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
      error,
    });
  }
};

//UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    //find
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }
    //check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    //hashing Password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update password API",
      error,
    });
  }
};

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(404).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      messsage: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Reset API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
};
