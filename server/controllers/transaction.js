const Transaction = require("../models/Transaction");
const { handleErrors } = require("../utils/routerUtils");

const getTransactions = async (req, res) => {
  try {
    const { id } = req.user;
    const transactions = await Transaction.find({ user: id });

    return res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

module.exports = { getTransactions };
