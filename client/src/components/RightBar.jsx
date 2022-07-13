import * as React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

const RightBar = () => {
  return (
    <Box flex={2} padding={2} sx={{ display: { sm: "none", md: "block" } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Forum users
        </Typography>
        <AvatarGroup max={6}>
          <Avatar alt="user1" src="" />
          <Avatar alt="user2" />
          <Avatar alt="user3" />
          <Avatar alt="user4" />
          <Avatar alt="user5" />
          <Avatar alt="user6" />
          <Avatar alt="user7" />
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Latest questions
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default RightBar;
