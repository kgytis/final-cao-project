import mysql from "mysql2/promise";
import mysqlConfig from "../../dbConfig.js";
import { v4 as uuid } from "uuid";

// @desc Get all questions
// @route GET /api/questions
// @access Public
const allQuestions = async (req, res, next) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    SELECT questions.*, users.email, users.username FROM questions
    INNER JOIN users ON questions.user_id = users.id
    WHERE questions.archived = false
    `;
    const [data] = await con.query(sql);
    await con.end();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc Get question by id
// @route GET /api/questions/:id
// @access Public
const oneQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    SELECT questions.*, users.username, users.email
    FROM questions
    INNER JOIN users ON questions.user_id = users.id
    WHERE questions.archived = false AND questions.id = ?
    `;
    const [data] = await con.query(sql, questionId);
    console.log(data);
    await con.end();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc Posts new question
// @route POST /api/questions
// @access Private
const newQuestion = async (req, res, next) => {
  try {
    const timestamp = new Date().toLocaleDateString("LT");
    const ID = uuid();
    const userID = req.user[0].id; // extracted from JWT
    const { title, description } = req.body;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    INSERT INTO questions (id, user_id, title, question_text, timestamp)
    VALUES (?, ?, ?, ?, ?)
    `;
    if (!description) {
      res.status(400);
      throw new Error("Please add a question.");
    } else if (!title) {
      res.status(400);
      throw new Error("Please add a question title.");
    } else {
      await con.query(sql, [ID, userID, title, description, timestamp]);
      res.status(200).json({ message: "Successfully added a new question!" });
    }
    await con.end();
  } catch (err) {
    next(err);
  }
};

// @desc Updates selected users question
// @route PATCH /api/questions/:id
// @access Private
const updateQuestion = async (req, res, next) => {
  try {
    const userID = req.user[0].id; // extracted from JWT
    const questionId = req.params.id;
    const timestamp = new Date().toLocaleDateString("LT");
    const { title, questionText } = req.body;
    const con = await mysql.createConnection(mysqlConfig);
    let sql = ``;
    let data = ``;
    if (req.body.title && req.body.questionText) {
      sql = `
      UPDATE questions
      SET title = ?, question_text = ?, edited = true, edit_timestamp = ?
      WHERE id = ? AND user_id = ?
      `;
      [data] = await con.query(sql, [
        title,
        questionText,
        timestamp,
        questionId,
        userID,
      ]);
    } else if (req.body.title) {
      sql = `
      UPDATE questions
      SET title = ?, edited = true, edit_timestamp = ?
      WHERE id = ? AND user_id = ?
      `;
      [data] = await con.query(sql, [title, timestamp, questionId, userID]);
    } else if (req.body.questionText) {
      sql = `
      UPDATE questions
      SET question_text = ?, edited = true, edit_timestamp = ?
      WHERE id = ? AND user_id = ?
      `;
      [data] = await con.query(sql, [
        questionText,
        timestamp,
        questionId,
        userID,
      ]);
    } else {
      res.status(400);
      throw new Error(
        "To continue, please update one of the fields. If you do not desire to apply any changes, click 'cancel'"
      );
    }
    await con.end();
    if (data.affectedRows === 0) {
      await res.status(400);
      throw new Error("Invalid user for this type of action.");
    } else {
      await res.status(200).json({ message: "Succesfully updated question." });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Archives selected question
// @route DELETE /api/questions/:id
// @access Private
const deleteQuestion = async (req, res, next) => {
  try {
    const userID = req.user[0].id; // extracted from JWT
    const questionId = req.params.id;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    UPDATE questions
    SET archived = true
    WHERE id = ? AND user_id = ?
    `;
    const [data] = await con.query(sql, [questionId, userID]);
    await con.end();
    if (data.affectedRows === 0) {
      await res.status(400);
      throw new Error("Invalid user for this type of action.");
    } else {
      await res.status(200).json({ message: "Succesfully deleted question." });
    }
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
