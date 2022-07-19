import { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Stack,
} from "@mui/material";
import { MoreVert, ReadMore } from "@mui/icons-material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import { Link } from "react-router-dom";
import { QuestionContext } from "./Feed";

const QuestionCard = ({ ...props }) => {
  const question = useContext(QuestionContext);
  const { data } = props;
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="question">
            {data.username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <Link to={`/question/${question.id}`}>
            <IconButton aria-label="settings">
              <ReadMore />
            </IconButton>
          </Link>
        }
        title={data.username}
        subheader={`Published on : ${data.timestamp.slice(0, 10)}`}
      />
      <CardContent>
        <Stack direction="row" spacing={2}>
          {data.edit_timestamp && (
            <Typography variant="p" sx={{ fontSize: "14px" }} color="green">
              Last edited : {data.edit_timestamp}
            </Typography>
          )}
          {data.answerCount === 0 && (
            <Typography variant="p" sx={{ fontSize: "14px" }} color="red">
              Answers : {data.answerCount}
            </Typography>
          )}
          {data.answerCount !== 0 && (
            <Typography variant="p" sx={{ fontSize: "14px" }} color="green">
              Answers : {data.answerCount}
            </Typography>
          )}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {`${data.question_text.slice(0, 100)}...`}
        </Typography>
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

        <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
          <ThumbDownOutlinedIcon />
          <Typography variant="p">{data.dislikeCount}</Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
