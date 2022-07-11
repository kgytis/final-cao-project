import "dotenv/config";
import express from "express";
import cors from "cors";

// Routes imports
// API Related imports
import questionsRouter from "./routes/api/questions.js";
import answerRouter from "./routes/api/answers.js";

const app = express();
const port = process.env.PORT || 5000;

// Cors setup
const corsOptions = {
  origin: [`http://localhost:${port}`, `http://localhost:3000`],
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes usage
app.use("/api", questionsRouter);
app.use("/api", answerRouter);

app.listen(port, () =>
  console.log(`Server is running on PORT http://localhost:${port}`)
);
