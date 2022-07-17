import { IconButton, CardActions, Radio } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useState } from "react";
import QuestionDelete from "./QuestionDelete";

const QuestionValuation = () => {
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
      <QuestionDelete />
    </CardActions>
  );
};

export default QuestionValuation;
