import { Button, TextField } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/fetchHook";
import axios from "axios";
import { toast } from "react-toastify";

import QuestionCard from "../components/QuestionPage/QuestionCard/QuestionCard";
import AnswerCard from "../components/QuestionPage/AnswerCard/AnswerCard";
import AnswerForm from "../components/QuestionPage/AnswerForm";
// Contexts
const QuestionContext = createContext();

const Question = () => {
  // Setup'ing const ---------------------------------------
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const questionID = params.id;
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  // Get a question----------------------------------------
  const {
    data: question,
    isPending: questionPending,
    error: questionError,
  } = useFetch(`${baseURL}/api/questions/${questionID}`);
  // ------------------------------------------------------
  // Get all answers---------------------------------------
  const {
    data: answers,
    isPending: answerPending,
    error: answerError,
  } = useFetch(`${baseURL}/api/questions/${questionID}/answers`);
  // --------------------------------------------------------
  // Answer Posting ----------------------------------------
  const postAnswer = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseURL}/api/questions/${questionID}/answers`,
        {
          answerText: e.target.elements.answerText.value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setError(null);
        navigate(`/question/${questionID}`);
      })
      .catch((err) => {
        console.log(err);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        setError(message);
        toast.error(error);
      });
  };
  // --------------------------------------------------------
  // State handling------------------------------------------
  useEffect(() => {}, [question, questionPending, answers, answerPending]);
  // --------------------------------------------------------
  return (
    <>
      <QuestionContext.Provider
        value={{
          question,
          questionPending,
          questionError,
          answers,
          answerPending,
          answerError,
          error,
          setError,
        }}
      >
        {(questionPending || answerPending) && <Spinner />}
        {question && answers && (
          <>
            <QuestionCard />
            {answers.message && <div>{answers.message}</div>}
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
                <AnswerForm />
              </>
            )}
          </>
        )}
      </QuestionContext.Provider>
    </>
  );
};

export { QuestionContext };
export default Question;
