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
  database: "employeeSystem",
});

app.post("/create", (req, res) => {
  const InterviewerName = req.body.InterviewerName;
  const IntervieweeName = req.body.IntervieweeName;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;

  db.query(
    "INSERT INTO system (Interviewer, Interviewee, StartTime, EndTime) VALUES (?,?,?,?)",
    [InterviewerName, IntervieweeName, StartTime, EndTime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM system", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employeesystem.system WHERE Interviewer = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server running at port 3001");
});
