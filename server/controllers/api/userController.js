import jwt from "jsonwebtoken"; // for JWT token creation
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs"; // for password hashing
import mysql from "mysql2/promise";
import mysqlConfig from "../../dbConfig.js";
import { time } from "console";

// @desc Registration for new user
// @route POST /api/user/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const ID = uuid();
    const timestamp = new Date().toLocaleDateString("LT");
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill all required fields.");
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user exists
    const con = await mysql.createConnection(mysqlConfig);
    const sqlUsername = `
    SELECT *
    FROM users
    WHERE username = ?`;
    const sqlEmail = `
    SELECT *
    FROM users
    WHERE email = ?`;
    const [data] = await con.query(sqlUsername, [username]); // for error message whether username exists
    const [data2] = await con.query(sqlEmail, [email]); // for error message whether email exists

    // Validators to check whether username or email exists in database
    if (data.length !== 0) {
      throw new Error("Such username already exists");
    }
    if (data2.length !== 0) {
      throw new Error("Such email already exists");
    }

    const sqlNewUser = `
    INSERT INTO users (id, email, username, password, timestamp)
    VALUES (?, ?, ?, ?, ?)
    `;
    await con.query(sqlNewUser, [
      ID,
      email,
      username,
      hashedPassword,
      timestamp,
    ]);
    await con.end();
    if (sqlNewUser) {
      res.status(201).json({
        _id: ID,
        username: username,
        email: email,
        token: generateToken(ID),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
  } catch (err) {
    next(err);
  }
};

// @desc Authentication for existing user
// @route POST /api/user/login
// @access Public
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    SELECT *
    FROM users
    WHERE username = ?
    `;
    const [data] = await con.query(sql, [username]);
    await con.end();
    // Checks whether correct username was provided, if not, returns empty array, throws an error
    if (data.length === 0) {
      throw new Error("Incorrect username or password.");
    }
    // if correct username, then password hashing can take place
    const hashedPassword = await bcrypt.compare(password, data[0].password);
    // Checks whether provided password ir correct, for security measures returned same error message as above
    if (!hashedPassword) {
      throw new Error("Incorrect username or password.");
    } else if (data[0].username && hashedPassword) {
      res.json({
        _id: data[0].id,
        username: data[0].username,
        email: data[0].email,
        token: generateToken(data[0].id),
      });
    }
  } catch (err) {
    next(err);
  }
};

// JWT generating
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// @desc Get user data
// @route POST /api/user/login
// @access Public
const getMe = async (req, res, next) => {
  try {
    // const { id, username, email } = req.user[0];
    res.status(200).json({
      ...req.user[0],
    });
  } catch (err) {
    next(err);
  }
};

export { registerUser, loginUser, getMe };
