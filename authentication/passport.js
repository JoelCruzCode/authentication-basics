const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // Ensure you're using the .Strategy
const pool = require("../db/pool");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("Authenticating user:", username);
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];
      console.log("Found user:", user); // Log user data

      if (!user) {
        console.log("User not found");
        return done(null, false, { message: "Incorrect username" });
      }
      // Check if the password matches
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("Password mismatch");
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("User authenticated successfully:", user);
      return done(null, user);
    } catch (err) {
      console.error("Error during authentication:", err);
      return done(err);
    }
  }),
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = { passport, bcrypt };
