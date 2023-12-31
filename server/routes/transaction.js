const express = require("express");
const { getTransactions } = require("../controllers/transaction");
const getUser = require("../middleware/fetchUser");
const router = express.Router();

router.get("/gettransactions", getUser, getTransactions);

module.exports = router;
