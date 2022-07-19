import { CardHeader, Avatar } from "@mui/material";
import AnswerEdit from "./AnswerEdit";

const AnswerPostHeader = ({ answer }) => {
  return (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "blue" }} aria-label="question">
            {answer.username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={<AnswerEdit answer={answer} />}
        title={answer.username}
        subheader={answer.timestamp.slice(0, 10)}
      />
    </>
  );
};

export default AnswerPostHeader;
