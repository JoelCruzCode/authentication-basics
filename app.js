require("dotenv").config();
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const usersRouter = require("./routes/users");
const LocalStrategy = require("passport-local");
const { loadEnvFile } = require("node:process");

const { PORT, USER, HOST, DATABASE, PASSWORD, SQL_PORT, SESSION_KEY } =
  process.env;

const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: SQL_PORT,
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({ secret: SESSION_KEY, resave: false, saveUninitialized: false }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index"));

app.use("/users", usersRouter);

app.listen(PORT, () => console.log("app listening on port 3000!"));
