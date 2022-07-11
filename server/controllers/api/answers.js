import mysql from "mysql2/promise";

const allAnswers = (req, res) => {
  res
    .status(200)
    .json({ msg: "successfully reached all answers of certain question" });
};

const newAnswer = (req, res) => {
  res.status(200).json({ msg: "successfully reached new answer" });
};

const updateAnswer = (req, res) => {
  res.status(200).json({ msg: "successfully reached update answer" });
};

const deleteAnswer = (req, res) => {
  res.status(200).json({ msg: "successfully reached delete answer" });
};

export { allAnswers, newAnswer, updateAnswer, deleteAnswer };
