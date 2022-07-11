import express from "express";

// Controllers imports
import {
  allAnswers,
  newAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../controllers/api/answersController.js";
// Middleware imports

const answerRouter = express.Router();

answerRouter
  .get("/questions/:id/answers", allAnswers)
  .post("/questions/:id/answers", newAnswer);
answerRouter
  .patch("/answers/:id", updateAnswer)
  .delete("/answers/:id", deleteAnswer);

export default answerRouter;
