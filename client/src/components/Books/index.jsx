import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import BookCard from "../BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    const response = await fetch("http://localhost/api/book/getbooks");
    const json = await response.json();
    console.log(json);
    setBooks(json.books);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Grid
      rowSpacing={3}
      direction="row"
      columnSpacing={{ xs: 0, sm: 1 }}
      container
      ml={{ sm: undefined }}
      p={2}
      width="100%"
    >
      {books.map((book) => {
        return (
          <BookCard
            key={`book-card-${book._id}`}
            book={book}
            setBooks={setBooks}
          />
        );
      })}
    </Grid>
  );
};

export default Books;
