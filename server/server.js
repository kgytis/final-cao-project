import "dotenv/config";
import express from "express";
import cors from "cors";

import { errorHandler } from "./middleware/errorMiddleware.js";
// Routes imports
// API Related imports
import questionsRouter from "./routes/api/questionsRouter.js";
import answerRouter from "./routes/api/answersRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

// Cors setup
const corsOptions = {
  origin: [`http://localhost:${port}`, `http://localhost:3000`],
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));

// Routes usage
app.use("/api", questionsRouter);
app.use("/api", answerRouter);

// Error handler -> rewrite built in Express error handler.
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on PORT http://localhost:${port}`)
);
