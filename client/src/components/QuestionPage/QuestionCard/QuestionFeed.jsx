import { CardContent, Typography } from "@mui/material";
import { QuestionContext } from "../../../pages/Question";
import { useContext } from "react";

const QuestionFeed = () => {
  const { question } = useContext(QuestionContext);
  return (
    <>
      <CardContent>
        <Typography variant="h5">{question[0].title}</Typography>
        {question[0].edit_timestamp && (
          <Typography variant="p" sx={{ fontSize: "14px" }} color="green">
            Last edited : {question[0].edit_timestamp.slice(0, 10)}
          </Typography>
        )}
        <Typography variant="h6" color="text.secondary" mt="15px">
          {question[0].question_text}
        </Typography>
      </CardContent>
    </>
  );
};

export default QuestionFeed;
