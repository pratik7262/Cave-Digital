const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  borrowedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
