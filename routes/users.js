const bcrypt = require("../authentication/passport");
const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});

router.post("/sign-up", async (req, res, next) => {
  // creating users unsafely to test authentication
  console.log("testing req.body", req.body);
  console.log("req.body.username:", req.body.username);
  console.log("req.body.password", req.body.password);
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(`Hashing Error ${err}`);
      } else {
        await pool.query(
          "INSERT INTO users (username, password) VALUES ($1, $2)",
          [req.body.username, hashedPassword],
        );
      }
    });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
