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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { username, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
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
                value={username}
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
