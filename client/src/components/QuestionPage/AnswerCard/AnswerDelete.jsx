import { Button } from "@mui/material";
import { QuestionContext } from "../../../pages/Question";
import { useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const QuestionDelete = ({ answer }) => {
  const { error, setError, answerForceUpdate } = useContext(QuestionContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
  // Question Deletion ----------------------------------------
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
      {!user && (
        <Button disabled variant="contained">
          Delete
        </Button>
      )}
      {user && answer.user_id !== user._id && (
        <Button disabled variant="contained" color="error">
          Delete
        </Button>
      )}
      {user && answer.user_id === user._id && (
        <Button
          variant="contained"
          color="error"
          onClick={() => onDeleteAnswer(answer.id)}
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default QuestionDelete;
