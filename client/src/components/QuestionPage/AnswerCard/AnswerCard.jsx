import AnswerPostHeader from "./AnswerPostHeader";
import { Card } from "@mui/material";
import AnswerFeed from "./AnswerFeed";
import AnswerValuation from "./AnswerValuation";
const AnswerCard = ({ answer }) => {
  return (
    <>
      <Card sx={{ margin: 5 }}>
        <AnswerPostHeader answer={answer} />
        <AnswerFeed answer={answer} />
        <AnswerValuation answer={answer} />
      </Card>
    </>
  );
};

export default AnswerCard;
