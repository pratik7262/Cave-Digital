const mongoose = require("mongoose");
const { Schema } = mongoose;
const uuid = require("uuid");

const TransactionSchema = Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  bookName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
  },
  id: {
    type: String,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
