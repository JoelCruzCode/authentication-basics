require("dotenv").config();
const { SESSION_KEY, PORT } = process.env;
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const usersRouter = require("./routes/users");
const { passport } = require("./authentication/passport");
const flash = require("connect-flash");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({ secret: SESSION_KEY, resave: false, saveUninitialized: false }),
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.messages = req.flash("error");
  next();
});

app.use("/users", usersRouter);
app.get("/", (req, res) => {
  console.log(req.user);
  console.log("locals?:", res.locals.currentUser);

  // Initialize messages
  const messages = req.flash("error") || [];

  res.render("index", {
    user: req.user,
    messages: messages,
  });
});

// creating authentication end point for users
app.post(
  "/log-in",
  (req, res, next) => {
    console.log("Login attempt:", req.body);
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: true,
  }),
  (req, res) => {
    console.log("User logged in:", req.user);
    res.redirect("/");
  },
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.listen(PORT, () => console.log("app listening on port 3000!"));
