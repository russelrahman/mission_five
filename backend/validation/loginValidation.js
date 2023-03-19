// import validator
const { check, validationResult } = require("express-validator");

// validation rules
exports.loginValidationRules = [
  check("email").notEmpty()
  .withMessage("Email is required")
  .normalizeEmail()
  .isEmail()
  .withMessage("Invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty!")
];

// validation message
exports.loginValidationMsg = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ 
    success: false, 
    code: 400,
    message: error 
  });
};
