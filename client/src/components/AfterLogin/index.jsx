import { Box, Container } from "@mui/material";
import React from "react";
import AdminRoutes from "../AdminRoutes";
import Navbar from "../Navbar/";
import UserRoutes from "../UserRoutes";

const AfterLogin = () => {
  return (
    <>
      <Box height="100vh" overflow="hidden" width="100vw">
        <Navbar />
        <Container
          padding="30px 10px"
          sx={{ overflowY: "auto", height: "90vh" }}
        >
          {localStorage.getItem("isAdmin") === "true" ? (
            <AdminRoutes />
          ) : (
            <UserRoutes />
          )}
        </Container>
      </Box>
    </>
  );
};

export default AfterLogin;
