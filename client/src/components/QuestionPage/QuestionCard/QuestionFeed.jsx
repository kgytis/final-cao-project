import { CardContent, Typography } from "@mui/material";
import { QuestionContext } from "../../../pages/Question";
import { useContext } from "react";

const QuestionFeed = () => {
  const { question } = useContext(QuestionContext);
  return (
    <>
      <CardContent>
        <Typography variant="h6">{question[0].title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {question[0].question_text}
        </Typography>
      </CardContent>
    </>
  );
};

export default QuestionFeed;
