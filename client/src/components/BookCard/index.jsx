import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const BookCard = ({ book, setBooks, isBorrowed }) => {
  console.log(book);
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  const borrowBook = async () => {
    const response = await fetch(
      `http://localhost/api/book/borrow/${book._id}`,
      {
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setBooks(json.books);
    if (json.success) {
      toast.success(json.message);
    } else {
      toast.error(json.message);
    }
  };

  const returnBook = async () => {
    const response = await fetch(
      `http://localhost/api/book/return/${book._id}`,
      {
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setBooks(json.books);
    if (json.success) {
      toast.success(json.message);
    } else {
      toast.error(json.message);
    }
  };

  const removeBook = async () => {
    const response = await fetch(
      `http://localhost/api/book/delete/${book._id}`,
      {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setBooks(json.books);
    if (json.success) {
      toast.success(json.message);
    } else {
      toast.error(json.message);
    }
  };

  return (
    <Grid xs={12} sm={3} item>
      <Card
        sx={{
          width: "100%",
          maxHeight: "80vh",
          p: 0,
          m: 0,
        }}
      >
        <CardContent>
          <Typography textAlign="left" variant="h5" fontWeight={700}>
            {book.name}
          </Typography>
          <Typography textAlign="left" variant="h6">
            {book.author}
          </Typography>
        </CardContent>
        <CardActions>
          {isAdmin ? (
            <>
              <Button color="error" variant="contained" onClick={removeBook}>
                Remove Book
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ display: isBorrowed ? "none" : "block" }}
                variant="contained"
                onClick={borrowBook}
              >
                Borrow Book
              </Button>
              <Button
                sx={{ display: isBorrowed ? "block" : "none" }}
                variant="contained"
                onClick={returnBook}
              >
                Return Book
              </Button>
            </>
          )}
        </CardActions>
      </Card>
      <ToastContainer autoClose={1500} pauseOnHover={false} theme="colored" />
    </Grid>
  );
};

export default BookCard;
