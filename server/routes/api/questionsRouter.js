import express from "express";

// Controllers imports
import {
  allQuestions,
  oneQuestion,
  newQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../controllers/api/questionsController.js";
// Middleware imports

const questionsRouter = express.Router();

questionsRouter.get("/questions", allQuestions).post("/questions", newQuestion);
questionsRouter
  .get("/questions/:id", oneQuestion)
  .patch("/questions/:id", updateQuestion)
  .delete("/questions/:id", deleteQuestion);

export default questionsRouter;
