import { Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Transations = () => {
  const [transactions, setTransactions] = useState([]);
  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row: { date } }) => {
        const originalDate = new Date(date);

        const day = originalDate.getDate().toString().padStart(2, "0");
        const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
        const year = originalDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return <Typography variant="h6">{formattedDate}</Typography>;
      },
    },
    {
      field: "bookName",
      headerName: "Name",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { bookName } }) => {
        return <Typography variant="h6">{bookName}</Typography>;
      },
    },
    {
      field: "type",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      type: Date,
      align: "center",
      renderCell: ({ row: { type } }) => {
        return (
          <Button
            color={type === "Borrowed" ? "success" : "error"}
            variant="contained"
          >
            {type}
          </Button>
        );
      },
    },
  ];

  const getTransactions = async () => {
    const responce = await fetch(
      "http://localhost/api/transaction/gettransactions",
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const json = await responce.json();
    setTransactions(json.transactions);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Paper
      elevation={12}
      sx={{
        width: "100%",
        height: "87vh",
        mt: 2,
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "primary.main",
          border: "none",
          fontSize: "1rem",
          color: "white",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "primary.main",
          borderTop: "none",
          color: "white",
        },
        "& .css-hpjhlg-MuiTablePagination-root": {
          color: "white !important",
        },
      }}
    >
      <DataGrid rows={transactions} columns={columns} disableSelectionOnClick />
    </Paper>
  );
};

export default Transations;
