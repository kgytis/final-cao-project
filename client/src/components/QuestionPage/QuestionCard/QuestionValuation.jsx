import { Button, CardActions, Radio, Stack } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useState, useContext, useEffect } from "react";
import QuestionDelete from "./QuestionDelete";
import { QuestionContext } from "../../../pages/Question";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuestionValuation = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const { question, questionForceUpdate } = useContext(QuestionContext);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
  const handleChange = async (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (user) {
      axios
        .post(
          `${baseURL}/api/questions/${questionID}/evaluation`,
          {
            evaluation: selectedValue,
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
          questionForceUpdate();
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
    }
  }, [selectedValue]);
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  return (
    <CardActions
      disableSpacing
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          aria-label="like"
          id="like-checkbox"
          startIcon={
            <Radio
              icon={<ThumbUpOutlinedIcon />}
              checkedIcon={<ThumbUp />}
              {...controlProps("like")}
              name="questionLike"
            />
          }
        >
          {question[0].likeCount}
        </Button>
        <Button
          aria-label="dislike"
          id="dislike-checkbox"
          startIcon={
            <Radio
              icon={<ThumbDownOutlinedIcon />}
              checkedIcon={<ThumbDown />}
              {...controlProps("dislike")}
              name="questionLike"
            />
          }
        >
          {question[0].dislikeCount}
        </Button>
      </Stack>
      <QuestionDelete />
    </CardActions>
  );
};

export default QuestionValuation;
