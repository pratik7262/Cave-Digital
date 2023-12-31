const express = require("express");
const router = express.Router();
const { signUpRules, signInRules } = require("../utils/routerUtils");
const { signUp, signIn, fetchUser } = require("../controllers/auth.js");
const getUser = require("../middleware/fetchUser");
require("dotenv").config();

router.post("/signup", signUpRules, signUp);

router.post("/signin", signInRules, signIn);

router.get("/fetchuser", getUser, fetchUser);

module.exports = router;
