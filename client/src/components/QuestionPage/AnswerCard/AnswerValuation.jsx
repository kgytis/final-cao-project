import { IconButton, CardActions, Radio, Stack, Button } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useState } from "react";
import AnswerDelete from "./AnswerDelete";

const AnswerValuation = ({ answer }) => {
  const [selectedValue, setSelectedValue] = useState(null);
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
          {answer.likeCount}
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
          {answer.dislikeCount}
        </Button>
      </Stack>
      <AnswerDelete answer={answer} />
    </CardActions>
  );
};

export default AnswerValuation;
