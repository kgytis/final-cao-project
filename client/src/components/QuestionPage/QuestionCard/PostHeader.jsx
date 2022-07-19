import { CardHeader, Avatar } from "@mui/material";
import QuestionEdit from "./QuestionEdit";
import { QuestionContext } from "../../../pages/Question";
import { useContext } from "react";

const PostHeader = ({ questionForceUpdate }) => {
  const { question } = useContext(QuestionContext);
  return (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="question">
            {question[0].username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={<QuestionEdit questionForceUpdate={questionForceUpdate} />}
        title={question[0].username}
        subheader={question[0].timestamp.slice(0, 10)}
      />
    </>
  );
};

export default PostHeader;
