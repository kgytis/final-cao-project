import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { AccountCircle, RemoveRedEye } from "@mui/icons-material";
import { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    });
    console.log("submitted");
    console.log(formData);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: 600 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        sx={{ width: "50%" }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <LoginIcon fontSize="large" />
          <Typography variante="h1" fontSize={50}>
            Login
          </Typography>
        </Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <FormControl variant="standard" size="medium" margin="normal">
              <InputLabel>Username</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                name="username"
                type="text"
              />
            </FormControl>
            <FormControl variant="standard" margin="normal">
              <InputLabel>Password</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <RemoveRedEye />
                  </InputAdornment>
                }
                type="password"
                name="password"
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Login in
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
