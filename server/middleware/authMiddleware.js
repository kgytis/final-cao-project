import jwt from "jsonwebtoken";
import mysqlConfig from "../dbConfig.js";
import mysql from "mysql2/promise";

const protect = async (req, res, next) => {
  try {
    let token;
    const con = await mysql.createConnection(mysqlConfig);
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        // Get token from header
        token = await req.headers.authorization.split(" ")[1];
        console.log(token);
        // Token verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          res.status(401);
          throw new Error("Invalid token");
        }
        // Get user from token
        const sql = `
            SELECT username, email, id
            FROM users
            WHERE id = ?
            `;
        const [data] = await con.query(sql, [decoded.id]);
        req.user = data;
        await con.end();
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, no token detected.");
      }
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export default protect;
