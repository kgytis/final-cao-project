import { CardContent, Typography } from "@mui/material";

const QuestionFeed = ({ answer }) => {
  return (
    <>
      <CardContent>
        <Typography variant="h6">{answer.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {answer.answer_text}
        </Typography>
      </CardContent>
    </>
  );
};

export default QuestionFeed;
