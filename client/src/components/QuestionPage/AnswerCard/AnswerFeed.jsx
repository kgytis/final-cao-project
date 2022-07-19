import { CardContent, Typography } from "@mui/material";

const QuestionFeed = ({ answer }) => {
  return (
    <>
      <CardContent>
        <Typography variant="h5">{answer.title}</Typography>
        {answer.edit_timestamp && (
          <Typography variant="p" sx={{ fontSize: "14px" }} color="green">
            Last edited : {answer.edit_timestamp.slice(0, 10)}
          </Typography>
        )}
        <Typography variant="h6" color="text.secondary" mt="15px">
          {answer.answer_text}
        </Typography>
      </CardContent>
    </>
  );
};

export default QuestionFeed;
