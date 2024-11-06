const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");

const app = express();
const port = 8080;

// Middleware to parse JSON data
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src '*'");
});

// Set up SQLite3 database
const db = new sqlite3.Database("./database.db"); // Use ':memory:' for an in-memory database or provide a filename

// Create a table for storing user data
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS sessions(date TEXT, sessionLengthMinutes REAL, description TEXT)",
  );
});

// Route to handle form submission
app.post("/submit", (req, res) => {
  const { date, sessionLengthMinutes, description } = req.body;

  // Insert the data into the SQLite database
  db.run(
    "INSERT INTO sessions (date, sessionLengthMinutes, description) VALUES (?, ?, ?)",
    [date, sessionLengthMinutes, description],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error inserting data into the database." });
      }
      console.log("saved to database");
    },
  );
});

//route to send to log.html
app.get("/log", (req, res) => {
  console.log("hello");
  app.render("log");
  db.all("SELECT * FROM sessions", [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error retrieving data from the database." });
    }
    app.render("log", { sessions: res.json(rows) }); // Send the data as JSON
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
