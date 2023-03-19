// import validator
const { check, validationResult } = require("express-validator");
// import category model
const Category = require("../models/categoryModel");

// validation rules
exports.categoryValidationRules = [
  check("category_name")
    .notEmpty()
    .withMessage("Category name is required")
    .trim()
    .custom(async (category_name) => {
      const value = await Category.findOne({ category_name: category_name });
      if (value) {
        throw new Error("Category name is already exists!!!");
      }
    }),
  check("status")
    .notEmpty()
    .withMessage("Status is required"), 
    check("user_id")
    .notEmpty()
    .withMessage("User Id is required"),
];

// validation message
exports.categoryValidationMsg = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ 
    success: false, 
    code: 400,
    message: error 
  });
};
