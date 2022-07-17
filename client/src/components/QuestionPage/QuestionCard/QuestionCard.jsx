import PostHeader from "./PostHeader";
import { Card } from "@mui/material";
import QuestionFeed from "./QuestionFeed";
import QuestionValuation from "./QuestionValuation";
const QuestionCard = () => {
  return (
    <>
      <Card sx={{ margin: 5 }}>
        <PostHeader />
        <QuestionFeed />
        <QuestionValuation />
      </Card>
    </>
  );
};

export default QuestionCard;
