import PostHeader from "./PostHeader";
import { Card } from "@mui/material";
import QuestionFeed from "./QuestionFeed";
import QuestionValuation from "./QuestionValuation";
const QuestionCard = ({ questionForceUpdate }) => {
  return (
    <>
      <Card sx={{ margin: 5 }}>
        <PostHeader questionForceUpdate={questionForceUpdate} />
        <QuestionFeed />
        <QuestionValuation />
      </Card>
    </>
  );
};

export default QuestionCard;
