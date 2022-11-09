const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "interviewsystem",
});

app.post("/create", (req, res) => {
  const interviewer = req.body.interviewer;
  const interviewee = req.body.interviewee;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  db.query(
    "INSERT INTO interviews (interviewer, interviewee, startTime, endTime) VALUES (?,?,?,?)",
    [interviewer, interviewee, startTime, endTime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/interviews", (req, res) => {
  db.query("SELECT * FROM interviews", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

