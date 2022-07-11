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
    SELECT * FROM questions
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
    SELECT *
    FROM questions
    WHERE id = ?
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
    const userID = req.body.user_id; // after JWT - change to get an user_id from JWT token
    const { title, questionText } = req.body;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    INSERT INTO questions (id, user_id, title, question_text, timestamp)
    VALUES (?, ?, ?, ?, ?)
    `;
    if (!req.body.questionText) {
      res.status(400);
      throw new Error("Please add a question.");
    } else if (!req.body.title) {
      res.status(400);
      throw new Error("Please add a question title.");
    } else {
      await con.query(sql, [ID, userID, title, questionText, timestamp]);
      res.status(200).json({ msg: "Successfully added a new question!" });
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
    const userID = req.body.user_id; // after JWT - change to get an user_id from JWT token
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
      [data] = await con.query(sql, [
        title,
        questionText,
        timestamp,
        questionId,
        userID,
      ]);
    } else if (req.body.questionText) {
      sql = `
      UPDATE questions
      SET question_text = ?, edited = true, edit_timestamp = ?
      WHERE id = ? AND user_id = ?
      `;
      [data] = await con.query(sql, [
        title,
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
      await res.status(200).json({ msg: "Succesfully updated question." });
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
    const userID = req.body.user_id; // after JWT - change to get an user_id from JWT token
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
      await res.status(200).json({ msg: "Succesfully deleted question." });
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
