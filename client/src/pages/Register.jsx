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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const { username, email, password, passwordRepeat } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      toast.error("Passwords do not match.");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
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
                value={username}
                onChange={onChange}
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
                value={email}
                onChange={onChange}
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
                value={password}
                onChange={onChange}
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
                value={passwordRepeat}
                onChange={onChange}
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
