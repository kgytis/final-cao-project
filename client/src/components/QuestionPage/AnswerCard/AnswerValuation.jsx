import { CardActions, Radio, Stack, Button } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useState, useContext, useEffect } from "react";
import AnswerDelete from "./AnswerDelete";
import { QuestionContext } from "../../../pages/Question";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AnswerValuation = ({ answer }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  const { answerForceUpdate, setError, error } = useContext(QuestionContext);
  const [selectedValue, setSelectedValue] = useState({
    evaluation: null,
    answerId: null,
  });
  const handleChange = (event) => {
    setSelectedValue({
      evaluation: event.target.value,
      answerId: event.currentTarget.id,
    });
  };
  useEffect(() => {
    if (selectedValue.answerId !== null) {
      axios
        .post(
          `${baseURL}/api/answers/${selectedValue.answerId}/evaluation`,
          {
            evaluation: selectedValue.evaluation,
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
              name="answerLike"
              id={answer.id}
            />
          }
        >
          {answer.likeCount}
        </Button>
        <Button
          aria-label="dislike"
          id="dislike-checkbox"
          startIcon={
            <Radio
              icon={<ThumbDownOutlinedIcon />}
              checkedIcon={<ThumbDown />}
              {...controlProps("dislike")}
              name="answerLike"
              id={answer.id}
            />
          }
        >
          {answer.dislikeCount}
        </Button>
      </Stack>
      <AnswerDelete answer={answer} />
    </CardActions>
  );
};

export default AnswerValuation;
