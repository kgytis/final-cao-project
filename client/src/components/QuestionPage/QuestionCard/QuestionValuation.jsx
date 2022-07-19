import { IconButton, Button, CardActions, Radio, Stack } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useState, useContext } from "react";
import QuestionDelete from "./QuestionDelete";
import { QuestionContext } from "../../../pages/Question";
const QuestionValuation = () => {
  const { question } = useContext(QuestionContext);
  const [selectedValue, setSelectedValue] = useState(null);
  console.log(question);
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
              {...controlProps("a")}
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
              {...controlProps("b")}
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
