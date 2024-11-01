require("dotenv").config();
const { Pool } = require("pg");

// Log the entire process.env object for debugging
// console.log("Environment Variables:", process.env);

const { USER, HOST, DATABASE, PASSWORD, SQL_PORT } = process.env;

const pool = new Pool({
  //user: "hydro",
  //host: "localhost",
  //database: "authentication_basics",
  //password: "pump",
  //port: 5555,

  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: SQL_PORT,
});

module.exports = pool;
