// MUI related imports
import {
  AppBar,
  Typography,
  InputBase,
  Avatar,
  Box,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Reorder } from "@mui/icons-material";
// -----------------------------------------------------------
// React imports
import { useState } from "react";
import * as React from "react";
// -----------------------------------------------------------
// React router imports
import { Link, useNavigate } from "react-router-dom";
// -----------------------------------------------------------
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
// -----------------------------------------------------------
// Styled components imports
import {
  StyledToolbar,
  Search,
  Icons,
  UserBox,
} from "./styledComponents/NavBarStyled";
import StyledDrawer from "./styledComponents/StyledDrawer";

// -----------------------------------------------------------

const NavBar = ({ ...props }) => {
  // For MUI styling and dark/light mode
  const { setMode, mode } = props;
  // States for drawer (mobile version)
  const [drawerState, setDrawerState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };
  // -----------------------------------------------------------

  // Redux part
  const navigate = useNavigate(); // Needed to navigate after login or sign-up
  const dispatch = useDispatch(); // for state change triggering
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <React.Fragment>
          <IconButton
            onClick={toggleDrawer("left", true)}
            sx={{ display: { sm: "block", md: "none" }, padding: 1 }}
          >
            <Reorder
              style={{ color: "white" }}
              fontSize="medium"
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <StyledDrawer
            mode={mode}
            setMode={setMode}
            drawerState={drawerState}
            setDrawerState={setDrawerState}
          />
        </React.Fragment>
        <Box>
          <Link to="/home">
            <img
              src="https://seeklogo.com/images/F/Forum-logo-6948026C4B-seeklogo.com.png"
              alt="logo"
              style={{ height: "50px", width: "auto" }}
            />
          </Link>
        </Box>
        <Search sx={{ display: { xs: "none", md: "block" } }}>
          <InputBase placeholder="Search..." />
          {/* Add Autocomplete from MUI. Leis autocomplete'int paieska is jau turimu klausimu, gal visai nieko */}
        </Search>
        <Stack direction="row" spacing={2}>
          {user && (
            <>
              <Icons>
                <Typography variant="p">
                  You are logged in as : Johnny
                </Typography>
                <Avatar sx={{ width: "30", height: "30" }} />
              </Icons>
              <UserBox>
                <Avatar sx={{ width: "30", height: "30" }} />
                <Typography variant="span">John</Typography>
              </UserBox>
              <Button variant="contained" color="primary" onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button variant="contained" onClick={() => navigate("/login")}>
                Log in
              </Button>

              <Button variant="contained" onClick={() => navigate("/register")}>
                Sign in
              </Button>
            </>
          )}
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
};

export default NavBar;
