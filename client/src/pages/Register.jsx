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
import { useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import axios from "axios";

const Register = ({ mode, setMode }) => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      e.target.elements.password.value !==
      e.target.elements.passwordRepeat.value
    ) {
      toast.error("Passwords do not match.");
    } else {
      axios
        .post("http://localhost:5000/api/users/register", {
          username: e.target.elements.username.value,
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        })
        .then((receivedResponse) => {
          setIsPending(false);
          setError(null);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setIsPending(false);
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          setError(message);
          toast.error(error);
        });
    }
  };

  if (isPending) {
    return <Spinner />;
  }
  return (
    <Box>
      <NavBar setMode={setMode} mode={mode} />

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
          <form onSubmit={onSubmit}>
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
                  id="username"
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
                  id="email"
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
                  id="password"
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
                  id="passwordRepeat"
                />
              </FormControl>
              <Button variant="contained" type="submit">
                Sign up
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
