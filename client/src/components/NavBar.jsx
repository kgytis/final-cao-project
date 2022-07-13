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
} from "@mui/material";
import { Home, ModeNight, Reorder } from "@mui/icons-material";
import { useState } from "react";
import * as React from "react";

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
  const { setMode, mode } = props;
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
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
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
          <img
            src="https://seeklogo.com/images/F/Forum-logo-6948026C4B-seeklogo.com.png"
            alt="logo"
            style={{ height: "50px", width: "auto" }}
          />
        </Box>
        <Search sx={{ display: { xs: "none", md: "block" } }}>
          <InputBase placeholder="Search..." />
          {/* Add Autocomplete from MUI. Leis autocomplete'int paieska is jau turimu klausimu, gal visai nieko */}
        </Search>
        <Icons>
          <Typography variant="p">You are logged in as : Johnny</Typography>
          <Avatar sx={{ width: "30", height: "30" }} />
        </Icons>
        <UserBox>
          <Avatar sx={{ width: "30", height: "30" }} />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
    </AppBar>
  );
};

export default NavBar;
