import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../functions";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);
    }
    let logging = await login(credentials.email, credentials.password);
    if (loading) {
      setLoading(false);
    }
    if (logging.success) {
      toast.success(logging.message);
      localStorage.setItem("token", logging.token);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 3500);
    } else {
      setLoading(false);
      toast.error(logging.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "primary.main" };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <Grid mt={4}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <form onSubmit={onSubmit}>
            <TextField
              label="Email"
              placeholder="Enter Email"
              fullWidth
              required
              sx={{ my: 1 }}
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              sx={{ my: 1 }}
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={loading}
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>

              {loading && <CircularProgress size={24} />}
            </Stack>
          </form>
          <Typography>
            Do not have an account? <Link to="/">Sign Up</Link>
          </Typography>
        </Paper>
        <ToastContainer autoClose={1500} pauseOnHover={false} theme="colored" />
      </Grid>
    </>
  );
};

export default Login;
