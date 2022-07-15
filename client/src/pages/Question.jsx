import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Radio,
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { ThumbDown, ThumbUp, Edit } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { UserBox } from "../components/styledComponents/AddUserBoxStyled";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/fetchHook";
import axios from "axios";
import { toast } from "react-toastify";

const Question = () => {
  // Dialog box related states MUI-----------------------------
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const [openAnswer, setOpenAnswer] = useState(false);
  const handleClickOpenAnswer = () => {
    setOpenAnswer(true);
  };
  const handleCloseAnswer = () => {
    setOpenAnswer(false);
  };
  const handleChangeAnswer = (event) => {
    setSelectedValue(event.target.value);
  };
  const controlPropsAnswer = (item) => ({
    checked: selectedValue === item,
    onChange: handleChangeAnswer,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  // Setup'ing const ---------------------------------------
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  // Get all answer----------------------------------------
  const { data, isPending } = useFetch(
    `${baseURL}/api/questions/${questionID}`
  );
  // ------------------------------------------------------
  // Get all answers---------------------------------------
  const { data: answers, isPending: answerPending } = useFetch(
    `${baseURL}/api/questions/${questionID}/answers`
  );
  // --------------------------------------------------------
  // Question update'ing ------------------------------------
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${baseURL}/api/questions/${questionID}`,
        {
          title: e.target.elements.title.value,
          questionText: e.target.elements.questionText.value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
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
  // Answer update'ing ------------------------------------
  const onAnswerSubmit = (e, id) => {
    e.preventDefault();
    axios
      .patch(
        `${baseURL}/api/answers/${id}`,
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
  // Question Deletion ----------------------------------------
  const onDelete = () => {
    axios
      .delete(`${baseURL}/api/questions/${questionID}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setError(null);
        navigate("/");
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
  // Answer Deletion ----------------------------------------
  const onDeleteAnswer = (id) => {
    axios
      .delete(`${baseURL}/api/answers/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setError(null);
        navigate(`/question/${questionID}`);
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

  // Answer Posting ----------------------------------------
  const postAnswer = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseURL}/api/questions/${questionID}/answers`,
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
        setError(null);
        navigate(`/question/${questionID}`);
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
  // State handling------------------------------------------
  useEffect(() => {
    console.log(data);
  }, [data, isPending, answers, answerPending]);
  // --------------------------------------------------------
  return (
    <>
      {(isPending || answerPending) && <Spinner />}
      {data && answers && (
        <>
          <Card sx={{ margin: 5 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="question">
                  {data[0].username.slice(0, 1).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="edit" onClick={handleClickOpen}>
                  <Edit />
                </IconButton>
              }
              title={data[0].username}
              subheader={data[0].timestamp.slice(0, 10)}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data[0].question_text}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <IconButton aria-label="like" id="like-checkbox">
                  <Radio
                    icon={<ThumbUpOutlinedIcon />}
                    checkedIcon={<ThumbUp />}
                    {...controlProps("a")}
                  />
                </IconButton>
                <IconButton aria-label="dislike" id="dislike-checkbox">
                  <Radio
                    icon={<ThumbDownOutlinedIcon />}
                    checkedIcon={<ThumbDown />}
                    {...controlProps("b")}
                  />
                </IconButton>
              </div>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => onDelete(e)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
          {answers.message && <div>{answers.message}</div>}
          {!answers.message && (
            <>
              {answers.map((answer, index) => {
                return (
                  <>
                    <Card sx={{ margin: 5 }} key={`answer-${index}`}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: "blue" }}
                            aria-label="question"
                          >
                            {answer.username.slice(0, 1).toUpperCase()}
                          </Avatar>
                        }
                        action={
                          <IconButton
                            aria-label="edit"
                            onClick={handleClickOpenAnswer}
                          >
                            <Edit />
                          </IconButton>
                        }
                        title={answer.username}
                        subheader={answer.timestamp.slice(0, 10)}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {answer.answer_text}
                        </Typography>
                      </CardContent>
                      <CardActions
                        disableSpacing
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <IconButton aria-label="like" id="like-checkbox">
                            <Radio
                              icon={<ThumbUpOutlinedIcon />}
                              checkedIcon={<ThumbUp />}
                              {...controlProps("a")}
                            />
                          </IconButton>
                          <IconButton
                            aria-label="dislike"
                            id="dislike-checkbox"
                          >
                            <Radio
                              icon={<ThumbDownOutlinedIcon />}
                              checkedIcon={<ThumbDown />}
                              {...controlProps("b")}
                            />
                          </IconButton>
                        </div>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => onDeleteAnswer(answer.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                    <Dialog
                      open={openAnswer}
                      onClose={handleCloseAnswer}
                      bgcolor={"background.default"}
                      color={"text.primary"}
                    >
                      <DialogTitle>Edit answer</DialogTitle>
                      <form onSubmit={(e) => onAnswerSubmit(e, answer.id)}>
                        <DialogContent>
                          <UserBox>
                            <Avatar
                              sx={{ width: 30, height: 30 }}
                              alt={`${user.username}`}
                            />
                            <Typography variant="h6">
                              {user.username}
                            </Typography>
                          </UserBox>
                          <DialogContentText mt={2}>
                            Update and answer
                          </DialogContentText>
                          <TextField
                            sx={{ width: "100%" }}
                            id="description"
                            name="answerText"
                            label="Update answer"
                            type="text"
                            placeholder="Update your answer!"
                            variant="standard"
                            multiline
                            rows={8}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAnswer}>Cancel</Button>
                          <Button onClick={handleCloseAnswer} type="submit">
                            Add
                          </Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </>
                );
              })}
              <form
                style={{ margin: "0 3rem" }}
                onSubmit={(e) => postAnswer(e)}
              >
                <TextField
                  sx={{ width: "100%" }}
                  id="answerText"
                  name="answerText"
                  label="Answer Text"
                  type="text"
                  placeholder="What would you like to ask?"
                  variant="standard"
                  multiline
                  rows={8}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "30px" }}
                >
                  Post
                </Button>
              </form>
            </>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            bgcolor={"background.default"}
            color={"text.primary"}
          >
            <DialogTitle>Edit question</DialogTitle>
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
                  name="questionText"
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

export default Question;
