require("dotenv").config();
const { Pool } = require("pg");

const { USER, HOST, DATABASE, PASSWORD, SQL_PORT } = process.env;

const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: SQL_PORT,
});

module.exports = pool;
