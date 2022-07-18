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
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { UserBox } from "./styledComponents/AddUserBoxStyled";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import axios from "axios";
import { useReducer } from "react";

const Add = ({ setFetchedData, fetchedData, forceUpdate }) => {
  // Dialog box related states -----------------------------
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //--------------------------------------------------------
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/questions",
        {
          title: e.target.elements.title.value,
          description: e.target.elements.description.value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((receivedResponse) => {
        setIsPending(false);
        setError(null);
        navigate("/");
        forceUpdate();
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
  //--------------------------------------------------------
  return (
    <>
      {!user && (
        <Tooltip
          title="Add"
          sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
          onClick={handleClickOpen}
        >
          <Fab disabled>
            <AddIcon disabled />
          </Fab>
        </Tooltip>
      )}
      {user && (
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
            <form onSubmit={onSubmit}>
              <DialogContent>
                <UserBox>
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    alt={`${user.username}`}
                  />
                  <Typography variant="h6">{user.username}</Typography>
                </UserBox>
                <DialogContentText mt={2}>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>
                <TextField
                  sx={{ width: "100%" }}
                  id="title"
                  label="Question title"
                  type="text"
                  placeholder="Enter Question title"
                  variant="standard"
                  name="title"
                />
                <TextField
                  sx={{ width: "100%" }}
                  id="description"
                  name="description"
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
                <Button onClick={handleClose} type="submit">
                  Add
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Add;
