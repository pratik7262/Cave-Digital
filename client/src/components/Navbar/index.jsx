import {
  AppBar,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { UserProfile } from "../UserProfile";
import { useEffect, useState } from "react";
import {
  AutoStoriesOutlined,
  CloseOutlined,
  LibraryBooksOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
// import React, { useEffect, useState } from "react";
// require("dotenv").config();

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const userPages = [
    {
      title: "Books",
      icon: <LibraryBooksOutlined sx={{ color: "black" }} />,
      path: "/",
    },
    {
      title: "My Books",
      icon: <AutoStoriesOutlined sx={{ color: "black" }} />,
      path: "/mybooks",
    },
    {
      title: "Transactions",
      icon: <ReceiptLongOutlined sx={{ color: "black" }} />,
      path: "/transactions",
    },
  ];

  const adminPages = [
    {
      title: "Books",
      icon: <LibraryBooksOutlined sx={{ color: "black" }} />,
      path: "/",
    },
    {
      title: "Add Book",
      icon: <AutoStoriesOutlined sx={{ color: "black" }} />,
      path: "/addbook",
    },
  ];

  const onClick = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.getItem("isAdmin") === "true"
      ? setPages(adminPages)
      : setPages(userPages);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppBar color="primary" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={onClick}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page.title}
                  style={{ textDecoration: "none" }}
                  to={page.path}
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Box>
                <UserProfile />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        <Stack direction="row-reverse" sx={{ height: "30vh" }}>
          <Stack direction="row-reverse" width="10%">
            <IconButton
              sx={{ width: "10%", height: "10%", m: 1 }}
              onClick={onClose}
            >
              <CloseOutlined sx={{ color: "black" }} />
            </IconButton>
          </Stack>
          <List sx={{ width: "90%" }}>
            {pages.map((page) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  key={page.title}
                  to={page.path}
                >
                  <ListItem key={page.title} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{page.icon}</ListItemIcon>
                      <ListItemText primary={page.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Stack>
      </Drawer>
    </>
  );
};

export default Navbar;
