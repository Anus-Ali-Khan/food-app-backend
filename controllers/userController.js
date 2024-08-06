const userModel = require("../models/userModel");

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
    });
  }
};

//UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
};
