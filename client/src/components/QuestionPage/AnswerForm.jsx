import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AnswerForm = ({ answerForceUpdate }) => {
  // Setup'ing const ---------------------------------------
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
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
        answerForceUpdate();
        e.target.elements.answerText.value = null;
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
  return (
    <form style={{ margin: "0 3rem" }} onSubmit={(e) => postAnswer(e)}>
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
  );
};

export default AnswerForm;
