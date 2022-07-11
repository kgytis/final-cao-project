import mysql from "mysql2/promise";

const allQuestions = (req, res) => {
  res.status(200).json({ msg: "successfully reached all questions" });
};

const oneQuestion = (req, res) => {
  res.status(200).json({ msg: "successfully reached one question" });
};

const newQuestion = (req, res) => {
  res.status(200).json({ msg: "successfully reached new question" });
};

const updateQuestion = (req, res) => {
  res.status(200).json({ msg: "successfully reached update question" });
};

const deleteQuestion = (req, res) => {
  res.status(200).json({ msg: "successfully reached delete question" });
};

export {
  allQuestions,
  oneQuestion,
  newQuestion,
  updateQuestion,
  deleteQuestion,
};
