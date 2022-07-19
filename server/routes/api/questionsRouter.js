import express from "express";

// Controllers imports
import {
  allQuestions,
  oneQuestion,
  newQuestion,
  updateQuestion,
  deleteQuestion,
  newEvaluation,
} from "../../controllers/api/questionsController.js";

// Middleware imports
import protect from "../../middleware/authMiddleware.js";

const questionsRouter = express.Router();

questionsRouter
  .get("/questions", allQuestions)
  .post("/questions", protect, newQuestion);
questionsRouter
  .get("/questions/:id", oneQuestion)
  .patch("/questions/:id", protect, updateQuestion)
  .delete("/questions/:id", protect, deleteQuestion);
questionsRouter.post("/questions/:id/evaluation", protect, newEvaluation);
export default questionsRouter;
