// MUI related imports
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Drawer,
} from "@mui/material";
import { Home, ModeNight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledDrawer = ({ ...props }) => {
  const { setMode, mode, drawerState, setDrawerState } = props;
  const navigate = useNavigate();
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
            <ListItemButton onClick={(e) => navigate("/")}>
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
    <Drawer
      anchor="left"
      open={drawerState["left"]}
      onClose={toggleDrawer("left", false)}
    >
      {list("left")}
    </Drawer>
  );
};

export default StyledDrawer;
