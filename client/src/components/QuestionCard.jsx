import { useState, useContext } from "react";
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
  Stack,
} from "@mui/material";
import { MoreVert, ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import { Link, Redirect, useNavigate } from "react-router-dom";
import { QuestionContext } from "./Feed";

const QuestionCard = ({ ...props }) => {
  const question = useContext(QuestionContext);
  const { data, userData } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  console.log(data);
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  // Kol kas undefined gale atsiranda ten, kur klausimas trumpesnis nei 5 zodziai, jei kas pataisyti logika
  // const stringSplitter = (string) => {
  //   const stringArray = string.split(" ");
  //   const numberArray = [];
  //   for (let i = 0; i < 5; i++) {
  //     numberArray.push(i);
  //   }
  //   const newString = numberArray.map((number, index) => {
  //     return stringArray[index];
  //   });
  //   console.log(newString);

  //   return newString;
  // };
  // stringSplitter(data.qeustion_text);
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="question">
            {data.username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={data.username}
        subheader={data.timestamp.slice(0, 10)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${data.question_text.slice(0, 20)}...`}
        </Typography>
        <Link to={`/question/${question.id}`}> Read More</Link>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          width: "130px",
          justifyContent: "space-around",
        }}
      >
        <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
          <ThumbUpOutlinedIcon />
          <Typography variant="p">{data.likeCount}</Typography>
        </Stack>
        {/* <IconButton aria-label="like" id="like-checkbox">
          <Radio
            icon={<ThumbUpOutlinedIcon />}
            checkedIcon={<ThumbUp />}
            {...controlProps("a")}
          />
        </IconButton> */}
        <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
          <ThumbDownOutlinedIcon />
          <Typography variant="p">{data.dislikeCount}</Typography>
        </Stack>
        {/* <IconButton aria-label="dislike" id="dislike-checkbox">
          <Radio
            icon={<ThumbDownOutlinedIcon />}
            checkedIcon={<ThumbDown />}
            {...controlProps("b")}
          />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
