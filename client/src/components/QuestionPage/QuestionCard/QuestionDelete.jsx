import { Button } from "@mui/material";
import { QuestionContext } from "../../../pages/Question";
import { useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const QuestionDelete = () => {
  const { error, setError, question } = useContext(QuestionContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
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
  return (
    <>
      {!user && (
        <Button disabled variant="contained">
          Delete
        </Button>
      )}
      {user && question[0].user_id !== user._id && (
        <Button
          disabled
          variant="contained"
          color="error"
          onClick={(e) => onDelete(e)}
        >
          Delete
        </Button>
      )}
      {user && question[0].user_id === user._id && (
        <Button variant="contained" color="error" onClick={(e) => onDelete(e)}>
          Delete
        </Button>
      )}
    </>
  );
};

export default QuestionDelete;
