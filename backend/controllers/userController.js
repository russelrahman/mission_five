// import uuid for generate user id
const { v4: uuidv4 } = require("uuid");
// import userModel
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// login user
exports.loginUser = async (req, res) => {
  try {
    // console.log("login user");
    const { email, password } = req.body;
    // check email exist or not
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(400).json({
        message: "Email is not Exist!!",
      });
    }
    // check password (authenticate function ta userModel theke use krci)
    if (!findUser.authenticate(password)) {
      return res.status(400).json({
        message: "Password do not match!!",
      });
    }
    // create token
    const token = jwt.sign({ id: findUser.id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 1 });
    // get user data
    const { id, name, } = findUser;
    // return response
    return res.status(200).json({
      message: "User login Successfully",
      id,
      name,
      email,
      token,
    });
  } catch (error) {
    // return error message
    res.status(400).send(error.message);
  }
};

