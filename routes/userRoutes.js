const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);

//UPDATE PASSWORD
router.put("/updatePassword", authMiddleware, updatePasswordController);

module.exports = router;
