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
import {
  AccountCircle,
  Email,
  Person,
  RemoveRedEye,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      passwordRepeat: e.target.elements.passwordRepeat.value,
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
          <Person fontSize="large" />
          <Typography variante="h1" fontSize={50}>
            Register
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
              <InputLabel>Email</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
                name="email"
                type="email"
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
            <FormControl variant="standard" margin="normal">
              <InputLabel>Password Repeat</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <RemoveRedEye />
                  </InputAdornment>
                }
                type="password"
                name="passwordRepeat"
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
