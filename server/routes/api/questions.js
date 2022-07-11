import express from "express";

// Controllers imports
import {
  allQuestions,
  oneQuestion,
  newQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../controllers/api/questions.js";
// Middleware imports

const questionsRouter = express.Router();

questionsRouter.get("/questions", allQuestions);
questionsRouter.get("/questions/:id", oneQuestion);
questionsRouter.post("/questions", newQuestion);
questionsRouter.patch("/questions/:id", updateQuestion);
questionsRouter.delete("/questions/:id", deleteQuestion);

export default questionsRouter;
