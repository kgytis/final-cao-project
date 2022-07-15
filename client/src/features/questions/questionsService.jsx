// Only for HTTP request to send and store to local storage
import axios from "axios";

const API_URL_QUESTIONS = "http://localhost:5000/api/questions";

// Getting all questions
const getQuestions = async () => {
  const response = await axios.get(API_URL_QUESTIONS);
  return response.data;
};
// Posting new question
const newQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL_QUESTIONS, questionData, config);

  return response.data;
};
// Getting one question by id
const oneQuestion = async (questionID) => {
  const response = await axios.get(API_URL_QUESTIONS + `/${questionID}`);

  return response.data;
};
// Deleting question
const deleteQuestion = async ({ questionsData, questionsID }) => {
  const response = await axios.delete(
    API_URL_QUESTIONS + `/${questionsID}`,
    questionsData
  );

  return response.data;
};

const questionsService = {
  getQuestions,
  newQuestion,
  oneQuestion,
  deleteQuestion,
};

export default questionsService;
