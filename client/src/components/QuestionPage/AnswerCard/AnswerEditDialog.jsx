import {
  Avatar,
  Typography,
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { UserBox } from "../../styledComponents/AddUserBoxStyled";
import { QuestionContext } from "../../../pages/Question";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const QuestionEditDialog = ({ ...props }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
  // Dialog open/close functions------------------------------------
  const { open, setOpen, answerData, modifyingAnswerID } = props;

  const [formData, setFormData] = useState({
    answerText: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  // --------------------------------------------------------
  const { setError, error, answerForceUpdate } = useContext(QuestionContext);
  // Question update'ing ------------------------------------
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${baseURL}/api/answers/${modifyingAnswerID}`,
        {
          answerText: e.target.elements.answerText.value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        navigate(`/question/${questionID}`);
        answerForceUpdate();
      })
      .catch((err) => {
        console.log(err);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        setError(message);
        toast.error(error);
      });
  };
  // --------------------------------------------------------
  return (
    <>
      {user && (
        <Dialog
          open={open}
          onClose={handleClose}
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <DialogTitle>Edit Answer</DialogTitle>
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
                Here you can edit your answer as You desire.
              </DialogContentText>
              <TextField
                sx={{ width: "100%" }}
                id="answerText"
                name="answerText"
                label="Update answer"
                type="text"
                placeholder="Update your answer!"
                variant="standard"
                multiline
                rows={8}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose} type="submit">
                Edit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};

export default QuestionEditDialog;
