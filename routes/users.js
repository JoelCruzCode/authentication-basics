const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/signup", (req, res) => {
  res.render("sign-up-form");
});

router.post("/signup", async (req, res, next) => {
  // creating users unsafely to test authentication
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
