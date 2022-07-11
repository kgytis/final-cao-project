import mysql from "mysql2/promise";

// @desc All answers of a question
// @route POST /api/questions/:id/answers
// @access Public
const allAnswers = async (req, res, next) => {
  try {
    res.status(200).json({
      msg: `successfully reached all answers of certain question  - ${req.params.id}`,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Posts new answer to the question
// @route POST /api/questions/:id/answers
// @access Private
const newAnswer = async (req, res, next) => {
  try {
    if (!req.body.answer) {
      res.status(400);
      throw new Error("Please add an answer!");
    } else {
      res
        .status(200)
        .json({ msg: `successfully reached new answer  - ${req.params.id}` });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Updates question
// @route PATCH /api/answers/:id
// @access Private
const updateAnswer = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ msg: `successfully reached update answer - ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};

// @desc Deletes question
// @route DELETE /api/answers/:id
// @access Private
const deleteAnswer = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ msg: `successfully reached delete answer  - ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};

export { allAnswers, newAnswer, updateAnswer, deleteAnswer };
