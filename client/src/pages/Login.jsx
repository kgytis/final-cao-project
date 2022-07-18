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
import LoginIcon from "@mui/icons-material/Login";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";

const Login = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", {
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      })
      .then((receivedResponse) => {
        setUser(receivedResponse);
        setIsPending(false);
        setError(null);
        setSuccess(true);
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
  };
  if (isPending) {
    return <Spinner />;
  }
  if (JSON.parse(localStorage.getItem("user"))) {
    navigate("/");
  }
  return (
    <>
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
            <LoginIcon fontSize="large" />
            <Typography variante="h1" fontSize={50}>
              Login
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
              <Button variant="contained" type="submit">
                Login in
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
