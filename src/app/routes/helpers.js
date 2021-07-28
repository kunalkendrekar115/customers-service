const { body, validationResult } = require("express-validator");

const validateUserData = () => [
  body("email").isEmail().withMessage("valid email is required "),
  body("name").notEmpty().withMessage("name is required"),
  body("mobileNumber")
    .isLength({
      min: 10,
      max: 10
    })
    .withMessage("valid mobile number is required"),
  body("password")
    .isLength({
      min: 6
    })
    .withMessage("Password should be min 6 digit long")
];

const isValidUserData = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(403).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = { validateUserData, isValidUserData };
