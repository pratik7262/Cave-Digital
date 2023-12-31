import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBook from "../AddBook";
import Books from "../Books";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/addbook" element={<AddBook />} />
    </Routes>
  );
};

export default AdminRoutes;
