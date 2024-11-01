require("dotenv").config();

const path = require("node:path");
const express = require("express");
const session = require("express-session");
const usersRouter = require("./routes/users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { clear } = require("node:console");
// const { loadEnvFile } = require("node:process");

const { PORT, SESSION_KEY } = process.env;
console.log(PORT, SESSION_KEY);
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({ secret: SESSION_KEY, resave: false, saveUninitialized: false }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.get("/", (req, res) => res.render("index"));

app.listen(PORT, () => console.log("app listening on port 3000!"));
