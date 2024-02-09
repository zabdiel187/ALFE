require("dotenv").config();
const mysql = require("mysql");
const HOST = process.env.HOST;
const USER = "root";
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

const db = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

module.exports = db;
