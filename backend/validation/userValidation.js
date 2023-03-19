// import validator
const { check, validationResult } = require("express-validator");
// import user model
const User = require("../models/userModel");

// validation rules
exports.validationRules = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 chars long")
    .isLength({ max: 12 })
    .withMessage(" Name must be less than 12 chars long")
    .trim()
    .matches(/^[A-Za-z0-9\_]+$/)
    .withMessage("Name must be alphanumeric only")
    .escape(),
  check("email").notEmpty()
  .withMessage("Email is required")
  .normalizeEmail()
  .isEmail()
  .withMessage("Invalid email!")
  .exists()
  .custom(async (email) => {
    const value = await User.findOne({ email: email });
    if (value) {
      throw new Error("Email is already exists!!!");
    }
  }),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

// validation message
exports.validationMsg = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ 
    success: false, 
    code: 400,
    message: error 
  });
};
