import mysql from "mysql2/promise";
import mysqlConfig from "../../dbConfig.js";
import { v4 as uuid } from "uuid";

// @desc All answers of a question
// @route POST /api/questions/:id/answers
// @access Public
const allAnswers = async (req, res, next) => {
  try {
    const questionID = req.params.id;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    
    SELECT answers.*, users.email, users.username FROM answers
    INNER JOIN users ON answers.user_id = users.id
    WHERE question_id =?
    `;
    const [data] = await con.query(sql, questionID);
    await con.end();
    if (data.length === 0) {
      res.status(200).json({
        message: "No answers have been published to this question yet.",
      });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    next(err);
  }
};

// @desc Posts new answer to the question
// @route POST /api/questions/:id/answers
// @access Private
const newAnswer = async (req, res, next) => {
  try {
    const timestamp = new Date().toLocaleDateString("LT");
    const ID = uuid();
    const userID = req.user[0].id; // extracted from JWT
    const { answerText } = req.body;
    const questionID = req.params.id;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    INSERT INTO answers (id, user_id, question_id, answer_text, timestamp)
    VALUES (?, ?, ?, ?, ?)
    `;
    if (!req.body.answerText) {
      res.status(400);
      throw new Error("Please add an answer.");
    } else {
      await con.query(sql, [ID, userID, questionID, answerText, timestamp]);
      res.status(200).json({ message: "Successfully posted an answer!" });
    }
    await con.end();
  } catch (err) {
    next(err);
  }
};

// @desc Updates question
// @route PATCH /api/answers/:id
// @access Private
const updateAnswer = async (req, res, next) => {
  try {
    const userID = req.user[0].id; // extracted from JWT
    const answerId = req.params.id;
    const timestamp = new Date().toLocaleDateString("LT");
    const answerText = req.body.answerText;
    console.log(`User ID ` + userID);
    console.log(`Answer ID ` + answerId);
    const con = await mysql.createConnection(mysqlConfig);
    let sql = ``;
    let data = ``;
    if (req.body.answerText) {
      sql = `
      UPDATE answers
      SET answer_text = ?, edited = true, edit_timestamp = ?
      WHERE id = ? AND user_id = ?
      `;
      [data] = await con.query(sql, [answerText, timestamp, answerId, userID]);
    } else {
      res.status(400);
      throw new Error(
        "To continue, please fill updated answer. If you do not desire to apply any changes, click 'cancel'"
      );
    }
    await con.end();
    console.log(data);
    console.log(req.body);
    if (data.affectedRows === 0) {
      await res.status(400);
      throw new Error("Invalid user for this type of action.");
    } else {
      await res.status(200).json({ message: "Succesfully updated answer." });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Deletes question
// @route DELETE /api/answers/:id
// @access Private
const deleteAnswer = async (req, res, next) => {
  try {
    const userID = req.user[0].id; // extracted from JWT
    const answerId = req.params.id;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    DELETE FROM answers
    WHERE id = ? AND user_id = ?
    `;
    const [data] = await con.query(sql, [answerId, userID]);
    await con.end();
    if (data.affectedRows === 0) {
      await res.status(400);
      throw new Error("Invalid user for this type of action.");
    } else {
      await res.status(200).json({ message: "Succesfully deleted answer." });
    }
  } catch (err) {
    next(err);
  }
};

export { allAnswers, newAnswer, updateAnswer, deleteAnswer };
