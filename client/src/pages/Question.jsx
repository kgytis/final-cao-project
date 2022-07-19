import { useState, createContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/fetchHook";
import { Box, Typography } from "@mui/material";
import QuestionCard from "../components/QuestionPage/QuestionCard/QuestionCard";
import AnswerCard from "../components/QuestionPage/AnswerCard/AnswerCard";
import AnswerForm from "../components/QuestionPage/AnswerForm";
import NavBar from "../components/NavBar";

// Contexts
const QuestionContext = createContext();

const Question = ({ mode, setMode }) => {
  // Setup'ing const ---------------------------------------
  const [error, setError] = useState(null);
  const params = useParams();
  const questionID = params.id;
  const baseURL = "http://localhost:5000";

  // Get a question----------------------------------------
  const {
    data: question,
    isPending: questionPending,
    error: questionError,
    forceUpdate: questionForceUpdate,
  } = useFetch(`${baseURL}/api/questions/${questionID}`);
  // ------------------------------------------------------
  // Get all answers---------------------------------------
  const {
    data: answers,
    isPending: answerPending,
    error: answerError,
    forceUpdate: answerForceUpdate,
  } = useFetch(`${baseURL}/api/questions/${questionID}/answers`);
  // --------------------------------------------------------
  // --------------------------------------------------------
  return (
    <Box>
      <NavBar setMode={setMode} mode={mode} />
      <QuestionContext.Provider
        value={{
          question,
          questionPending,
          questionError,
          questionForceUpdate,
          answers,
          answerPending,
          answerError,
          answerForceUpdate,
          error,
          setError,
        }}
      >
        {(questionPending || answerPending) && <Spinner />}
        {question && answers && (
          <>
            <QuestionCard questionForceUpdate={questionForceUpdate} />

            {answers.message && (
              <Box display="flex" justifyContent="center">
                <Typography variant="h4" color="red">
                  {answers.message}
                </Typography>
              </Box>
            )}
            {!answers.message && (
              <>
                {answers.map((answer, index) => {
                  return (
                    <>
                      <AnswerCard
                        answer={answer}
                        key={`answer-card-${index}`}
                      />
                    </>
                  );
                })}
              </>
            )}
            <AnswerForm answerForceUpdate={answerForceUpdate} />
          </>
        )}
      </QuestionContext.Provider>
    </Box>
  );
};

export { QuestionContext };
export default Question;
