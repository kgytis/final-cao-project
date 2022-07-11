import mysql from "mysql2/promise";

// @desc Get all questions
// @route GET /api/questions
// @access Public
const allQuestions = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "successfully reached all questions" });
  } catch (err) {
    next(err);
  }
};

// @desc Get question by id
// @route GET /api/questions/:id
// @access Public
const oneQuestion = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ msg: `successfully reached one question - ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};

// @desc Posts new question
// @route POST /api/questions
// @access Private
const newQuestion = async (req, res, next) => {
  try {
    if (!req.body.question) {
      res.status(400);
      throw new Error("Please add a question");
    } else {
      res.status(200).json({ msg: "successfully reached new question" });
    }
  } catch (err) {
    res.status(400);
    next(err);
  }
};

// @desc Updates selected users question
// @route PATCH /api/questions/:id
// @access Private
const updateQuestion = async (req, res, next) => {
  try {
    res.status(200).json({
      msg: `successfully reached update question  - ${req.params.id}`,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Archives selected question
// @route DELETE /api/questions/:id
// @access Private
const deleteQuestion = async (req, res, next) => {
  try {
    res.status(200).json({
      msg: `successfully reached delete question  - ${req.params.id}`,
    });
  } catch (err) {
    next(err);
  }
};

export {
  allQuestions,
  oneQuestion,
  newQuestion,
  updateQuestion,
  deleteQuestion,
};
