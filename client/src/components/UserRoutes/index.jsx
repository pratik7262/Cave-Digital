import React from "react";
import { Route, Routes } from "react-router-dom";
import Books from "../Books";
import BorrowedBooks from "../BorrowedBooks";
import Transactions from "../Transactions";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/mybooks" element={<BorrowedBooks />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
};

export default UserRoutes;
