import express from "express";

// Controllers imports
import {
  allAnswers,
  newAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../controllers/api/answers.js";
// Middleware imports

const answerRouter = express.Router();

answerRouter.get("/questions/:id/answers", allAnswers);
answerRouter.post("/questions/:id/answers", newAnswer);
answerRouter.patch("/answers/:id", updateAnswer);
answerRouter.delete("/answers/:id", deleteAnswer);

export default answerRouter;
