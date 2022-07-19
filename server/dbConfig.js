import "dotenv/config";

const dbport = process.env.DBPORT;
const username = process.env.USER;
const host = process.env.HOST;
const pass = process.env.PASS;
const db = process.env.DB;

const mysqlConfig = {
  host: host,
  user: username,
  password: pass,
  database: db,
  port: dbport,
};

export default mysqlConfig;
