import { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Radio,
} from "@mui/material";
import { MoreVert, ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const QuestionCard = () => {
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
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Johnny Bravo"
        subheader="September 14, 2016 (timeStamp)"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
