const Book = require("../models/Book");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { handleErrors, generateId } = require("../utils/routerUtils");

const createBook = async (req, res) => {
  try {
    const { name, author } = req.body;
    await Book.create({
      name,
      author,
    });

    return res.json({
      success: true,
      message: "Book Added Successfully",
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

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true });
    return res.json({
      success: true,
      books,
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

const getBorrowedBooks = async (req, res) => {
  try {
    const id = req.user.id;

    const books = await Book.find({ borrowedBy: id });
    return res.json({
      success: true,
      books,
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

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;
    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        isAvailable: false,
        borrowedBy: userId,
      },
      {
        new: true,
      }
    );

    const books = await Book.find({ isAvailable: true });

    const id = "b_" + generateId();

    await Transaction.create({
      user: userId,
      bookName: book.name,
      id,
      type: "Borrowed",
    });

    return res.json({
      success: true,
      message: "Book Borrowed Succcessfully",
      books,
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

const returnBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;
    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        isAvailable: true,
        borrowedBy: null,
      },
      {
        new: true,
      }
    );

    const books = await Book.find({ borrowedBy: userId });

    const id = "r_" + generateId();

    await Transaction.create({
      user: userId,
      bookName: book.name,
      id,
      type: "Returned",
    });

    return res.json({
      success: true,
      message: "Book Returned Succcessfully",
      books,
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

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);

    const books = await Book.find({ isAvailable: true });
    return res.json({
      success: true,
      message: "Book Deleted Succcessfully",
      books,
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

module.exports = {
  createBook,
  getBooks,
  borrowBook,
  returnBook,
  deleteBook,
  getBorrowedBooks,
};
