import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBook = () => {
  const [info, setInfo] = useState({ name: "", author: "" });
  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const addBook = async () => {
    const response = await fetch("http://localhost/api/book/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(info),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success(json.message);
      setInfo({ name: "", author: "" });
    } else {
      toast.error(json.message);
    }
  };

  return (
    <>
      <Paper sx={{ p: 4, mt: 4 }} elevation={12}>
        <Grid gap={2} container>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            xs={12}
          >
            <Typography fontWeight={700} variant="h1">
              Add Book
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <TextField
              label="Name"
              placeholder="Enter Name Of Book"
              fullWidth
              required
              sx={{ my: 1 }}
              name="name"
              value={info.name}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label="Author"
              placeholder="Enter Author's Name"
              fullWidth
              required
              sx={{ my: 1 }}
              name="author"
              value={info.author}
              onChange={onChange}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
            xs={12}
            item
          >
            <Button size="large" onClick={addBook} variant="contained">
              Add Book
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default AddBook;
