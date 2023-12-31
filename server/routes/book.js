const express = require("express");
const {
  getBooks,
  borrowBook,
  returnBook,
  deleteBook,
  getBorrowedBooks,
  createBook,
} = require("../controllers/book");
const getUser = require("../middleware/fetchUser");
const router = express.Router();

router.post("/create", getUser, createBook);

router.get("/getbooks", getBooks);

router.get("/getborrowedbooks", getUser, getBorrowedBooks);

router.patch("/borrow/:bookId", getUser, borrowBook);

router.patch("/return/:bookId", getUser, returnBook);

router.delete("/delete/:bookId", getUser, deleteBook);

module.exports = router;
