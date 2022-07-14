import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  InputBase,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Drawer,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Home, ModeNight, Reorder } from "@mui/icons-material";
import { useState } from "react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  justifyContent: "space-between",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const NavBar = ({ ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { setMode, mode } = props;
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <Link to="/">
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch
                onChange={() => setMode(mode === "light" ? "dark" : "light")}
              ></Switch>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
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
          <Drawer
            anchor="left"
            open={drawerState["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
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
              <Link to="/login">
                <Button variant="outlined" style={{ color: "white" }}>
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" style={{ color: "white" }}>
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
};

export default NavBar;
