import express from "express";

// Controllers imports
import {
  allAnswers,
  newAnswer,
  updateAnswer,
  deleteAnswer,
  newEvaluation,
} from "../../controllers/api/answersController.js";
// Middleware imports
import protect from "../../middleware/authMiddleware.js";
const answerRouter = express.Router();

answerRouter
  .get("/questions/:id/answers", allAnswers)
  .post("/questions/:id/answers", protect, newAnswer);
answerRouter
  .patch("/answers/:id", protect, updateAnswer)
  .delete("/answers/:id", protect, deleteAnswer);
answerRouter.post("/answers/:id/evaluation", protect, newEvaluation);
export default answerRouter;
