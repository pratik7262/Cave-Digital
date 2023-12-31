import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Checkbox,
} from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "../../functions";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
    }
    let signinngup = await signUp(
      credentials.name,
      credentials.email,
      credentials.contactNumber,
      credentials.password,
      checked
    );
    if (loading) {
      setLoading(false);
    }
    if (signinngup.success) {
      toast.success(signinngup.message);
      localStorage.setItem("token", signinngup.token);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setLoading(false);
      toast.error(signinngup.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    console.log(checked);
  };

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "primary.main" };

  return (
    <Grid mt={4}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={avatarStyle}>
            <AddCircleOutlineOutlined />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            name="name"
            required
            value={credentials.name}
            onChange={onChange}
            label="Name"
            placeholder="Enter your name"
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter your email"
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            type="number"
            required
            value={credentials.contactNumber}
            onChange={onChange}
            sx={{ my: 1 }}
            placeholder="Enter your Contact Number"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            required
            value={credentials.password}
            onChange={onChange}
            sx={{ my: 1 }}
            placeholder="Enter your password"
          />
          <Stack sx={{ alignItems: "center" }} direction="row">
            <Checkbox
              sx={{ pl: 0 }}
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="h6">Make This User Admin</Typography>
          </Stack>
          <Stack spacing={2} sx={{ alignItems: "center", my: 1 }}>
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              fullWidth
              color="primary"
            >
              Sign up
            </Button>
            {loading && <CircularProgress size={24} />}
          </Stack>
        </form>
        <Typography>
          Already Have An Account? <Link to="/login">Log In</Link>
        </Typography>
      </Paper>
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
    </Grid>
  );
};

export default Signup;
