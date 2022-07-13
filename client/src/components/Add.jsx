import {
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Avatar,
  styled,
  Box,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useState } from "react";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
const Add = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip
        title="Add"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
        onClick={handleClickOpen}
      >
        <Fab>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        <DialogTitle>Add question</DialogTitle>
        <DialogContent>
          <UserBox>
            <Avatar sx={{ width: 30, height: 30 }} alt="kGytis" />
            <Typography variant="h6">kGytis</Typography>
          </UserBox>
          <DialogContentText mt={2}>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            sx={{ width: "100%" }}
            id="title"
            label="Question title"
            type="text"
            placeholder="Enter Question title"
            variant="standard"
          />
          <TextField
            sx={{ width: "100%" }}
            id="description"
            label="Description"
            type="text"
            placeholder="What would you like to ask?"
            variant="standard"
            multiline
            rows={8}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Add;
