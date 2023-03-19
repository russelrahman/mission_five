const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/userController');
// import validator
const {validationRules,validationMsg} = require("../validation/userValidation");
const {loginValidationRules,loginValidationMsg} = require("../validation/loginValidation");


// login user
router.post('/login', loginValidationRules, loginValidationMsg, userController.loginUser);

module.exports = router;