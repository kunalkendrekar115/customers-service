const express = require("express");
const { verifyToken } = require("../auth");

const { signupController, loginController, profileController } = require("../controllers");
const { validateUserData, isValidUserData } = require("./helpers");

const router = express.Router();

router.post("/signup", validateUserData(), isValidUserData, signupController);

router.post("/login", loginController);

router.get("/profile", verifyToken, profileController);

module.exports = { router };
